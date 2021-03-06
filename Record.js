nj.config.printThreshold = 10;
var framesOfData = nj.zeros([5,4,6,2]);

// console.log(framesOfData.toString());
var numSamples = 2;
var currentSample = 0;

// framesOfData.set(0,1);
var controllerOptions = {};
// var x = window.innerWidth; //get the width of current window
// var y = window.innerHeight;  //get the height of current window

var rawXMin, rawXMax, rawYMin, rawYMax;

rawXMin = 5000;
rawYMin = 5000;
rawXMax = -5000;
rawYMax = -5000;

var previousNumHands = 0;
var currentNumHands = 0;

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function RecordData(){
	if (previousNumHands > 1 && currentNumHands == 1){
		background(51);
	}

	if (currentNumHands == 2){
		currentSample++;
		if(currentSample == numSamples){
			currentSample = 0;
		}
	}
	// console.log(currentSample);
}

function HandleHand(hand, InteractionBox){
	var fingers = hand.fingers;
	//var InteractionBox = frame.interactionBox;
	for (var f=0; f<fingers.length; f++){
		var finger = fingers[f];
		for(var b=finger.bones.length-1; b>=0; b--){
			HandleBone(finger.bones[b], 1.5, f, b, InteractionBox);
		}
	}
}

function HandleFrame(frame){
	if (frame.hands.length == 1 || frame.hands.length > 1) {
		var InteractionBox = frame.interactionBox;
		var hand = frame.hands[0];
		HandleHand(hand, InteractionBox);
	}
}

/*function HandleFinger(finger){
	for(var b=0; b<finger.bones.length; b++){
		var bone = finger.bones[b];
		var strkWeight = 1.5;
		
		HandleBone(bone, strkWeight);
	}
}*/
function HandleBone(bone,strkWeight, fingerIndex, boneIndex, InteractionBox){
	var bone_base = bone.prevJoint;
	var bone_tip = bone.nextJoint;

	//var InteractionBox = frame.interactionBox;
	normalizedPrevJoint = InteractionBox.normalizePoint(bone_base, true);
	// console.log(normalizedPrevJoint[1]);
	normalizedNextJoint = InteractionBox.normalizePoint(bone_tip, true);

	// framesOfData.
	framesOfData.set(fingerIndex, boneIndex, 0, currentSample, normalizedPrevJoint[0]);
	framesOfData.set(fingerIndex, boneIndex, 1, currentSample, normalizedPrevJoint[1]);
	framesOfData.set(fingerIndex, boneIndex, 2, currentSample, normalizedPrevJoint[2]);
	framesOfData.set(fingerIndex, boneIndex, 3, currentSample, normalizedNextJoint[0]);
	framesOfData.set(fingerIndex, boneIndex, 4, currentSample, normalizedNextJoint[1]);
	framesOfData.set(fingerIndex, boneIndex, 5, currentSample, normalizedNextJoint[2]);

	// console.log(framesOfData.pick(null,null,null,1).toString());
	

	var canvasPrevJointX = window.innerWidth * normalizedPrevJoint[0];
	var canvasPrevJointY = window.innerHeight * (1 - normalizedPrevJoint[1]);

	var canvasNextJointX = window.innerWidth * normalizedNextJoint[0];
	var canvasNextJointY = window.innerHeight * (1 - normalizedNextJoint[1]);

	//console.log(canvasPrevJointX, ">>>", canvasPrevJointY);
	
	var xb = bone_base[0];
	var yb = bone_base[1];
	var zb = bone_base[2];

	var xt = bone_tip[0];
	var yt = bone_tip[1];
	var zt = bone_tip[2];

	[xb,yb] = TransformCoordinates(normalizedPrevJoint[0],normalizedPrevJoint[1]);
	[xt,yt] = TransformCoordinates(normalizedNextJoint[0], normalizedNextJoint[1]);

	if (bone.type == 3){
		strkWeight += 1.5;
		//stroke(0,130,0);
	} 
	if (bone.type == 2){
		strkWeight += 4;
		// stroke(0,120,0);
	} 
	if (bone.type == 1){
		strkWeight += 8;
		// stroke(0,100,0);
	}
	if (bone.type == 0){
		strkWeight += 11;
		// stroke(0,90,0);
	}
	fingerIndexSum = xb+yb+zb+xt+yt+zt;
	// fingerIndex = 0;
	strokeWeight(strkWeight);

	line(xt,window.innerHeight - yt,xb, window.innerHeight - yb);
	
	/*framesOfData.set(fingerIndex, boneIndex, 0, xb);
	framesOfData.set(fingerIndex, boneIndex, 1, yb);
	framesOfData.set(fingerIndex, boneIndex, 2, zb);
	framesOfData.set(fingerIndex, boneIndex, 3, xt);
	framesOfData.set(fingerIndex, boneIndex, 4, yt);
	framesOfData.set(fingerIndex, boneIndex, 5, zt);*/
}

function TransformCoordinates(x,y){
	if (x < rawXMin){
		rawXMin = x;
	}
	if (x > rawXMax){
		rawXMax = x;
	}
	if (y < rawYMin){
		rawYMin = y;
	}
	if (y > rawYMax){
		rawYMax = y;
	}

	//code from: https://stackoverflow.com/questions/929103/convert-a-number-range-to-another-range-maintaining-ratio
	x = ( (x - rawXMin) / (rawXMax - rawXMin) ) * (window.innerWidth - 0) + 0;
	// console.log(x);

	var y = ( (y - rawYMin) / (rawYMax - rawYMin) ) * (window.innerHeight - 0) + 0;

	return [x,y];
}

Leap.loop(controllerOptions, function(frame)
{
	currentNumHands = frame.hands.length;
	clear();
	if (currentNumHands ==1){
		stroke(0,90,0);
		// console.log(framesOfData.toString());
	} else{
		stroke(250,0,0);
	}
	// var xRandNum = getRndInteger(-1,1) + (Math.random());
	// // console.log(xRandNum);

	// var yRandNum = getRndInteger(-1,1) + (Math.random());
	// // console.log(yRandNum);



	// var i = 0;
	// console.log(i);
	// circle((x/2) + xRandNum, (y/2) + yRandNum, 50);
	// console.log(previousNumHands, "----", currentNumHands);

	HandleFrame(frame);

	RecordData();
	console.log(framesOfData.toString());
	previousNumHands = currentNumHands;
});