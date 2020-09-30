const calculate = document.querySelector("#calculate");
const inputField = document.querySelector("#inputField");
const outputField = document.querySelector("#outputField");
var datas = {"x":[-2,-1,0,1,2],
"y":[
[-15,0,0,0,0],
[-4, 0,0,0,0],
[-1, 0,0,0,0],
[ 0, 0,0,0,0],
[ 5, 0,0,0,0]]
};
var numberOfDatas = 5;

calculate.addEventListener("pointerdown", function() {
  interpolation();
});

function dividedDiffTable(x, y, n) { 
	for (var i = 1; i < n; i++) { 
		for (var j = 0; j < n - i; j++) { 
      y[j][i] = (y[j][i - 1] - y[j + 1] [i - 1]) / (x[j] - x[i + j]);
		} 
	} 
}

function createInputTable(tableDiv, tableData, numberOfDatas) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  var row = document.createElement('tr');
  var cell = document.createElement('td');
  cell.appendChild(document.createTextNode("x:"));
  row.appendChild(cell);

  for (let i = 0; i < numberOfDatas; i++) {
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
  input.setAttribute('value', "+");
  cell.appendChild(input);
  row.appendChild(cell);

  tableBody.appendChild(row);





  var row = document.createElement('tr');
  var cell = document.createElement('td');
  cell.appendChild(document.createTextNode("y:"));
  row.appendChild(cell);

  for (let i = 0; i < numberOfDatas; i++) {
    var cell = document.createElement('td');
    var input = document.createElement("input");
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'inputY'+i);
    input.setAttribute('size', '2');
    input.setAttribute('value', tableData.y[i][0]);
    cell.appendChild(input);
    row.appendChild(cell);
  }

  tableBody.appendChild(row);




  table.appendChild(tableBody);
  tableDiv.appendChild(table);
}
createInputTable(inputField, datas, numberOfDatas);




function updateDatasFromInputField(inputField, datas, numberOfDatas) {
  for (let i = 0; i < numberOfDatas; i++) {
    var cell = document.querySelector('#inputX'+i);
    datas.x[i] = cell.value;
    cell = document.querySelector('#inputY'+i);
    datas.y[i][0] = cell.value;
  }
}





function createTable(tableDiv, tableData, numberOfDatas) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  for (var i = 0; i < numberOfDatas; i++) {

    var row = document.createElement('tr');

    var cell = document.createElement('td');
    cell.appendChild(document.createTextNode(tableData.x[i]));
    row.appendChild(cell);

    tableData.y[i].forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  };

  table.appendChild(tableBody);
  tableDiv.appendChild(table);
}

function interpolation() {
  outputField.innerHTML = "";
  updateDatasFromInputField(inputField, datas, numberOfDatas);

  dividedDiffTable(datas.x, datas.y, datas.x.length);

  var n = datas.x.length;
  var Lx= "";
  for (var i = 0; i < n; i++) {
    Lx += datas.y[0][i];
    if(i > 0) Lx += " * ";
    for (var j = 0; j < i; j++) {
      if(datas.x[j] >= 0) {
        Lx += "(x - " + datas.x[j] + ")";
      }else{
        Lx += "(x + " + Math.abs(datas.x[j]) + ")";
      }
    }
    if (i < n-1) Lx += " + ";
  }

  createTable(outputField, datas, numberOfDatas);
  outputField.innerHTML += "<br> Lx = " + Lx;
}