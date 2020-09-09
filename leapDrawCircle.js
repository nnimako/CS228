var controllerOptions = {};
var x = window.innerWidth; //get the width of current window
var y = window.innerHeight;  //get the height of current window

var rawXMin, rawXMax, rawYMin, rawYMax;

rawXMin = 500;
rawYMin = 500;
rawXMax = -500;
rawYMax = -500;

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function HandleHand(hand){
	var fingers = hand.fingers;
	for (var f=0; f<fingers.length; f++){
		if(fingers[f].type == 1 && fingers[f].extended){
			var finger = fingers[f];	
			HandleFinger(finger);
		}
	}
}

function HandleFrame(frame){
	if (frame.hands.length == 1) {
		var hand = frame.hands[0];
		HandleHand(hand);
	}
}

function HandleFinger(finger){
	var x = finger.tipPosition[0];
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

	var y = ( (y - rawYMin) / (rawYMax - rawYMin) ) * (window.innerHeight - 0) + 0;
	// console.log(y);

	circle((x), window.innerHeight - y, 50);
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
