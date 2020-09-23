const calculate = document.querySelector("#calculate");
const inputField = document.querySelector("#inputField");
const outputField = document.querySelector("#outputField");

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

function createTable(tableDiv, tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  tableDiv.appendChild(table);
}

function interpolation() {
  outputField.innerHTML = "";
  var datas = JSON.parse(inputField.value);

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

  for (var i = 0; i < datas.x.length; i++) {
    datas.y[i].unshift(datas.x[i]);
  }
  createTable(outputField,datas.y);
  outputField.innerHTML += "<br> Lx = " + Lx;
}