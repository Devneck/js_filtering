/*
   Filename: filter.js


   Function List:
   resetTable()
      Resets the data table, displaying all table rows

   countRecords()
      Contains the number of visible rows in the data table, displaying the
      total in the "records" table cell

   checkCell(cell, filterText)
      If the inner content of the table cell does not equal the text string
      filterText, hides the table row of which the table cell is part.

   findCell(row, cellNum, filterText)
      Loops through the table cells within a table row moving from the 
      first cell to the last, until it finds the cellNum cell.

   filterTable(cellNum, filterText)
      Hides a table row if the content of the cellNum table cell does not equal
      the value of filterText

   filter()
      Filters the data table based on the values selected in the drop-down 
      selection lists. Also updates the record count.

   init()
      Initiates the Web page creating event handlers for each select element
      and counting the number of records in the data table

*/

window.onload = init;


function init() {
    var allSelects = document.getElementsByTagName("select");

    for (var selectBox = 0; selectBox < allSelects.length; selectBox++) {
        allSelects[selectBox].onchange = function() {
            filter();
        }
    }

    countRecords();
}

function resetTable() {
    var allRows = document.getElementsByTagName("tr");

    for (var row = 0; row < allRows.length; row++) {
        allRows[row].style.display = "";
    }
}

function countRecords() {
    var headRow = document.getElementById('titleRow');
    var rowCount = 0;

    for (var row = headRow.nextElementSibling;  row != null; row = row.nextElementSibling) {
        if (row.nodeName == "TR") {
            if (row.style.display == "") {
                rowCount += 1;
            }
        }
    }

    var txt = document.createTextNode(rowCount);
    var record = document.getElementById('records');

    if (record.hasChildNodes()) {
        record.firstChild.nodeValue = txt.nodeValue;
    } else {
        record.appendChild(txt);
    }
}

function checkCell(cell, filterText) {
    if (cell.firstChild.nodeValue != filterText) {
        cell.parentNode.style.display = "none";
    }
}

function findCell(row, cellNum, filterText) {
    var cellCount = 0

    for (var cell = row.firstElementChild; cell != null; cell = cell.nextElementSibling) {
        if (cell.nodeName == "TD") {
            cellCount += 1;
            if (cellCount == cellNum) {
                checkCell(cell, filterText);
            }
        }
    }

}

function filterTable(cellNum, filterText) {
    //alert("Cell: " + cellNum + "Filter: " + filterText);
    var headRow = document.getElementById('titleRow');

    for (var row = headRow.nextElementSibling; row != null; row = row.nextElementSibling) {
        if (row.nodeName == "TR") {
            findCell(row, cellNum, filterText);
        }
    }

}

function filter() {
    resetTable();
    var allSelects = document.getElementsByTagName('select');

    for (var sel = 0; sel < allSelects.length; sel++) {
        var filterText = allSelects[sel].value;
        if (filterText != "") {
            filterTable(sel + 1, filterText);
        }

    }

    countRecords();
}