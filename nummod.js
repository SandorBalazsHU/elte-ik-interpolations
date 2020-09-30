const calculate = document.querySelector("#calculate");
const inputField = document.querySelector("#inputField");
const outputField = document.querySelector("#outputField");
var rountTo = 3;
var datas = {"x":[-2,-1,0,1,2],
"y":[
[-15,0,0,0,0],
[-4, 0,0,0,0],
[-1, 0,0,0,0],
[ 0, 0,0,0,0],
[ 5, 0,0,0,0]]
};

calculate.addEventListener("pointerdown", interpolation);

function dividedDiffTable(x, y, n) { 
	for (var i = 1; i < n; i++) { 
		for (var j = 0; j < n - i; j++) { 
      y[j][i] = (y[j][i - 1] - y[j + 1] [i - 1]) / (x[j] - x[i + j]);
		} 
	} 
}

function createInputTable(tableDiv, tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  var row = document.createElement('tr');
  row.setAttribute('id', 'rowX');
  var cell = document.createElement('td');
  cell.appendChild(document.createTextNode("x:"));
  row.appendChild(cell);

  for (let i = 0; i < tableData.x.length; i++) {
    var cell = document.createElement('td');
    var input = document.createElement("input");
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'inputX'+i);
    input.setAttribute('size', '2');
    input.setAttribute('value', tableData.x[i]);
    cell.appendChild(input);
    row.appendChild(cell);
  }

  cell = document.createElement('td');
  var input = document.createElement("input");
  input.setAttribute('type', 'button');
  input.setAttribute('id', 'addColumn');
  input.setAttribute('value', "+");
  input.addEventListener("pointerdown", function() {
    updateDatasFromInputField(datas);
    datas.x.push(0);
    datas.y.push(new Array(tableData.x.length).fill(0));
    inputField.innerHTML="";
    createInputTable(inputField, datas);
  });
  cell.appendChild(input);
  row.appendChild(cell);

  tableBody.appendChild(row);





  var row = document.createElement('tr');
  row.setAttribute('id', 'rowY');
  var cell = document.createElement('td');
  cell.appendChild(document.createTextNode("y:"));
  row.appendChild(cell);

  for (let i = 0; i < datas.x.length; i++) {
    var cell = document.createElement('td');
    var input = document.createElement("input");
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'inputY'+i);
    input.setAttribute('size', '2');
    input.setAttribute('value', tableData.y[i][0]);
    cell.appendChild(input);
    row.appendChild(cell);
  }

  cell = document.createElement('td');
  var input = document.createElement("input");
  input.setAttribute('type', 'button');
  input.setAttribute('id', 'removeColumn');
  input.setAttribute('value', "-");
  input.addEventListener("pointerdown", function() {
    updateDatasFromInputField(datas);
    datas.x.pop();
    datas.y.pop();
    inputField.innerHTML="";
    createInputTable(inputField, datas);
  });
  cell.appendChild(input);
  row.appendChild(cell);

  tableBody.appendChild(row);




  table.appendChild(tableBody);
  tableDiv.appendChild(table);

}
createInputTable(inputField, datas);




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


function createTable(tableDiv, tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  for (var i = 0; i < tableData.x.length; i++) {

    var row = document.createElement('tr');

    var cell = document.createElement('td');
    cell.appendChild(document.createTextNode(roundNumber(tableData.x[i], rountTo)));
    row.appendChild(cell);

    tableData.y[i].forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(roundNumber(cellData, rountTo)));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  };

  table.appendChild(tableBody);
  tableDiv.appendChild(table);
}

function interpolation() {
  outputField.innerHTML = "";
  updateDatasFromInputField(datas);
  console.log(datas);
  dividedDiffTable(datas.x, datas.y, datas.x.length);

  var n = datas.x.length;
  var Lx= "";
  for (var i = 0; i < n; i++) {
    Lx += roundNumber(datas.y[0][i], rountTo);
    if(i > 0) Lx += " * ";
    for (var j = 0; j < i; j++) {
      if(datas.x[j] >= 0) {
        Lx += "(x - " + roundNumber(datas.x[j], rountTo) + ")";
      }else{
        Lx += "(x + " + Math.abs(roundNumber(datas.x[j], rountTo)) + ")";
      }
    }
    if (i < n-1) Lx += " + ";
  }

  createTable(outputField, datas);
  outputField.innerHTML += "<br> Lx = " + Lx;
}