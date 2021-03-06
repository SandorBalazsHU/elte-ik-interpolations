/**
 * Newton’s Divided Difference Interpolation Formula implementation.
 * Created by Sándor Balázs
 * AX400
*/

/**
 * Input field generator.
 * @param {Div} tableDiv The div for the table.
 * @param {Data} tableData The datas for the table.
 */
function createInputTable(tableDiv, tableData) {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');
    
//The first row.
    //The first row header.
    var row = document.createElement('tr');
    row.setAttribute('id', 'rowX');
    var cell = document.createElement('td');
    cell.appendChild(document.createTextNode("x:"));
    row.appendChild(cell);
    
    //Generating the first row content.
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
    
    //The + button in the first row.
    cell = document.createElement('td');
    var input = document.createElement("input");
    input.setAttribute('type', 'button');
    input.setAttribute('id', 'addColumn');
    input.setAttribute('value', "+");
    //Eventlistener for the new column adding.
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
    
//The second row.
    //The socond row header.
    var row = document.createElement('tr');
    row.setAttribute('id', 'rowY');
    var cell = document.createElement('td');
    cell.appendChild(document.createTextNode("y:"));
    row.appendChild(cell);
    
    //Generating the second row content.
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
    
    //The - button in the second row.
    cell = document.createElement('td');
    var input = document.createElement("input");
    input.setAttribute('type', 'button');
    input.setAttribute('id', 'removeColumn');
    input.setAttribute('value', "-");
    //Eventlistener for the column deleting.
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

/**
 * Generate the output table
 * @param {Div} tableDiv The div for the table.
 * @param {Data} tableData The datas for the table.
 * @param {int} rountTo The float rounding scale.
 */
function createTable(tableDiv, tableData) {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');
  
    for (var i = 0; i < tableData.x.length; i++) {
      var row = document.createElement('tr');
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(roundNumber(tableData.x[i], rountTo)));
      row.appendChild(cell);
  
      for (var j = 0; j < tableData.y.length; j++) {
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode(roundNumber(tableData.y[i][j], rountTo)));
        row.appendChild(cell);
      };
      tableBody.appendChild(row);
    };
  
    table.appendChild(tableBody);
    tableDiv.appendChild(table);
  }
