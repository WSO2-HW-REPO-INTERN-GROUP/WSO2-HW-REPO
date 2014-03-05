    function acceptRejectBtnClick(requestId, action) {        
        $.post("admin/dataGetFiles/admin_devices_updates.jag", {
            operation: "acceptRejcetRequest",
            value: action,
            req_id: requestId
        }, function (data, status) {
            if(data=='SUCCESSFUL'){

                if(action=='2'){
                    var emailOptions={
                        "to":'nadeeshaangunasinghe@gmail.com',
                        "message":"Sorry! Your device request has been rejected.For more details check your Hardware repo account",
                        "subject":"Device Request Rejected by Admin"
                    };

                    sendMail(emailOptions);
                }


                location.reload(true);
            }
            else{
                alert("Error While Updating Database");
            }
        });

    }

    function loadUnassignedRequests(){
        $("#assignDevicePopup").dialog("open");
            $.post("admin/dataGetFiles/admin_requests_data_get.jag",{operation:"getUnassignedDevices"

            }, function(data,status){

                var devicesTbl=document.getElementById('assignDevices');
                var tableArea=document.getElementById("requestDeviceDetailsDiv");
                tableArea.setAttribute('class','datagrid');
                var tbody=document.createElement('tbody');
            
                var objArray = JSON.parse(data);

                var i = 0;



                for (var i = 0; i < objArray.length; i++) {

                    var deviceId;
                    var newRow = document.createElement('tr');

                    if (i % 2 == 0) {
                        newRow.setAttribute("class", "alt");
                    }

                    var object = objArray[i];

                    for (var property in object) {

                        var td = document.createElement('td');

                        td.appendChild(document.createTextNode(object[property]));

                        if (property == "device_id") {
                            deviceId = object[property];
                        }

                        newRow.appendChild(td);
                    }
                    var link = document.createElement('a');
                    link.setAttribute("href", "admindevicedetails?id=" + deviceId);
                    link.innerHTML = "more";
                    var linkTD = document.createElement("td");
                    linkTD.appendChild(link);
                    newRow.appendChild(linkTD);

                    tbody.appendChild(newRow);
                }

                devicesTbl.appendChild(tbody);

            });

    }



    function loadRequests() {
        $.post("admin/dataGetFiles/admin_requests_data_get.jag", {
            operation: "getUnresolved"
        }, function (data, status) {

            var objArray = JSON.parse(data);

            var unresolvedTablearea = document.getElementById('unresolvedDiv');
            var pendingTablearea = document.getElementById('pendingDiv');
            var rejectedTablearea = document.getElementById('rejectedDiv');

            unresolvedTablearea.setAttribute("class", "datagrid");
            pendingTablearea.setAttribute("class", "datagrid");
            rejectedTablearea.setAttribute("class", "datagrid");

            for (var i = 0; i < objArray.length; i++) {

                var resolvedStatus;
                var cntr = 0;

                var newTable = document.createElement('table');
                newTable.style.width = '600px';
                newTable.style.margin = '25px 0px 15px 50px';

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

                    if (property == 'request_id') {
                        th.appendChild(document.createTextNode("Request ID: " + object[property]));

                        var acceptBttn = document.createElement('input');
                        var rejectBttn = document.createElement('input');
                        var getDevicesLbl=document.createElement('label');
                        getDevicesLbl.setAttribute('class',"linkLabel");
                        getDevicesLbl.innerHTML="Get Unassigned Devices";
                        getDevicesLbl.style.marginLeft = "25px";

                        acceptBttn.setAttribute("type", "button");
                        acceptBttn.setAttribute("id", object[property]);
                        acceptBttn.setAttribute("value", "Accept");
                        acceptBttn.setAttribute("class", "siteButton");
                        acceptBttn.style.marginLeft = "25px";

                        rejectBttn.setAttribute("value", "Reject");
                        rejectBttn.setAttribute("type", "button");
                        rejectBttn.setAttribute("id", object[property]);
                        rejectBttn.setAttribute("class", "siteButton");
                        rejectBttn.style.marginLeft = "25px";

                        acceptBttn.setAttribute("onClick", "acceptRejectBtnClick(" + object[property] + ",1)");
                        rejectBttn.setAttribute("onClick", "acceptRejectBtnClick(" + object[property] + ",2)");
                        getDevicesLbl.setAttribute("onClick", "loadUnassignedRequests()");
                    } else if (property == "resolved") {
                        resolvedStatus = object[property];
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



                var buttonRow = document.createElement('tr');
                var buttonTd = document.createElement('td');
                var br=document.createElement('br');

                var btnDiv = document.createElement('div');
                btnDiv.style.marginLeft = "25px";

                switch (resolvedStatus) {
                case "0":
                    {
                        btnDiv.appendChild(acceptBttn);
                        btnDiv.appendChild(rejectBttn);
                        btnDiv.appendChild(getDevicesLbl);

                        newTable.appendChild(tbody);
                        unresolvedTablearea.appendChild(newTable);
                        unresolvedTablearea.appendChild(btnDiv);
                        break;
                    }
                case "1":
                    {
                        newTable.appendChild(tbody);
                        pendingTablearea.appendChild(newTable);
                        break;
                    }
                case "3":
                    {

                        btnDiv.appendChild(acceptBttn);
                        btnDiv.appendChild(rejectBttn);

                        newTable.appendChild(tbody);
                        rejectedTablearea.appendChild(newTable);
                        rejectedTablearea.appendChild(btnDiv);
                        break;
                    }
                }
            }

        });
    }