const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./../data'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./../data'),
    faceapi.nets.faceRecognitionNet.loadFromUri('./../data')
]).then(startVideo)

function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: {} }).then((stream) => { video.srcObject = stream; }, (err) => console.error(err));
}

var blankTwo = []
var blankThree = []
var blankFour = []

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
        
        const landmarks = await faceapi.detectFaceLandmarks(video)
        const landmarkPositions = landmarks.positions
        
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        
        rightEyeXPosition = resizedDetections[0].landmarks.positions[36]._x
        rightEyeYPosition = resizedDetections[0].landmarks.positions[36]._y
        
        blankTwo = blankTwo + ", " + rightEyeXPosition;
        blankThree = blankThree + ", " + rightEyeYPosition;

        var splitRightEyeXPosition = blankTwo.split(", ");
        var splitRightEyeYPosition = blankThree.split(", ");
        
        var maxRightEyeXPosition = Math.max(...splitRightEyeXPosition);
        var maxRightEyeYPosition = Math.max(...splitRightEyeYPosition);
        
        var headDeviation = Math.sqrt(Math.pow(splitRightEyeXPosition[splitRightEyeXPosition.length - 1] - splitRightEyeXPosition[1], 2) + Math.pow(splitRightEyeYPosition[splitRightEyeYPosition.length - 1] - splitRightEyeYPosition[1], 2))
        
        var roundedHeadDeviation = headDeviation.toFixed(0)
        blankFour = blankFour + ", " + roundedHeadDeviation;
        var splitRoundedHeadDeviation = blankFour.split(", ");
        var maxHeadDeviation = Math.max(...splitRoundedHeadDeviation)
        
        document.getElementById("currentHeadDeviation").innerHTML = roundedHeadDeviation;        
        document.getElementById("maxHeadDeviation").innerHTML = maxHeadDeviation; 
                
    }, 100)
})