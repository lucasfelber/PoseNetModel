let video;
let poseNet;

let pose;
let skeleton;

function setup(){
    createCanvas(640,480);
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0);

    if(pose) {
        for(let i = 0; i < skeleton.length; i++){
            let a = skeleton[i][0];
            let b = skeleton[i][1];
            stroke(255);
            strokeWeight(4);
            line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
         for(let i = 0; i < pose.keypoints.length; i++){
             let x = pose.keypoints[i].position.x;
             let y = pose.keypoints[i].position.y;
             fill(255);
             ellipse(x,y,16);
         }
    }
}

function modelLoaded(){
    console.log('PoseNet ready!');
}

function gotPoses(poses){
    if(poses.length > 0){
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}