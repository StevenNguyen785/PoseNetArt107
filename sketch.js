// ml5.js: Pose Estimation with PoseNet
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/Courses/ml5-beginners-guide/7.1-posenet.html
// https://youtu.be/OIo-DIOkNVg
// https://editor.p5js.org/codingtrain/sketches/ULA97pJXR

let video;
let poseNet;
let pose;
let skeleton;
let PPAP;

function preload() {
  PPAP = loadImage('assets/giphy.gif')
}

function setup() {
  createCanvas(640, 480, WEBGL);
  noStroke();


  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    //skeleton = poses[0].skeleton;
  }
}


function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  translate(-width / 2, -height / 2, 0)
  ambientLight(200, 200, 200);
  pointLight(255, 0, 0, width / 4, height / 4, 100);

  image(video, 0, 0);

  if (pose) {
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(pose.rightEar.x, pose.rightEar.y, pose.leftEar.x, pose.leftEar.y);
    // fill(255, 0, 0);
    // ellipse(pose.nose.x, pose.nose.y, d / 4);

    push();
    translate(pose.nose.x, pose.nose.y, d);
    rotateZ(frameCount * 0.01);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    //normalMaterial();
    texture(PPAP);
    box(50);
    pop();
    fill(0, 0, 255);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);

    // for (let i = 0; i < pose.keypoints.length; i++) {
    //   let x = pose.keypoints[i].position.x;
    //   let y = pose.keypoints[i].position.y;
    //   fill(0,255,0);
    //   ellipse(x,y,16,16);
    // }

    //     for (let i = 0; i < skeleton.length; i++) {
    //       let a = skeleton[i][0];
    //       let b = skeleton[i][1];
    //       strokeWeight(2);
    //       stroke(255);
    //       line(a.position.x, a.position.y,b.position.x,b.position.y);
    //     }





  }
}
