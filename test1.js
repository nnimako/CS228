var controllerOptions = {};
var i = 0;
var rawXMin = 1000;
var rawXMax = -1000;
var rawYMin = 1000;
var rawYMax = -1000;
Leap.loop(controllerOptions, function(frame)
{
    clear();
    // var randomValX = Math.round(Math.random()) * 2 - 1;
    // var randomValY = Math.round(Math.random()) * 2 - 1;
    // i = i+1;
    HandleFrame(frame);
    //line(30, 20, 85, 75);
});
function HandleFrame(frame) {
    if(frame.hands.length == 1){
        var hand = (frame.hands[0]);
        // console.log(hand);
        HandleHand(hand);
    }
    // console.log("end of hand");
}
function HandleHand(hand){
    var fingers = hand.fingers;
    // HandleFinger(fingers);
    for (let j = 0; j < fingers[j].bones.length; j++) {
        for (let k = 0; k < fingers.length; k++) {
                var proximalBone = fingers[j].bones[1];
                var intermediateBone = fingers[j].bones[2];
                var distalBones = fingers[j].bones[3];
                var metacarpals = fingers[j].bones[0];
            if (j == 0){
                var colour = 'Gainsboro';
                HandleBone(fingers[k].bones[j], 18, colour);
            } else if (j == 1){
                var colour = 'DarkGray';
                HandleBone(fingers[k].bones[j], 8, colour);
            } else if (j == 2){
                var colour = 'Gray';
                HandleBone(fingers[k].bones[j], 4, colour);
            } else if (j == 3){
                var colour = 'Black';
                HandleBone(fingers[k].bones[j], 2, colour);
            }
        }
    }
}
//
// function HandleFinger(fingers){
//     //step 60, using basic fori loop
//     for (let j = 0; j < fingers.length; j++) {
//         //step 61
//         if (fingers[j].extended == true){
//             // // console.log("Index Finger's tip position:");
//             // // console.log(fingers[j].tipPosition);
//             // var x = fingers[j].tipPosition[0];
//             // //step 69
//             // var y = (window.innerHeight) - fingers[j].tipPosition[1];
//             // var z = (fingers[j].tipPosition[2]);
//             //
//             // var newx = ((x-rawXMin) / (rawXMax - rawXMin)) * (window.innerWidth - 0) + 0;
//             // var newy = ((y-rawYMin) / (rawYMax - rawYMin)) * (window.innerHeight - 0) + 0;
//
//             for (let k = 0; k < fingers[j].bones.length; k++) {
//                 var proximalBone = fingers[j].bones[1];
//                 var intermediateBone = fingers[j].bones[2];
//                 var distalBones = fingers[j].bones[3];
//                 var metacarpals = fingers[j].bones[0];
//                 // console.log("Finger bones: ", proximalBone, " ", intermediateBone, " ", distalBones)
//                 if (fingers[j].bones[k] == fingers[j].bones[0]){
//                     var colour = 'Gainsboro';
//                     HandleBone(fingers[j].bones[k], 18, colour);
//                 } else if (fingers[j].bones[k] == fingers[j].bones[1]){
//                     var colour = 'DarkGray';
//                     HandleBone(fingers[j].bones[k], 8, colour);
//                 } else if (fingers[j].bones[k] == fingers[j].bones[2]){
//                     var colour = 'Gray';
//                     HandleBone(fingers[j].bones[k], 4, colour);
//                 } else if (fingers[j].bones[k] == fingers[j].bones[3]){
//                     var colour = 'Black';
//                     HandleBone(fingers[j].bones[k], 2, colour);
//                 }
//
//             }
//
//         }
//     }
// }
function HandleBone(bone, weight, colour) {
    // console.log("BONE", bone);
    var bone_end = bone.nextJoint;
    var bone_start = bone.prevJoint;
    console.log(bone_start, "  ASDF  ",  bone_end);
    var x = bone_end[0];
    var y = bone_end[1];
    var z = bone_end[2];
    var xStart = bone_start[0];
    var yStart = bone_start[1];
    var zStart = bone_start[2];
    [x,y] = TransformCoordinates(x,y);
    [xStart,yStart] = TransformCoordinates(xStart,yStart);
    stroke(colour);
    strokeWeight(weight);
    line(x,window.innerHeight - y,xStart, window.innerHeight - yStart);
}
function TransformCoordinates(x,y){
    if(x < rawXMin){
        rawXMin = x;
    }
    if(x > rawXMax){
        rawXMax = x;
    }
    if(y < rawYMin){
        rawYMin = y;
    }
    if(y > rawYMax){
        rawYMax = y;
    }

    var newx = ((x-rawXMin) / (rawXMax - rawXMin)) * (window.innerWidth - 0) + 0;
    var newy = ((y-rawYMin) / (rawYMax - rawYMin)) * (window.innerHeight - 0) + 0;
    return [newx, newy];
}