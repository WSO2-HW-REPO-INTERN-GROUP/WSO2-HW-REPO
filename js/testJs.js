function loadAllWarranties() {

    $('#allWarrantiesTable').dataTable({
        "bProcessing": true,
        "sAjaxSource": 'DataTable/loadWarranties.jag?operation=getAllWarranty',
        "bAutoWidth": false,
        "sPaginationType": "full_numbers",
        "bJQueryUI": true,
        "aaSorting": [[ 4, "desc" ]]
    });
}


function loadIssues(resolved, tableArea, table) {
    $.post("admin/dataGetFiles/admin_data_get.jag", {
        operation: "getIssueBasicDetails",
        resolved: resolved
    }, function (data) {
        var issueTbl = document.getElementById(table);
        issueTbl.style.width="800px";
        var issueArea = document.getElementById(tableArea);
        issueArea.setAttribute('class', 'datagrid');
        var tbody = document.createElement('tbody');

        var objArray = JSON.parse(data);

        if (objArray.length == 0) {
            issueTbl.style.display = "none";
            var noDataField = document.createElement('div');
            noDataField.innerHTML = "Sorry No Data Available";
            issueArea.appendChild(noDataField);
        } else {

            issueTbl.style.display = "";

            for (var i = 0; i < objArray.length; i++) {

                var issueId;

                var object = objArray[i];
                var newRow = document.createElement('tr');

                if (i % 2 == 0) {
                    newRow.setAttribute("class", "alt");
                }

                for (var property in object) {
                    var td = document.createElement('td');
                    td.style.padding = '3px 20px';

                    if (property == "issue_number") {
                        issueId = object[property];
                    }

                    td.appendChild(document.createTextNode(object[property]));

                    newRow.appendChild(td);
                }

                var linkTd = document.createElement('td');
                var link = document.createElement('a');
                link.setAttribute("href", ("adminissues?id=" + issueId));
                link.setAttribute("target","_blank");
                link.innerHTML = 'more';
                linkTd.appendChild(link);
                newRow.appendChild(linkTd);

                tbody.appendChild(newRow);
            }
            issueTbl.appendChild(tbody);
        }


    });
}