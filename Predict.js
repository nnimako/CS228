testingSampleIndex = 1;
const knnClassifier = ml5.KNNClassifier();
var irisData = nj.array([
    [5.1,3.1,1.4,.2,0],
    [4.9,3,1.4,0.2,0],
    [4.7,3.2,1.3,0.2,0],
    [4.6,3.1,1.5,0.2,0],
    [5,3.6,1.4,0.2,0],
    [5.4,3.9,1.7,0.4,0],
    [4.6,3.4,1.4,0.3,0],
    [5,3.4,1.5,0.2,0],
    [4.4,2.9,1.4,0.2,0],
    [4.9,3.1,1.5,0.1,0],
    [5.4,3.7,1.5,0.2,0],
    [4.8,3.4,1.6,0.2,0],
    [4.8,3,1.4,0.1,0],
    [4.3,3,1.1,0.1,0],
    [5.8,4,1.2,0.2,0],
    [5.7,4.4,1.5,0.4,0],
    [5.4,3.9,1.3,0.4,0],
    [5.1,3.5,1.4,0.3,0],
    [5.7,3.8,1.7,0.3,0],
    [5.1,3.8,1.5,0.3,0],
    [5.4,3.4,1.7,0.2,0],
    [5.1,3.7,1.5,0.4,0],
    [4.6,3.6,1,0.2,0],
    [5.1,3.3,1.7,0.5,0],
    [4.8,3.4,1.9,0.2,0],
    [5,3,1.6,0.2,0],
    [5,3.4,1.6,0.4,0],
    [5.2,3.5,1.5,0.2,0],
    [5.2,3.4,1.4,0.2,0],
    [4.7,3.2,1.6,0.2,0],
    [4.8,3.1,1.6,0.2,0],
    [5.4,3.4,1.5,0.4,0],
    [5.2,4.1,1.5,0.1,0],
    [5.5,4.2,1.4,0.2,0],
    [4.9,3.1,1.5,0.1,0],
    [5,3.2,1.2,0.2,0],
    [5.5,3.5,1.3,0.2,0],
    [4.9,3.1,1.5,0.1,0],
    [4.4,3,1.3,0.2,0],
    [5.1,3.4,1.5,0.2,0],
    [5,3.5,1.3,0.3,0],
    [4.5,2.3,1.3,0.3,0],
    [4.4,3.2,1.3,0.2,0],
    [5,3.5,1.6,0.6,0],
    [5.1,3.8,1.9,0.4,0],
    [4.8,3,1.4,0.3,0],
    [5.1,3.8,1.6,0.2,0],
    [4.6,3.2,1.4,0.2,0],
    [5.3,3.7,1.5,0.2,0],
    [5,3.3,1.4,0.2,0],
    [7,3.2,4.7,1.4,1],
    [6.4,3.2,4.5,1.5,1],
    [6.9,3.1,4.9,1.5,1],
    [5.5,2.3,4,1.3,1],
    [6.5,2.8,4.6,1.5,1],
    [5.7,2.8,4.5,1.3,1],
    [6.3,3.3,4.7,1.6,1],
    [4.9,2.4,3.3,1,1],
    [6.6,2.9,4.6,1.3,1],
    [5.2,2.7,3.9,1.4,1],
    [5,2,3.5,1,1],
    [5.9,3,4.2,1.5,1],
    [6,2.2,4,1,1],
    [6.1,2.9,4.7,1.4,1],
    [5.6,2.9,3.6,1.3,1],
    [6.7,3.1,4.4,1.4,1],
    [5.6,3,4.5,1.5,1],
    [5.8,2.7,4.1,1,1],
    [6.2,2.2,4.5,1.5,1],
    [5.6,2.5,3.9,1.1,1],
    [5.9,3.2,4.8,1.8,1],
    [6.1,2.8,4,1.3,1],
    [6.3,2.5,4.9,1.5,1],
    [6.1,2.8,4.7,1.2,1],
    [6.4,2.9,4.3,1.3,1],
    [6.6,3,4.4,1.4,1],
    [6.8,2.8,4.8,1.4,1],
    [6.7,3,5,1.7,1],
    [6,2.9,4.5,1.5,1],
    [5.7,2.6,3.5,1,1],
    [5.5,2.4,3.8,1.1,1],
    [5.5,2.4,3.7,1,1],
    [5.8,2.7,3.9,1.2,1],
    [6,2.7,5.1,1.6,1],
    [5.4,3,4.5,1.5,1],
    [6,3.4,4.5,1.6,1],
    [6.7,3.1,4.7,1.5,1],
    [6.3,2.3,4.4,1.3,1],
    [5.6,3,4.1,1.3,1],
    [5.5,2.5,4,1.3,1],
    [5.5,2.6,4.4,1.2,1],
    [6.1,3,4.6,1.4,1],
    [5.8,2.6,4,1.2,1],
    [5,2.3,3.3,1,1],
    [5.6,2.7,4.2,1.3,1],
    [5.7,3,4.2,1.2,1],
    [5.7,2.9,4.2,1.3,1],
    [6.2,2.9,4.3,1.3,1],
    [5.1,2.5,3,1.1,1],
    [5.7,2.8,4.1,1.3,1],
    [6.3,3.3,6,2.5,2],
    [5.8,2.7,5.1,1.9,2],
    [7.1,3,5.9,2.1,2],
    [6.3,2.9,5.6,1.8,2],
    [6.5,3,5.8,2.2,2],
    [7.6,3,6.6,2.1,2],
    [4.9,2.5,4.5,1.7,2],
    [7.3,2.9,6.3,1.8,2],
    [6.7,2.5,5.8,1.8,2],
    [7.2,3.6,6.1,2.5,2],
    [6.5,3.2,5.1,2,2],
    [6.4,2.7,5.3,1.9,2],
    [6.8,3,5.5,2.1,2],
    [5.7,2.5,5,2,2],
    [5.8,2.8,5.1,2.4,2],
    [6.4,3.2,5.3,2.3,2],
    [6.5,3,5.5,1.8,2],
    [7.7,3.8,6.7,2.2,2],
    [7.7,2.6,6.9,2.3,2],
    [6,2.2,5,1.5,2],
    [6.9,3.2,5.7,2.3,2],
    [5.6,2.8,4.9,2,2],
    [7.7,2.8,6.7,2,2],
    [6.3,2.7,4.9,1.8,2],
    [6.7,3.3,5.7,2.1,2],
    [7.2,3.2,6,1.8,2],
    [6.2,2.8,4.8,1.8,2],
    [6.1,3,4.9,1.8,2],
    [6.4,2.8,5.6,2.1,2],
    [7.2,3,5.8,1.6,2],
    [7.4,2.8,6.1,1.9,2],
    [7.9,3.8,6.4,2,2],
    [6.4,2.8,5.6,2.2,2],
    [6.3,2.8,5.1,1.5,2],
    [6.1,2.6,5.6,1.4,2],
    [7.7,3,6.1,2.3,2],
    [6.3,3.4,5.6,2.4,2],
    [6.4,3.1,5.5,1.8,2],
    [6,3,4.8,1.8,2],
    [6.9,3.1,5.4,2.1,2],
    [6.7,3.1,5.6,2.4,2],
    [6.9,3.1,5.1,2.3,2],
    [5.8,2.7,5.1,1.9,2],
    [6.8,3.2,5.9,2.3,2],
    [6.7,3.3,5.7,2.5,2],
    [6.7,3,5.2,2.3,2],
    [6.3,2.5,5,1.9,2],
    [6.5,3,5.2,2,2],
    [6.2,3.4,5.4,2.3,2],
    [5.9,3,5.1,1.8,2]]);

