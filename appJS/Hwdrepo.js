var appName = "WSO2-HW-REPO";
var controllerPath = "/WSO2-HW-REPO/controller/input.jag";

var Issuetemplate;
var Upgradetemplate;
var Warrantytemplate;
var Accessorytemplate;
var userID;


$.get(controllerPath, "operation=getUserID", function (data) {

    userID = data.user;

}, 'json');

$.get('templates/upgradeTemplate.html', function (template) {
    Upgradetemplate = template;
});


$.get('templates/issueTemplate.html', function (template) {
    Issuetemplate = template;
});
$.get('templates/warrantyTemplate.html', function (template) {
    Warrantytemplate = template;
});

$.get('templates/accessoryTemplate.html', function (template) {
    Accessorytemplate = template;
});

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

        //alert(JSON.stringify(html));


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
                deviceID: deviceID
            }),

            function (data, status) {

                var objArray = data;
                //alert(JSON.stringify(objArray));
                //var html = Mustache.render(Upgradetemplate,object);


                var tablearea = document.getElementById('upgradeDiv');
                tablearea.innerHTML = '';
                var formatting = "";

                for (var i = 0; i < objArray.length; i++) {

                    var object = objArray[i];

                    //alert(JSON.stringify(object));
                    var html = Mustache.render(Upgradetemplate, object);

                    formatting = formatting.concat(html);

                }
                tablearea.innerHTML = formatting;
            });
    }

    this.getDeviceDetails = function (deviceID) {

        HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
                operation: "getDeviceDetails",
                deviceID: deviceID
            }),
            function (data, status) {
                var i = 0;

                //alert(JSON.stringify(data));

                var basicDetailsTbl = document.getElementById('basicFeaturesTbl');

                var basicDetailsArea = document.getElementById("basicDetailsDiv");
                basicDetailsArea.setAttribute('class', 'datagrid');


                var thead = document.createElement('thead');
                var htr = document.createElement('tr');
                var th = document.createElement('th');

                htr.setAttribute('style', 'height: 25px');
                th.setAttribute('colspan', '2');
                //th.style.height='15px';
                //th.style.borderTopLeftRadius="3px";
                //th.style.borderTopRightRadius="3px";

                var tbody = document.createElement('tbody');

                var object = data;

                for (var property in object) {

                    if (property == 'serial_number') {
                        th.appendChild(document.createTextNode("Serial Number: " + object[property]));
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

                basicDetailsTbl.innerHTML = "";
                basicDetailsTbl.appendChild(thead);
                basicDetailsTbl.appendChild(tbody);

                return data;
            });

    }
    this.getAccssories = function (deviceID) {


        HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
                operation: "getAccessories",
                deviceID: deviceID
            }),
            function (data, status) {

                var objArray = data;

                var tablearea = document.getElementById('accessoryDiv');
                tablearea.innerHTML = '';
                var formatting = "";

                // alert(JSON.stringify(objArray));

                for (var i = 0; i < objArray.length; i++) {

                    var object = objArray[i];

                    //alert(JSON.stringify(object));

                    var html = Mustache.render(Accessorytemplate, object);

                    formatting = formatting.concat(html);
                }
                tablearea.innerHTML = formatting;
            });

    }

    this.loadIssueHistory = function (deviceID) {

        HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
                operation: "getIssues",
                deviceID: deviceID
            }),
            function (data) {


                var objArray = data;

                var tablearea = document.getElementById('issueDiv');
                tablearea.innerHTML = '';
                var formatting = "";

                for (var i = 0; i < objArray.length; i++) {

                    var object = objArray[i];


                    if (object.resolved == "0") {
                        object.New = "true";
                        object.resolved = null;
                        object.rejected = null;
                    } else if (object.resolved == "1") {
                        object.New = null;
                        object.resolved = "true";
                        object.rejected = null;
                    } else if (object.resolved == "2") {
                        object.New = null;
                        object.resolved = null;
                        object.rejected = "true";
                    } else {
                        object.New = null;
                        object.resolved = null;
                        object.rejected = null;

                    }



                    //alert(JSON.stringify(object));

                    var html = Mustache.render(Issuetemplate, object);

                    formatting = formatting.concat(html);
                }
                tablearea.innerHTML = formatting;

            });

    }
    this.loadWarranties = function (deviceID) {


        HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
                operation: "warrantyHistory",
                deviceID: deviceID
            }),

            function (data, status) {

                var deviceArray = data.device;
                var accessoryArray = data.accessories;

                var tablearea = document.getElementById('warrantyDiv');
                tablearea.innerHTML = '';
                var formatting = "";

                for (var i = 0; i < deviceArray.length; i++) {

                    var object = deviceArray[i];

                    var tempSts;

                    if(object.sts=="0"){

                        tempSts = "Void";

                    }else if(object.sts=="1"){
                        tempSts = "Valid";
                    }
                    else{
                        tempSts = "Undefined";
                    }
                    object.sts=tempSts;

                    //alert(JSON.stringify(object));
                    var html = Mustache.render(Warrantytemplate, object);

                    formatting = formatting.concat(html);

                }
                tablearea.innerHTML = formatting;
                //alert(JSON.stringify(accessoryArray));

                var divArea = document.getElementById('accessoryWarrantyDiv');
                divArea.innerHTML = '';
                var htmformatting = "";

                 for (var i = 0; i < accessoryArray.length; i++) {

                    var object = accessoryArray[i];

                    var tempStatus;

                    if(object.status=="0"){

                        tempStatus = "Void";

                    }else if(object.status=="1"){
                        tempStatus = "Valid";
                    }
                    else{
                        tempStatus = "Undefined";
                    }
                    object.status=tempStatus;

                    //alert(JSON.stringify(object));
                    var html = Mustache.render(Accessorytemplate, object);

                    htmformatting = htmformatting.concat(html);

                }

                divArea.innerHTML = htmformatting;

            });

    }

    this.addIssue = function (issueData) {

        HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
                operation: "addIssue",
                issue: issueData
            }),
            function (data) {

                $("#addHdwInfo").attr("class", "ui-widget");


            });
    }

    this.getHardwareComponentDescription = function (deviceID) {
        alert(deviceID);

        $.post(controllerPath, JSON.stringify({
            operation: "getDeviceDetails",
            deviceID: deviceID
        }), function (data) {




            $("#componentDetailsArea").html("<p>" + data.remarks + "</p>");


        }, 'json');


    }

    this.editIssue = function (issue_no, dev_id, status, issue, oldDate, resolve) {

        Hwdrepo.loadDialogs();

        if (resolve == 0) {

            $("#reportIssueDialog").dialog({
                buttons: [{
                    text: "Ok",
                    click: function () {

                        var description = document.getElementById('issueDescription').value;
                        var date = $("#datepicker").val();



                        HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
                                operation: "editIssue",
                                issue: {
                                    "sts": status,
                                    "desc": description,
                                    "date": date,
                                    "resolv": resolve,
                                    "issue_id": issue_no,
                                    "dev_id": dev_id
                                }
                            }),
                            function (data) {

                                $("#addHdwInfo").attr("class", "ui-widget");

                            });


                        $('#reportIssueDialog').dialog('destroy');
                        Hwdrepo.loadIssueHistory(dev_id);
                        $("#addHdwInfo").attr("class", "hidden");

                    }
                }]
            });

            $("#datepicker").datepicker("setDate", oldDate.split("+")[0]);
            $("#issueDescription").val(issue);
            $("#reportIssueDialog").dialog('option', 'title', 'Edit Issue');




            $("#reportIssueDialog").dialog("open");

        } else if (resolve == 4) {


            alert("this will delete the issue, are you sure?");


            HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
                    operation: "deleteIssue",
                    issue: {
                        "issue_id": issue_no
                    }
                }),
                function (data) {

                    //  Hwdrepo.loadIssueHistory(dev_id);

                });


            Hwdrepo.loadIssueHistory(dev_id);

        } else {


            HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
                    operation: "editIssue",
                    issue: {
                        "sts": status,
                        "desc": issue,
                        "date": oldDate,
                        "resolv": resolve,
                        "issue_id": issue_no,
                        "resolve": 3
                    }
                }),
                function (data) {

                    //  Hwdrepo.loadIssueHistory(dev_id);

                });


            Hwdrepo.loadIssueHistory(dev_id);


        }
    }

    this.loadDialogs = function (deviceID) {


        $("#reportIssueDialog").dialog({

            autoOpen: false,
            height: 500,
            width: 700,
            modal: true,
            buttons: {
                'Confirm': function () {

                    //issueTypeSelect is disabled, add if needed

                    // var type=document.getElementById('issueTypeSelect');
                    var description = document.getElementById('issueDescription');
                    var errSpan = document.getElementById('addHdwErr');
                    var date = $("#datepicker").val();
                    /*type.options[type.selectedIndex].value=="0"||*/

                    if (date == null || description.value == "") {
                        errSpan.classList.remove(errSpan.className);
                        errSpan.classList.add("ui-widget");
                    } else {

                        $("#addHdwErr").attr("class", "hidden");

                        var issueData = {

                            "sts": null,
                            /*type.options[type.selectedIndex].text*/
                                "dev_id": deviceID,
                            "desc": description.value,
                            "date": date,

                        };

                        Hwdrepo.addIssue(issueData);
                    }
                }

                ,
                'close': function () {



                    $("#reportIssueDialog").dialog('destroy');
                    $("#addHdwInfo").attr("class", "hidden");
                    Hwdrepo.loadIssueHistory(deviceID);
                }

            }
        });
        $('#reportIssueDialog').dialog('option', 'title', 'Report Issue');

        $("#datepicker").datepicker({
            autoOpen: false,
            dateFormat: "yy-mm-dd",
            gotoCurrent: true
        });
        $("#issueDescription").val("");

        //Hwdrepo.getHardwareComponentDescription(deviceID);


    }

    this.getUserID = function () {

        HwdrepoUtil.makeJsonRequest("GET", controllerPath, "operation=getUserID",
            function (html) {
                var userID = html;
            });
    }

}