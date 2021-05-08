const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: {} }).then((stream) => { video.srcObject = stream; }, (err) => console.error(err));
}

var blankTwo = []
var blankThree = []

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
        
        const landmarks = await faceapi.detectFaceLandmarks(video)
        const landmarkPositions = landmarks.positions
        const leftEye = landmarks.getLeftEye()
        const rightEye = landmarks.getRightEye()
        //console.log("left eye:", leftEye[0])
        //console.log("right eye:", rightEye[0])
        
        var distanceBetweenLandmarks = Math.sqrt(Math.pow(rightEye[0]._x - leftEye[5]._x, 2) + Math.pow(rightEye[0]._y - leftEye[5]._y, 2))
        var roundedDistanceBetweenLandmarks = distanceBetweenLandmarks.toFixed(0);
        //document.getElementById("eyeLandmarkDifference").innerHTML = ("difference:", roundedDistanceBetweenLandmarks);
        
        rightEyeXPosition = rightEye[0]._x
        rightEyeYPosition = rightEye[0]._y

        var roundedRightEyeXPosition = [rightEyeXPosition.toFixed(0)];
        var roundedRightEyeYPosition = [rightEyeYPosition.toFixed(0)];
        blankTwo = blankTwo + ", " + roundedRightEyeXPosition;
        blankThree = blankThree + ", " + roundedRightEyeYPosition;
        
        var splitRightEyeXPosition = blankTwo.split(", ");
        var splitRightEyeYPosition = blankThree.split(", ");
        var maxRightEyeXPosition = Math.max(...splitRightEyeXPosition);
        var maxRightEyeYPosition = Math.max(...splitRightEyeYPosition);
        
        //console.log("right eye x-current", splitRightEyeXPosition[splitRightEyeXPosition.length - 1])
        //console.log("right eye x-origin", splitRightEyeXPosition[1])
        //console.log("right eye y-current", leftEye[5]._y)
        //console.log("right eye y-current", splitRightEyeYPosition[splitRightEyeYPosition.length - 1])
        //console.log("right eye y-origin", splitRightEyeYPosition[1])
        //console.log("headDeviation", headDeviation)
        
        var headDeviation = Math.sqrt(Math.pow(splitRightEyeXPosition[splitRightEyeXPosition.length - 1] - splitRightEyeXPosition[1], 2) + Math.pow(splitRightEyeYPosition[splitRightEyeYPosition.length - 1] - splitRightEyeYPosition[1], 2))
        var maxHeadDeviation = Math.sqrt(Math.pow(splitRightEyeXPosition[1] - maxRightEyeXPosition, 2) + Math.pow(splitRightEyeYPosition[1] - maxRightEyeYPosition, 2))
        
        var roundedHeadDeviation = [headDeviation.toFixed(0)];
        var roundedMaxHeadDeviation = [maxHeadDeviation.toFixed(0)];
        //console.log("splitRightEyeXPosition", splitRightEyeXPosition) 
        //console.log("maxRightEyeXPosition[1]", maxRightEyeXPosition[1]) 

        //console.log("splitRightEyeXPosition[1]", splitRightEyeXPosition[1])
        //console.log("maxRightEyeXPosition", maxRightEyeXPosition)
        
        //maxHeadDeviation = Math.max(...splitHeadDeviation);
        //var headDeviation = splitHeadDeviation[1] - maxHeadDeviation;
        document.getElementById("roundedHeadDeviation").innerHTML = roundedHeadDeviation;        
        document.getElementById("roundedMaxHeadDeviation").innerHTML = roundedMaxHeadDeviation;        

        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    }, 100)
})