function loadAllWarranties() {

    $('#allWarrantiesTable').dataTable({
        "bProcessing": true,
        "sAjaxSource": 'DataTable/loadWarranties.jag?operation=getAllWarranty',
        "bAutoWidth": false,
        "sPaginationType": "full_numbers",
        "bJQueryUI": true,
        "aaSorting": [[ 4, "desc" ]]
    });
<<<<<<< HEAD
}


function loadIssues(resolved, tableArea, table) {
    $.post("admin/dataGetFiles/admin_data_get.jag", {
        operation: "getIssueBasicDetails",
        resolved: resolved
    }, function (data) {
        var issueTbl = document.getElementById(table);
        var issueArea = document.getElementById(tableArea);
        issueArea.setAttribute('class', 'datagrid');
        var tbody = document.createElement('tbody');

        var objArray = JSON.parse(data);

=======

    // $.post("admin_data_get.jag", {
    //     operation: "getAllWarranty"
    // }, function (data) {
    //     var warrantyTbl = document.getElementById('allWarrantiesTable');
    //     var warrantyArea = document.getElementById("allWarranties");
    //     warrantyArea.setAttribute('class', 'datagrid');
    //     var tbody = document.createElement('tbody');

    //     var objArray = JSON.parse(data);

    //     if (objArray.length == 0) {
    //         warrantyTbl.style.display = "none";
    //         var noDataField = document.createElement('div');
    //         noDataField.innerHTML = "Sorry No Data Available";
    //         warrantyArea.appendChild(noDataField);
    //     } else {

    //         for (var i = 0; i < objArray.length; i++) {

    //             var object = objArray[i];
    //             var newRow = document.createElement('tr');
    //             var warrantyId;

    //             if (i % 2 == 0) {
    //                 newRow.setAttribute("class", "alt");
    //             }

    //             for (var property in object) {
    //                 var td = document.createElement('td');
    //                 td.style.padding = '3px 20px';

    //                 if (property == "warranty_number") {
    //                     warrantyId = object[property];
    //                 }

    //                 if (property == "status") {
    //                     var status = object[property];
    //                     switch (status) {
    //                     case "0":
    //                         {
    //                             newRow.setAttribute("class", "err");
    //                             td.appendChild(document.createTextNode("Void"));
    //                         }
    //                         break;

    //                     case "1":
    //                         {
    //                             td.appendChild(document.createTextNode("Valid"));
    //                         }
    //                         break;
    //                     };

    //                 } else {
    //                     td.appendChild(document.createTextNode(object[property]));
    //                 }

    //                 newRow.appendChild(td);
    //             }

    //             var linkTd = document.createElement('td');
    //             var link = document.createElement('a');
    //             link.setAttribute("href", ("admin_warranty_details.jag?id=" + warrantyId));
    //             link.innerHTML = 'more';
    //             linkTd.appendChild(link);
    //             newRow.appendChild(linkTd);

    //             tbody.appendChild(newRow);
    //         }
    //         warrantyTbl.appendChild(tbody);
    //     }
    // });
}

function loadIssues(resolved, tableArea, table) {
    //$.post("admin_home_Operations.jag",{operation:"getAllissues"},function(data){
    $.post("admin_data_get.jag", {
        operation: "getIssueBasicDetails",
        resolved: resolved
    }, function (data) {
        var issueTbl = document.getElementById( /*'issuesTable'*/ table);
        var issueArea = document.getElementById( /*"allIssuesDiv"*/ tableArea);
        issueArea.setAttribute('class', 'datagrid');
        var tbody = document.createElement('tbody');

        alert(data);

        var objArray = JSON.parse(data);

        // alert(objArray.length);

>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
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
<<<<<<< HEAD
                link.setAttribute("href", ("adminissues?id=" + issueId));
                link.setAttribute("target","_blank");
=======
                link.setAttribute("href", ("/HW_REPO/adminissues?id=" + issueId));
>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
                link.innerHTML = 'more';
                linkTd.appendChild(link);
                newRow.appendChild(linkTd);

                tbody.appendChild(newRow);
            }
            issueTbl.appendChild(tbody);
        }


    });
}