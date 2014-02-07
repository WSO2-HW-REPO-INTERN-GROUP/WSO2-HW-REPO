var appName = "WSO2-HW-REPO";
var controllerPath = "/WSO2-HW-REPO/controller/input.jag";

Hwdrepo = new function () {


    this.loadDevices = function () {
        HwdrepoUtil.makeJsonRequest("GET", controllerPath, "operation=loadDevices",
            function (html) {
                var devArea = document.getElementById('deviceArea');
                var devTable = document.getElementById("deviceTable");
                devArea.style.display = "";
                devArea.setAttribute('class', 'datagrid');
                var tbody = devArea;

                var obj = html;

                for (var i = 0; i < obj.devices.length; i++) {

                    var object = obj.devices[i];
                    var newRow = document.createElement('tr');


                    if (i % 2 == 0) {
                        newRow.setAttribute("class", "alt");
                    }


                    for (var property in object) {
                        var td = document.createElement('td');

                        if (property == "serial_number") {

                            var link = document.createElement('a');

                           link.setAttribute("href", "normal_device_details.jag?id=" + object['device_id']);
                           //link.setAttribute("onclick", 'window.open("normal_device_details.jag?id="' + object["device_id"].toString()+')');

                            link.innerHTML = object[property];
                            
                            td.appendChild(link);
                            newRow.appendChild(td);
                            break;
                        } else {
                            td.appendChild(document.createTextNode(object[property]));
                            newRow.appendChild(td);

                        }
                    }


                    tbody.appendChild(newRow);
                }


            });

    }
    this.viewRequests = function () {
        HwdrepoUtil.makeJsonRequest("GET", controllerPath, "operation=loadRequests", function (html) {

            Hwdrepo.fillRequestTable(html);

        });

    }

    this.fillRequestTable = function (html) {

        var reqArea = document.getElementById('requestArea');
        var reqTable = document.getElementById("requestTable");
        reqArea.style.display = "";
        reqArea.setAttribute('class', 'datagrid');
        var tbody = reqArea;

        tbody.innerHTML = '';

        var obj = html;

        for (var i = 0; i < obj.requests.length; i++) {

            var object = obj.requests[i];
            var newRow = document.createElement('tr');


            if (i % 2 == 0) {
                newRow.setAttribute("class", "alt");
            }


            for (var property in object) {


                var td = document.createElement('td');


                td.appendChild(document.createTextNode(object[property]));
                newRow.appendChild(td);

            }


            tbody.appendChild(newRow);
        }
    }

    this.requestDevice = function (deviceType, purpose, requirement) {

        //code to add device to html table
        /*
         var tbody=document.getElementById('requestArea');
         var newRow=document.createElement('tr');


         //  newRow.setAttribute("class","alt");


         var td=document.createElement('td');
         td.appendChild(document.createTextNode(deviceType));
         newRow.appendChild(td);

         var td=document.createElement('td');
         td.appendChild(document.createTextNode(purpose));
         newRow.appendChild(td);

         var td=document.createElement('td');
         td.appendChild(document.createTextNode(requirement));
         newRow.appendChild(td);

         tbody.appendChild(newRow);


         */

        HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
            operation: "addDeviceRequest",
            dev: {
                device: deviceType,
                purpose: purpose,
                req: requirement
            }
        }),
            function (data) {

                

            });

        this.viewRequests();


    }

    this.loadUpgradeHistory = function (deviceID) {

        HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
            operation: "upgradeHistory",
            deviceID: deviceID[1]
        }),

            function (data, status) {

                var objArray = data;

                var tablearea = document.getElementById('upgradeHistoryPopup');
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

                        if (property == 'Upgrade Id') {
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

    this.getDeviceDetails = function (deviceID) {

        HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
            operation: "getDeviceDetails",
            deviceID: deviceID
        }),
            function (data, status) {
                var i = 0;

                var basicDetailsTbl = document.getElementById('basicFeaturesTbl');

                var basicDetailsArea = document.getElementById("basicDetailsDiv");
                basicDetailsArea.setAttribute('class', 'datagrid');


                var thead = document.createElement('thead');
                var htr=document.createElement('tr');
                var th=document.createElement('th');

                htr.setAttribute('style','height: 25px');            
                th.setAttribute('colspan','2');
                //th.style.height='15px';
                //th.style.borderTopLeftRadius="3px";
                //th.style.borderTopRightRadius="3px";

                var tbody = document.createElement('tbody');

                var object = data;

                for (var property in object) {


                                    if(property=='serial_number'){
                                        th.appendChild(document.createTextNode("Serial Number: "+object[property]));
                                        //th.appendChild(document.createElement('br'));
                                        
                                    }

                    var newRow = document.createElement('tr');

                    if (i % 2 == 0) {
                        newRow.setAttribute("class", "alt");
                    }

                    var td1 = document.createElement('td');
                    var td2 = document.createElement('td');
                    td1.style.padding = '3px 20px';
                    td2.style.padding = '3px 20px';

                    td1.appendChild(document.createTextNode(property));
                    td2.appendChild(document.createTextNode(object[property]));

                    newRow.appendChild(td1);
                    newRow.appendChild(td2);
                    tbody.appendChild(newRow);

                    i++;
                }

                htr.appendChild(th);           
                thead.appendChild(th);

                basicDetailsTbl.innerHTML="";
                basicDetailsTbl.appendChild(thead);
                basicDetailsTbl.appendChild(tbody);
            });

    }
    this.getAccssories = function (deviceID) {


        HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
            operation: "getAccessories",
            deviceID: deviceID
        }),
            function (data, status) {

                var objArray=data;
            
                            var tablearea = document.getElementById('accessoryDiv');
                            tablearea.setAttribute("class","datagrid");
            
                            for(var i=0;i<objArray.length;i++){

                                var cntr=0;

                                var newTable=document.createElement('table');
                                newTable.style.width='600px';
                                newTable.style.margin='0px 0px 15px 0px';

                                var thead=document.createElement('thead');
                                var htr=document.createElement('tr');
                                var th=document.createElement('th');
                                var tbody=document.createElement('tbody');
                                th.setAttribute('colspan','2');
                                th.style.height='15px';
                                th.style.borderTopLeftRadius="3px";
                                th.style.borderTopRightRadius="3px";
                                htr.appendChild(th);
                                thead.appendChild(htr);
                                newTable.appendChild(thead);
            
                                var object=objArray[i];

                                for(var property in object){

                                    var newRow=document.createElement('tr');

                                    if(cntr%2==0){
                                        newRow.setAttribute("class","alt");
                                    }

                                    if(property=='accessory_id'){
                                        th.appendChild(document.createTextNode("Accessory ID: "+object[property]));
                                        th.appendChild(document.createElement('br'));
                                    }
                                    else if(property=='type'){
                                        th.appendChild(document.createTextNode("Type: "+object[property]));
                                    }

                                    else{

                                        var td1=document.createElement('td');
                                        var td2=document.createElement('td');

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

    this.loadIssueHistory = function (deviceID) {

        HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
            operation: "getIssues",
            deviceID: deviceID
        }),
            function (data) {

                var objArray = data;

                var tablearea = document.getElementById('deviceIssuesDevision');
                tablearea.setAttribute("class", "datagrid");

                tablearea.innerHTML = '';


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

                        if (property == 'Upgrade Id') {
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

                    var linkRow = document.createElement('tr');

                    if (cntr % 2 == 0) {
                        linkRow.setAttribute("class", "alt");
                    }

                    var linkTd = document.createElement('td');
                    linkTd.setAttribute("colspan", "2");

                    var link = document.createElement('a');
                    link.setAttribute("href", object[property]);
                    link.innerHTML = 'more';
                    linkTd.appendChild(link);
                    linkRow.appendChild(linkTd);
                    tbody.appendChild(linkRow);

                    newTable.appendChild(tbody);

                    tablearea.appendChild(newTable);
                }

            });

    }

    this.addIssue = function (issueData) {

        HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
            operation: "addIssue",
            issue: issueData
        }),
            function (data) {

                var errSpan = document.getElementById('addHdwErr');


                errSpan.classList.remove(errSpan.className);
                errSpan.classList.add("error");
                errSpan.textContent = JSON.stringify(data);
                // $('#addHdwErr').removeClass( "hidden" ).addClass("error" )
                // $('#addHdwErr').val(JSON.stringify(html));
                alert(JSON.stringify(data));
                $("#reportIssueDialog").dialog('close');
            });
    }

    this.getHardwareComponentDescription=function(deviceID){


        return "<p>'{This : Works}'</p>";

    }


}