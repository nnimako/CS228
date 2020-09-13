// step 23

var controllerOptions = {};
// var x = window.innerWidth; //get the width of current window
// var y = window.innerHeight;  //get the height of current window

var rawXMin, rawXMax, rawYMin, rawYMax;

rawXMin = 5000;
rawYMin = 5000;
rawXMax = -5000;
rawYMax = -5000;

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function HandleHand(hand){
	var fingers = hand.fingers;
	for (var f=0; f<fingers.length; f++){
		var finger = fingers[f];	
		HandleFinger(finger);
		/*if(fingers[f].extended){
			var finger = fingers[f];	
			HandleFinger(finger);
		}*/
	}
}

function HandleFrame(frame){
	if (frame.hands.length == 1) {
		var hand = frame.hands[0];
		HandleHand(hand);
	}
}

function HandleFinger(finger){
	console.log(finger.bones.length);
	for(var b=0; b<finger.bones.length; b++){
		var bone = finger.bones[b];
		//console.log(bone);
		sw = 5;
		HandleBone(bone, sw);
		// console.log();
	}
	
	/*var x = finger.tipPosition[0];
	var y = finger.tipPosition[1];
	var z = finger.tipPosition[2];

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

	var y = ( (y - rawYMin) / (rawYMax - rawYMin) ) * (window.innerHeight - 0) + 0;*/
	// console.log(y);

	// circle((x), window.innerHeight - y, 50);
}

function HandleBone(bone,strokeWeight){
	var bone_base = bone.prevJoint;
	var bone_tip = bone.nextJoint;

	var xb = bone_base[0];
	var yb = bone_base[1];
	var zb = bone_base[2];

	var xt = bone_tip[0];
	var yt = bone_tip[1];
	var zt = bone_tip[2];

	[xb,yb] = TransformCoordinates(xb,yb);
	[xt,yt] = TransformCoordinates(xt,yt);
	// circle((x), window.innerHeight - y, 50);

	//strokeWeight(2);

	/*if (bone.type == 0){
		strokeWeight(2);
	} 
	else if (bone.type == 1){
		strokeWeight(4);
		stroke(255,0,0);
	} 
	else if (bone.type == 2){
		strokeWeight(6);
		stroke(0,255,0);
	}
	else if (bone.type == 3){
		strokeWeight(10);
	}*/
	line(xt,window.innerHeight - yt,xb, window.innerHeight - yb);
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
	clear();

	// var xRandNum = getRndInteger(-1,1) + (Math.random());
	// // console.log(xRandNum);

	// var yRandNum = getRndInteger(-1,1) + (Math.random());
	// // console.log(yRandNum);



	// var i = 0;
	// console.log(i);
	// circle((x/2) + xRandNum, (y/2) + yRandNum, 50);
	HandleFrame(frame);
});
