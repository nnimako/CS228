var controllerOptions = {};
var x = window.innerWidth; //get the width of current window
var y = window.innerHeight;  //get the height of current window

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
/*var xRandNum = getRndInteger(-1,1) + (Math.random());
console.log(xRandNum);

var yRandNum = getRndInteger(-1,1) + (Math.random());
console.log(yRandNum);*/

Leap.loop(controllerOptions, function(frame)
{
	clear();

	var xRandNum = getRndInteger(-1,1) + (Math.random());
	console.log(xRandNum);

	var yRandNum = getRndInteger(-1,1) + (Math.random());
	console.log(yRandNum);



	var i = 0;
	console.log(i);
	circle((x/2) + xRandNum, (y/2) + yRandNum, 50);
}
);