var trainingCompleted = false;
var numSamples = irisData.shape[0];
var numFeatures = irisData.shape[1]-1;
var predictedClassLabels = nj.zeros(numSamples);

var currentFeatures;
var currentLabel;

function draw(){
	clear();
  if (!trainingCompleted){
    Train();
    trainingCompleted = true;
  }
  Test();
  DrawCircles();
}

function Train(){
	for (var i=0; i<numSamples; i++){
		if (i%2 ==0){
			currentFeatures = irisData.pick(i).slice([0,4]);
			currentLabel = irisData.get(i,-1);
			//console.log(i, ">>>", currentFeatures.toString(), ">>>", currentLabel);
			knnClassifier.addExample(currentFeatures.tolist(), currentLabel);

			//var predictedLabel = knnClassifier.classify(currentFeatures.tolist(), GotResults);
			// console.log(i, ">>>", currentFeatures.toString(), ">>>", currentLabel, ">>>", predictedLabel);
		}
	}

	
}

function Test(){
    currentFeatures = irisData.pick(testingSampleIndex).slice([0,4]);
    currentLabel = irisData.get(testingSampleIndex,-1);
	var predictedLabel = knnClassifier.classify(currentFeatures.tolist(), GotResults);
	// console.log(currentFeatures.toString(), ">>>", currentLabel, ">>>", predictedLabel);

	//console.log(irisData.pick(testingSampleIndex).toString());
	/*for (var i=0; i<numSamples; i++){
		if(i%2 != 0){
			//console.log(i, ">>>", irisData.pick(i).toString());
		}
	}*/


}

function GotResults(err, result){
	//Test();
	// console.log((result));
	// console.log(result.classIndex, ">>>", parseInt(result.label));
    predictedClassLabels.set(testingSampleIndex, parseInt(result.label));
    testingSampleIndex+=2;
    if (testingSampleIndex > numSamples) {
        testingSamples = 1;
    }
}

function DrawCircles(){
    var x,y,c, color;
    for(var i=0; i< numSamples; i++){
        x = irisData.get(i,0);
        y = irisData.get(i,1);
        c =  irisData.get(i, -1);

        switch (c) {
            case 0:
                fill('red');
                break;
            case 1:
                fill('limegreen');
                break;
            case 2:
                fill('blue');
                break;
        }
        // edge color depending on row.
        if (i % 2 != 0) {
            switch (predictedClassLabels.get(i)) {
                case 0:
                    strokeWeight(2);
                    stroke('red');
                    break;
                case 1:
                    strokeWeight(2);
                    stroke('limegreen');
                    break;
                case 2:
                    strokeWeight(2);
                    stroke('blue');
                    break;
            }
        } else {
            stroke(0,0,0)
        }
        circle(x*150, y*150, 10);
    }

       /* if (c == 0) {
            // color = 'red';
            color = 'rgb(255, 80, 80)';
            fill(color);
        } else if(c == 1){
            // color = "blue";
            color = 'rgb(0, 153, 204)';
            fill(color);
        }else if(c = 2){
            color = 'rgb(153, 255, 51)';
            // color = "limegreen";
            fill(color);
        } 

        

        if (i%2 != 0){
            if (c == 0) {
            // color = 'red';
                color = 'rgb(255, 80, 80)';
                stroke(color);
            } else if(c == 1){
            // color = "blue";
                color = 'rgb(0, 153, 204)';
                stroke(color);
            }else if(c = 2){
                color = 'rgb(153, 255, 51)';
            // color = "limegreen";
                stroke(color);
            }
            strokeWeight(2);
            // stroke(color);
        }else if (i%2 == 0){
            strokeWeight(2);
            stroke(0,0,0);
        }
        // console.log(x, ">>>", y);
        circle(x*150, y*150, 10)*/
}