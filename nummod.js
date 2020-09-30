/**
 * Newton’s Divided Difference Interpolation Formula implementation.
 * Created by Sándor Balázs
 * AX400
 */

//The main calculate button and the eventlisener.
const calculateButton = document.querySelector("#calculate");
calculateButton.addEventListener("pointerdown", calculate);

//The input and the autput fields.
const inputField = document.querySelector("#inputField");
const outputField = document.querySelector("#outputField");

//rounding to 3 digit
var rountTo = 3;

//The main data structure for the algorithm.
var datas = {"x":[-2,-1,0,1,2], "y":[
[-15,0,0,0,0],
[-4, 0,0,0,0],
[-1, 0,0,0,0],
[ 0, 0,0,0,0],
[ 5, 0,0,0,0]]};

//Generate the input table.
createInputTable(inputField, datas);

//Fill the divided difference table.
function generateDividedDifferenceTable(x, y, n) { 
	for (var i = 1; i < n; i++) { 
		for (var j = 0; j < n - i; j++) { 
      y[j][i] = (y[j][i - 1] - y[j + 1] [i - 1]) / (x[j] - x[i + j]);
		} 
	} 
}

//Read the input datas.
function updateDatasFromInputField(datas) {
  for (let i = 0; i < datas.x.length; i++) {
    var cell = document.querySelector('#inputX'+i);
    datas.x[i] = parseFloat(cell.value);
    cell = document.querySelector('#inputY'+i);
    datas.y[i][0] = parseFloat(cell.value);
    for (let j = 1; j < datas.x.length; j++) {
      datas.y[i][j] = 0;
    }
  }
}

//A correct round function.
function roundNumber(num, scale) {
  if(!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + scale)  + "e-" + scale);
  } else {
    var arr = ("" + num).split("e");
    var sig = ""
    if(+arr[1] + scale > 0) {
      sig = "+";
    }
    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
  }
}

//Generating of the Lx string.
function LXStringGenerator(datas, rountTo) {
  var Lx= "";
  for (var i = 0; i < datas.x.length; i++) {
    Lx += roundNumber(datas.y[0][i], rountTo);
    if(i > 0) Lx += " * ";
    for (var j = 0; j < i; j++) {
      if(datas.x[j] >= 0) {
        Lx += "(x - " + roundNumber(datas.x[j], rountTo) + ")";
      } else {
        Lx += "(x + " + Math.abs(roundNumber(datas.x[j], rountTo)) + ")";
      }
    }
    if (i < datas.x.length-1) Lx += " + ";
  }
  return Lx;
}

//The main caculation method. Call from the main button.
function calculate() {
  outputField.innerHTML = "";
  updateDatasFromInputField(datas);
  generateDividedDifferenceTable(datas.x, datas.y, datas.x.length);
  createTable(outputField, datas);
  outputField.innerHTML += "<br> Lx = " + LXStringGenerator(datas, rountTo);
}