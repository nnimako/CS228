var numSamples = irisData.shape[0];
var numFeatures = irisData.shape[1] - 1;
var predictedClassLabels = nj.zeros(numSamples);
function DrawCircles() {
    for (var i = 0; i < numSamples; i++) {
        var x = irisData.get(i, 0) * 150;
        var y = irisData.get(i, 1) * 150;
        var c = irisData.get(i, 4); // actual sample label.
        // color circles.
        switch (c) {
            case 0:
                fill('rgb(255, 80, 80)');
                break;
            case 1:
                fill('rgb(0, 153, 204)');
                break;
            case 2:
                fill('rgb(153, 255, 51)');
                break;
        }
        // edge color depending on row.
        if (i % 2 != 0) {
            switch (predictedClassLabels.get(i)) {
                case 0:
                    strokeWeight(2);
                    stroke('rgb(255, 80, 80)');
                    break;
                case 1:
                    strokeWeight(2);
                    stroke('rgb(0, 153, 204)');
                    break;
                case 2:
                    strokeWeight(2);
                    stroke('rgb(153, 255, 51)');
                    break;
            }
        } else {
            stroke('black')
        }
        circle(x, y, 10);
    }
}
function GotResults(err, result) {
    predictedClassLabels.set(testingSampleIndex, parseInt(result.label));
    testingSampleIndex <= numSamples ? testingSampleIndex += 2 : testingSampleIndex = 0;
}

function Test() {
    var currentLabel = irisData.get(testingSampleIndex, -1);
    var currentFeatures = irisData.pick(testingSampleIndex).slice([0, 4]);
    predictedLabel = knnClassifier.classify(currentFeatures.tolist(), GotResults);
}

function Train() {
    for (var i = 0; i <= numSamples; i += 2) {
        var currentLabel = irisData.get(i, -1);
        var currentFeatures = irisData.pick(i).slice([0, 4]);
        var features = currentFeatures.tolist();
        knnClassifier.addExample(features, currentLabel);
        //console.log(i, currentFeatures.toString(), currentLabel);
    }
    //console.log("training complete")
    trainingCompleted = true;
}
function draw() {
    clear();
    if (!trainingCompleted) {
        Train();
    }
    Test();
    DrawCircles();
}