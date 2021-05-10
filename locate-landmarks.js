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
        
        //var distanceBetweenLandmarks = Math.sqrt(Math.pow(rightEye[0]._x - leftEye[5]._x, 2) + Math.pow(rightEye[0]._y - leftEye[5]._y, 2))
        //var roundedDistanceBetweenLandmarks = distanceBetweenLandmarks.toFixed(0);
        
        //var roundedRightEyeXPosition = [rightEyeXPosition.toFixed(0)];
        //var roundedRightEyeYPosition = [rightEyeYPosition.toFixed(0)];
        //blankTwo = blankTwo + ", " + roundedRightEyeXPosition;
        //blankThree = blankThree + ", " + roundedRightEyeYPosition;
        //
        //var splitRightEyeXPosition = blankTwo.split(", ");
        //var splitRightEyeYPosition = blankThree.split(", ");
        //var maxRightEyeXPosition = Math.max(...splitRightEyeXPosition);
        //var maxRightEyeYPosition = Math.max(...splitRightEyeYPosition);
        //
        //var headDeviation = Math.sqrt(Math.pow(splitRightEyeXPosition[splitRightEyeXPosition.length - 1] - splitRightEyeXPosition[1], 2) + Math.pow//(splitRightEyeYPosition[splitRightEyeYPosition.length - 1] - splitRightEyeYPosition[1], 2))
        //var maxHeadDeviation = Math.sqrt(Math.pow(splitRightEyeXPosition[1] - maxRightEyeXPosition, 2) + Math.pow(splitRightEyeYPosition[1] - maxRightEyeYPosition, 2))
        //
        //var roundedHeadDeviation = [headDeviation.toFixed(0)];
        //var roundedMaxHeadDeviation = [maxHeadDeviation.toFixed(0)];
        //
        //document.getElementById("roundedHeadDeviation").innerHTML = roundedHeadDeviation;        
        //document.getElementById("roundedMaxHeadDeviation").innerHTML = roundedMaxHeadDeviation;        

        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        
        //console.log(resizedDetections[0].landmarks.positions[36]._x)
        rightEyeXPosition = resizedDetections[0].landmarks.positions[36]._x
        rightEyeYPosition = resizedDetections[0].landmarks.positions[36]._y
        
        // should round at end
        //var roundedRightEyeXPosition = [rightEyeXPosition.toFixed(0)];
        //var roundedRightEyeYPosition = [rightEyeYPosition.toFixed(0)];
        
        blankTwo = blankTwo + ", " + rightEyeXPosition;
        blankThree = blankThree + ", " + rightEyeYPosition;

        var splitRightEyeXPosition = blankTwo.split(", ");
        var splitRightEyeYPosition = blankThree.split(", ");
        
        var maxRightEyeXPosition = Math.max(...splitRightEyeXPosition);
        var maxRightEyeYPosition = Math.max(...splitRightEyeYPosition);
        
        var headDeviation = Math.sqrt(Math.pow(splitRightEyeXPosition[splitRightEyeXPosition.length - 1] - splitRightEyeXPosition[1], 2) + Math.pow(splitRightEyeYPosition[splitRightEyeYPosition.length - 1] - splitRightEyeYPosition[1], 2))
        
        roundedHeadDeviation = headDeviation.toFixed(0)
        
        document.getElementById("currentHeadDeviation").innerHTML = roundedHeadDeviation;        
        //document.getElementById("maxHeadDeviation").innerHTML = maxHeadDeviation; 
        
        console.log(headDeviation)
        
    }, 100)
})