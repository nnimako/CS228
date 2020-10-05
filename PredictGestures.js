testingSampleIndex = 0;
const knnClassifier = ml5.KNNClassifier();

var trainingCompleted = false;

var currentFeatures;
var currentLabel;

// var features = train0.pick(null,null,null,testingSampleIndex).reshape(120);

function draw(){
    clear();
    if (!trainingCompleted){
        Train();
        //trainingCompleted = true;
    }
    Test();
}

function Train(){
    for(var i=0; i<train0.shape[3]; i++){
        var features = train0.pick(null,null,null,i).reshape(120);
        knnClassifier.addExample(features.tolist(),0);
    }

    for(var i=0; i<train1.shape[3]; i++){
        var features = train1.pick(null,null,null,i).reshape(120);
        knnClassifier.addExample(features.tolist(),1);
    }
    trainingCompleted = true;
}

function Test(){
    features = train0.pick(null,null,null,testingSampleIndex);
    currentLabel = 0;
    var predictedLabel = knnClassifier.classify(features.tolist(), GotResults);
}

function GotResults(err, result){
    // predictedClassLabels.set(testingSampleIndex, parseInt(result.label));
    console.log(testingSampleIndex, ">>>", result.label);
    testingSampleIndex+=1;
    if (testingSampleIndex >= test.shape[3]) {
        testingSamples = 0;
    }
}

/*function DrawCircles(){
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
}*/