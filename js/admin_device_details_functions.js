function readURL() {
    var urlData = window.location.search.substring(1);
    deviceID = urlData.split("=");
<<<<<<< HEAD
    $.post("admin/dataGetFiles/admin_devices_data_get.jag", {
=======
    alert(deviceID);

    $.post("admin_devices_data_get.jag", {
>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
        device_id: deviceID[1],
        operation: "getDeviceDetails"
    }, function (data, status) {

<<<<<<< HEAD
=======
        alert(data);

>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
        var i = 0;

        var basicDetailsTbl = document.getElementById('basicFeaturesTbl');
        var basicDetailsArea = document.getElementById("basicDetailsDiv");
        var editableBasicDetailsTbl = document.getElementById('editableBasicFeaturesTbl');
        var editableBasicDetailsArea = document.getElementById("editableBasicDetailsDiv");
        var assignBtn = document.getElementById("assign");
        var revokeBtn = document.getElementById("revoke");

        basicDetailsTbl.style.width = "600px";
        basicDetailsArea.setAttribute('class', 'datagrid');
        editableBasicDetailsTbl.style.width = "600px";
        editableBasicDetailsArea.setAttribute('class', 'datagrid');
        var tbody = document.createElement('tbody');
        var editableTbody = document.createElement('tbody');

        var object = JSON.parse(data);

        for (var property in object) {

            if (property == "assigned_state" && object[property] == "true") {
                assignBtn.style.display = "none";
                revokeBtn.style.display = "";
            } else if (property == "assigned_state" && object[property] == "false") {
                assignBtn.style.display = "";
                revokeBtn.style.display = "none";
            } else {

                //if(object[property]!=null){
                var newRow = document.createElement('tr');
                var editableNewRow = document.createElement('tr');

                if (i % 2 == 0) {
                    newRow.setAttribute("class", "alt");
                    editableNewRow.setAttribute("class", "alt");
                }

                var td1 = document.createElement('td');
                td1.style.width = "50px";
                td1.style.padding = '3px 20px';
                var td2 = document.createElement('td');
                td2.style.padding = '3px 20px';

                var td3 = document.createElement('td');
                td3.style.width = "50px";
                td3.style.padding = '3px 20px';
                var td4 = document.createElement('td');
                td4.style.padding = '3px 20px';     


                td1.appendChild(document.createTextNode(property));
                td1.setAttribute("class","idCell");
                td3.appendChild(document.createTextNode(property));
                td3.setAttribute("class","idCell");

                if(typeof object[property] == 'object'){
                    td2.appendChild(document.createTextNode("Not Assigned"));

                
                    td4.appendChild(document.createTextNode("Not Assigned"));
<<<<<<< HEAD
                    td4.setAttribute("contentEditable","true");
=======
                    td4.setAttribute("contentEditable","false");
>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
                    td4.setAttribute("class","editableCell");
                }

                else{
                    td2.appendChild(document.createTextNode(object[property]));

                
                    td4.appendChild(document.createTextNode(object[property]));

                    if(property=='device_id'){
                        td4.setAttribute("contentEditable","false");
                    }
                    else{
                        td4.setAttribute("contentEditable","true");
                    }
                    
                    td4.setAttribute("class","editableCell");
                }
                
                
                

                newRow.appendChild(td1);
                newRow.appendChild(td2);

                editableNewRow.appendChild(td3);
                editableNewRow.appendChild(td4);

                tbody.appendChild(newRow);
                editableTbody.appendChild(editableNewRow);

                i++;
                // }

            }
        }

        editableBasicDetailsTbl.appendChild(editableTbody);
        basicDetailsTbl.appendChild(tbody);

    });
}


function getUpgradeHistory() {

    var urlData = window.location.search.substring(1);
    var deviceID = urlData.split("=");
<<<<<<< HEAD
    $.post("admin/dataGetFiles/admin_data_get.jag", {
=======
    $.post("admin_data_get.jag", {
>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
        operation: "upgradeHistory",
        device_id: deviceID[1]
    }, function (data, status) {

<<<<<<< HEAD
=======
        alert("dnfsdfjskjkfjsl---" + data);

>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
        var objArray = JSON.parse(data);

        var tablearea = document.getElementById('upgradeHistoryDiv');
        tablearea.setAttribute("class", "datagrid");

        for (var i = 0; i < objArray.length; i++) {

            var cntr = 0;

            var newTable = document.createElement('table');
            newTable.style.width = '600px';
            newTable.style.margin = '0px 0px 15px 50px';

            var thead = document.createElement('thead');
            var htr = document.createElement('tr');
            var th = document.createElement('th');
            var tbody = document.createElement('tbody');
            th.setAttribute('colspan', '2');
            th.style.height = '15px';
            htr.appendChild(th);
            thead.appendChild(htr);
            newTable.appendChild(thead);

            var object = objArray[i];

            for (var property in object) {

                var newRow = document.createElement('tr');

                if (cntr % 2 == 0) {
                    newRow.setAttribute("class", "alt");
                }

                if (property == 'upgrade_id') {
                    th.appendChild(document.createTextNode("Upgrade ID: " + object[property]));
                } else {

                    var td1 = document.createElement('td');
                    var td2 = document.createElement('td');

                    td1.appendChild(document.createTextNode(property));
                    td2.appendChild(document.createTextNode(object[property]));

                    newRow.appendChild(td1);
                    newRow.appendChild(td2);

                    tbody.appendChild(newRow);

                }

                cntr++;

            }
            newTable.appendChild(tbody);

            tablearea.appendChild(newTable);
        }
    });
}




function getAccessories() {

    var urlData = window.location.search.substring(1);
    var deviceID = urlData.split("=");

<<<<<<< HEAD
    $.post("admin/dataGetFiles/admin_devices_data_get.jag", {
=======
    $.post("admin_devices_data_get.jag", {
>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
        operation: "getAccessories",
        deviceID: deviceID[1]
    }, function (data, status) {

        var objArray = JSON.parse(data);

        var tablearea = document.getElementById('accessoryDiv');
        tablearea.setAttribute("class", "datagrid");

        for (var i = 0; i < objArray.length; i++) {

            var cntr = 0;

            var removeAccRow = document.createElement('tr');
            var removeAccTd = document.createElement('td');
            var removeLbl = document.createElement('label');
            removeLbl.innerHTML = "Remove Accessory";
            removeLbl.setAttribute('class', 'linkLabel');
            removeAccTd.setAttribute("colspan", 2);

            var newTable = document.createElement('table');
            newTable.style.width = '600px';
            newTable.style.margin = '0px 0px 15px 0px';

            var thead = document.createElement('thead');
            var htr = document.createElement('tr');
            var th = document.createElement('th');
            var tbody = document.createElement('tbody');
            th.setAttribute('colspan', '2');
            th.style.height = '15px';
            th.style.borderTopLeftRadius = "3px";
            th.style.borderTopRightRadius = "3px";
            htr.appendChild(th);
            thead.appendChild(htr);
            newTable.appendChild(thead);

            var object = objArray[i];

            for (var property in object) {

                var newRow = document.createElement('tr');

                if (cntr % 2 == 0) {
                    newRow.setAttribute("class", "alt");
                }

                if (property == 'accessory_id') {
                    var accId = object[property]
                    th.appendChild(document.createTextNode("Accessory ID: " + accId));
<<<<<<< HEAD
=======
                    alert("jdklfsjkfdl");
>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
                    removeLbl.onclick = function () {
                        var inputData = {
                            "accID": accId
                        };
<<<<<<< HEAD
                        $.post("admin/dataGetFiles/admin_devices_updates.jag", {
                            operation: "removeAccessory",
                            inputs: JSON.stringify(inputData)
                        }, function (data, status) {
                            if(data=='SUCCESSFUL'){
                                location.reload(true);
                            }
                            else{
                                alert("Error While Updating Database");
                            }
=======
                        $.post("admin_devices_updates.jag", {
                            operation: "removeAccessory",
                            inputs: JSON.stringify(inputData)
                        }, function (data, status) {
                            alert(data);
>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
                        });
                    };

                } 

                else if(property=='currently_assigned'){
                    if(object[property]=='0'){
                         removeAccTd.style.display="none";
                    }
                }


                else {

                    var td1 = document.createElement('td');
                    var td2 = document.createElement('td');

                    td1.appendChild(document.createTextNode(property));
                    td2.appendChild(document.createTextNode(object[property]));

                    newRow.appendChild(td1);
                    newRow.appendChild(td2);

                    tbody.appendChild(newRow);

                }

                cntr++;

            }
            removeAccTd.appendChild(removeLbl);
            removeAccRow.appendChild(removeAccTd);
            tbody.appendChild(removeAccRow);
            newTable.appendChild(tbody);

            tablearea.appendChild(newTable);
        }
    });
}

function getReportedIssues() {

    var urlData = window.location.search.substring(1);
    var deviceID = urlData.split("=");
<<<<<<< HEAD
    var issueID="";
    $.post("admin/dataGetFiles/admin_devices_data_get.jag", {
=======
    alert(deviceID);

    $.post("admin_devices_data_get.jag", {
>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
        operation: "getReportedIssues",
        device_id: deviceID[1]
    }, function (data, status) {

<<<<<<< HEAD
=======
        alert(data);

>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
        var objArray = JSON.parse(data);

        var tablearea = document.getElementById('deviceIssuesDevision');
        tablearea.setAttribute("class", "datagrid");

        for (var i = 0; i < objArray.length; i++) {
<<<<<<< HEAD
=======

>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
            var cntr = 0;
            var device_id;

            var newTable = document.createElement('table');
            newTable.style.width = '600px';
            newTable.style.margin = '0px 0px 15px 50px';

            var thead = document.createElement('thead');
            var htr = document.createElement('tr');
            var th = document.createElement('th');
            var tbody = document.createElement('tbody');
            th.setAttribute('colspan', '2');
            th.style.height = '15px';
            htr.appendChild(th);
            thead.appendChild(htr);
            newTable.appendChild(thead);

            var object = objArray[i];

            for (var property in object) {

                var newRow = document.createElement('tr');

                if (cntr % 2 == 0) {
                    newRow.setAttribute("class", "alt");
                }

                if (property == 'issue_number') {
<<<<<<< HEAD
    		    issueID=object[property];
=======
>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
                    th.appendChild(document.createTextNode("Issue ID: " + object[property]));
                }

                if (property == "device_id") {
                    device_id = object[property];
                } else {

                    var td1 = document.createElement('td');
                    var td2 = document.createElement('td');

                    td1.appendChild(document.createTextNode(property));
                    td2.appendChild(document.createTextNode(object[property]));

                    newRow.appendChild(td1);
                    newRow.appendChild(td2);

                    tbody.appendChild(newRow);

                }
                cntr++;

            }

            var linkRow = document.createElement('tr');

            if (cntr % 2 == 0) {
                linkRow.setAttribute("class", "alt");
            }

            var linkTd = document.createElement('td');
            linkTd.setAttribute("colspan", "2");

            var link = document.createElement('a');
<<<<<<< HEAD
            link.setAttribute("href", ("adminissues?id=" +issueID));
=======
            link.setAttribute("href", ("/HW_REPO/adminissues?id=" + device_id));
>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
            link.innerHTML = 'more';
            linkTd.appendChild(link);
            linkRow.appendChild(linkTd);
            tbody.appendChild(linkRow);

            newTable.appendChild(tbody);

            tablearea.appendChild(newTable);
        }

    });
}


function getWarrantyDetails(){
    var urlData = window.location.search.substring(1);
    var deviceID = urlData.split("=");
<<<<<<< HEAD
    $.post("admin/dataGetFiles/admin_devices_data_get.jag", {
=======
    $.post("admin_devices_data_get.jag", {
>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
        operation: "accessoryWarrantyDetails",
        device_id: deviceID[1]
    }, function (data, status) {

<<<<<<< HEAD
=======
        alert("dnfsdfjskjkfjsl---" + data);

>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
        var objArray = JSON.parse(data);

        var tablearea = document.getElementById('warrantyDetailsDevision');
        tablearea.setAttribute("class", "datagrid");

        for (var i = 0; i < objArray.length; i++) {

            var cntr = 0;

            var newTable = document.createElement('table');
            newTable.style.width = '600px';
            newTable.style.margin = '0px 0px 15px 50px';

            var thead = document.createElement('thead');
            var htr = document.createElement('tr');
            var th = document.createElement('th');
            var tbody = document.createElement('tbody');
            th.setAttribute('colspan', '2');
            th.style.height = '15px';
            htr.appendChild(th);
            thead.appendChild(htr);
            newTable.appendChild(thead);

            var object = objArray[i];

            for (var property in object) {

                var newRow = document.createElement('tr');

                if (cntr % 2 == 0) {
                    newRow.setAttribute("class", "alt");
                }

                if (property == 'warranty_number') {
                    th.appendChild(document.createTextNode("Waranty ID: " + object[property]));
                } else {

                    var td1 = document.createElement('td');
                    var td2 = document.createElement('td');

                    td1.appendChild(document.createTextNode(property));
                    td2.appendChild(document.createTextNode(object[property]));

                    newRow.appendChild(td1);
                    newRow.appendChild(td2);

                    tbody.appendChild(newRow);

                }

                cntr++;

            }
            newTable.appendChild(tbody);

            tablearea.appendChild(newTable);
        }
    });
}
