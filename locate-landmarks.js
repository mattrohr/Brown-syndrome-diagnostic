const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: {} }).then((stream) => { video.srcObject = stream; }, (err) => console.error(err));
}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
        
        const landmarks = await faceapi.detectFaceLandmarks(video)
        const landmarkPositions = landmarks.positions
        const leftEye = landmarks.getLeftEye()
        const rightEye = landmarks.getRightEye()
        console.log(leftEye)
        var landmarkSeperation = leftEye[0]._x - rightEye[0]._x;
        var roundedLandmarkSeperation = landmarkSeperation.toFixed(0);
        document.getElementById("eyeLandmarkDifference").innerHTML = ("x difference:", roundedLandmarkSeperation);
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    }, 100)
})