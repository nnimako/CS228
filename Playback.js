var rawXMin, rawXMax, rawYMin, rawYMax;
rawXMin = 5000;
rawYMin = 5000;
rawXMax = -5000;
rawYMax = -5000;

var oneFrameOfData = nj.array([[[0.97688,0.209, 1,0.97688,0.209, 1],
        [0.97688,0.209, 1,0.83484,0.2326, 1],
        [0.83484,0.2326, 1,0.76634,0.23896,0.89721],
        [0.76634,0.23896,0.89721,0.72195,0.24247,0.75557]],
       [[ 1,0.2997, 1,0.88877,0.43694,0.94351],
        [0.88877,0.43694,0.94351,0.82577,0.48373,0.68094],
        [0.82577,0.48373,0.68094,0.78805,0.48791,0.52892],
        [0.78805,0.48791,0.52892,0.761,0.479,0.42254]],
       [[ 1,0.3074, 1,0.97874,0.43602,0.89977],
        [0.97874,0.43602,0.89977,0.95854,0.49365,0.58837],
        [0.95854,0.49365,0.58837,0.93936,0.50791,0.3997],
        [0.93936,0.50791,0.3997,0.92323,0.507,0.27515]],
       [[ 1,0.30132, 1, 1,0.412,0.88441],
        [ 1,0.412,0.88441, 1,0.45872,0.59205],
        [ 1,0.45872,0.59205, 1,0.46797,0.40716],
        [ 1,0.46797,0.40716, 1,0.46384,0.28349]],
       [[ 1,0.26487, 1, 1,0.36981,0.86936],
        [ 1,0.36981,0.86936, 1,0.40389,0.63722],
        [ 1,0.40389,0.63722, 1,0.41084,0.50533],
        [ 1,0.41084,0.50533, 1,0.40873,0.38934]]]);

var anotherFrameData = nj.array([[[ 1178.71947,   156.5446,    255.038, 1178.71947,   156.5446,    255.038],
        [ 1178.71947,   156.5446,    255.038,  593.82117,  294.46779,    223.518],
        [  593.82117,  294.46779,    223.518,  294.75326,  361.86131,    196.614],
        [  294.75326,  361.86131,    196.614,   61.99185,  415.39271,     179.39]],
       [[ 1411.42164,  310.83337,    253.019,   776.9008,  634.63283,    206.238],
        [   776.9008,  634.63283,    206.238,  351.41735,  666.30894,    172.621],
        [  351.41735,  666.30894,    172.621,  166.08134,  515.76251,    162.806],
        [  166.08134,  515.76251,    162.806,  140.23112,  383.26112,    164.713]],
       [[ 1587.11144,  316.27504,    246.043, 1122.27347,  613.44089,    196.389],
        [ 1122.27347,  613.44089,    196.389,   659.0127,  656.17259,    158.289],
        [   659.0127,  656.17259,    158.289,  372.97177,   488.5252,    149.086],
        [  372.97177,   488.5252,    149.086,  293.45716,  349.81031,    153.327]],
       [[ 1754.29268,  296.62425,    238.899,  1479.6755,  546.52768,    189.988],
        [  1479.6755,  546.52768,    189.988, 1041.04205,  649.04236,    156.905],
        [ 1041.04205,  649.04236,    156.905,  689.90015,   586.9903,    140.027],
        [  689.90015,   586.9903,    140.027,  469.96009,  492.77352,    133.145]],
       [[ 1879.14045,   223.4222,    231.184, 1771.17588,  450.08323,    183.961],
        [ 1771.17588,  450.08323,    183.961, 1483.76188,  566.15445,    157.666],
        [ 1483.76188,  566.15445,    157.666, 1226.67463,   550.9996,    145.271],
        [ 1226.67463,   550.9996,    145.271,  987.78894,  488.53348,    138.277]]]);


var frameIndex = 0;
var flipped = 0;

function draw(){
	clear();
	for(var i=0; i<5; i++){
		for(var j=0; j<4; j++){
			if (flipped == 0) {
				var xStart = anotherFrameData.get(i,j,0);
				var yStart = anotherFrameData.get(i,j,1);
				var zStart = anotherFrameData.get(i,j,2);
				var xEnd = anotherFrameData.get(i,j,3);
				var yEnd = anotherFrameData.get(i,j,4);
				var zEnd = anotherFrameData.get(i,j,5);

        // [xStart, yStart] = TransformCoordinates(xStart, yStart);
        // [xEnd, yEnd] = TransformCoordinates(xEnd, yEnd);
				line(xStart, yStart,xEnd,yEnd);
			} else if (flipped == 1) {
				var xStart = oneFrameOfData.get(i,j,0);
				var yStart = oneFrameOfData.get(i,j,1);
				var zStart = oneFrameOfData.get(i,j,2);
				var xEnd = oneFrameOfData.get(i,j,3);
				var yEnd = oneFrameOfData.get(i,j,4);
				var zEnd = oneFrameOfData.get(i,j,5);
        [xStart, yStart] = TransformCoordinates(xStart, yStart);
        [xEnd, yEnd] = TransformCoordinates(xEnd, yEnd);
				line(xStart, yStart,xEnd,yEnd);
			}
		}
	}
	
	if (frameIndex == 100){
		frameIndex = 0;
		if (flipped == 1) {
			flipped = 0;
		} else{
			flipped = 1;
		}
	}
	frameIndex+=1;
	// console.log(oneFrameOfData.toString());
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
