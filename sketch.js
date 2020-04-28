let video;
let poseNet;
let pose;

function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose',gotPoses);
}

function gotPoses(poses){
console.log(poses);
  if(poses.length > 0){
  pose = poses[0].pose;
  }
}             

function modelLoaded(){
 console.log("model is ready"); 
}

function draw() {
  image(video,0,0);
  
  if(pose){
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    //identify the positions/distance of eyes
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    fill(255,0,0);
    //parameter d is the distance of eyes calculated and draw ellipse to show
    ellipse(pose.nose.x, pose.nose.y, d)
    fill(0,0,255);
    //identify the right hand wrist and draw ellipse to show
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);

    //identify the left hand wrist and draw ellipse to show
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);
  }
}