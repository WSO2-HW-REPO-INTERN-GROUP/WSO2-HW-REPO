/* Author - mihil ranathunga
 * email-mihil@wso2.com
 * project-wso2 Hardware Repository
 * interns UOM- 2014
 */
var controllerPath = "/WSO2-HW-REPO/User/";

var Issuetemplate;
var Upgradetemplate;
var Warrantytemplate;
var Accessorytemplate;
var Requestemplate;
var userID;

HwdrepoUtil.makeRequest("GET", "store.json", null, "json", function (data) {

    //controllerPath = data.urlConfigurations.controllerPath;
});
HwdrepoUtil.makeRequest("GET", "templates/requestTemplate.html", null, null, function (template) {

    Requestemplate = template;
});
HwdrepoUtil.makeRequest("GET", "templates/upgradeTemplate.html", null, null, function (template) {

    Upgradetemplate = template;
});
HwdrepoUtil.makeRequest("GET", "templates/issueTemplate.html", null, null, function (template) {

    Issuetemplate = template;
});
HwdrepoUtil.makeRequest("GET", "templates/warrantyTemplate.html", null, null, function (template) {

    Warrantytemplate = template;
});
HwdrepoUtil.makeRequest("GET", "templates/accessoryTemplate.html", null, null, function (template) {

    Accessorytemplate = template;
});
HwdrepoUtil.makeRequest("GET", controllerPath, "operation=getUserID", 'json', function (data) {

    userID = data.user_id;
    // alert(JSON.stringify(userID));
});

Hwdrepo = new function () {


    this.loadDevices = function () {
        console.log("Hwdrepo_func :" + "loadDevices");

        HwdrepoUtil.makeRequest("GET", controllerPath +"devices", , "json",
            function (html) {

                // alert(JSON.stringify(html));

                var devArea = document.getElementById('deviceArea');
                devArea.innerHTML = '';

                if (Hwdrepo.nullCheck(html.devices[0])) {

                    devArea.innerHTML = '<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px;padding:0 .7em;"><span><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span><strong>Information:</strong> No Devices have been assigned to you yet!</span></div>';

                } else {


                    var devTable = document.createElement("table");
                    var thead = document.createElement("thead");
                    var tbody = document.createElement("tbody");

                    var headtr = document.createElement("tr");

                    var th1 = document.createElement("th");
                    var th2 = document.createElement("th");
                    var th2 = document.createElement("th");
                    var th3 = document.createElement("th");
                    var th4 = document.createElement("th");
                    var th5 = document.createElement("th");
                    var th6 = document.createElement("th");
                    var th7 = document.createElement("th");
                    th1.appendChild(document.createTextNode("Device Type"));
                    th2.appendChild(document.createTextNode("Make"));
                    th3.appendChild(document.createTextNode("Model"));
                    th4.appendChild(document.createTextNode("Assigned"));
                    th5.appendChild(document.createTextNode("Revoked"));
                    th6.appendChild(document.createTextNode("Health"));
                    th7.appendChild(document.createTextNode("Go to Devicepage"));
                    headtr.appendChild(th1);
                    headtr.appendChild(th2);
                    headtr.appendChild(th3);
                    headtr.appendChild(th4);
                    headtr.appendChild(th5);
                    headtr.appendChild(th6);
                    headtr.appendChild(th7);

                    thead.appendChild(headtr);
                    devTable.appendChild(thead);

                    devArea.style.display = "";
                    devArea.setAttribute('class', 'datagrid');

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

                                var link = document.createElement('span');
                                link.onclick = function () {
                                    window.open('userdevice?id=' + object['device_id']);
                                };
                                var str = object[property];
                                var result = str.link("userdevice?id=" + object['device_id']);

                                link.innerHTML = result;

                                td.appendChild(link);
                                newRow.appendChild(td);
                                break;
                            } else {

                                if (Hwdrepo.nullCheck(object[property]) != true) {
                                    td.appendChild(document.createTextNode(object[property]));
                                } else {
                                    td.appendChild(document.createTextNode(""));
                                }
                                newRow.appendChild(td);

                            }
                        }
                        tbody.appendChild(newRow);
                    }

                    devTable.appendChild(tbody);
                    devArea.appendChild(devTable);
                }


            });

    }
    this.viewRequests = function (index) {
        console.log("Hwdrepo_func :" + "viewRequests" + '-' + index);
        HwdrepoUtil.makeRequest("GET", controllerPath+'requests',, "json", function (html) {

            //alert(JSON.stringify(html));

            if (index == 0) {
                Hwdrepo.fillRequestTable(html);
            } else if (index == 1) {
                Hwdrepo.fillRequestPage(html);
            }

        });


    }

    this.fillRequestTable = function (html) {

        console.log("Hwdrepo_func :" + "fillRequestTable" + '-' + html);
        //alert(JSON.stringify(html.requests[0]));
        var reqArea = document.getElementById('requestArea');
        reqArea.innerHTML = '';

        if (Hwdrepo.nullCheck(html.requests[0])) {

            reqArea.innerHTML = '<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px;padding:0 .7em;"><span><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span><strong>Information:</strong> No Requests yet from you!</span></div>';

        } else {
            var reqTable = document.createElement("table");
            var thead = document.createElement("thead");
            var tbody = document.createElement("tbody");

            var headtr = document.createElement("tr");

            var th1 = document.createElement("th");
            var th2 = document.createElement("th");
            var th2 = document.createElement("th");
            var th3 = document.createElement("th");
            var th4 = document.createElement("th");
            var th5 = document.createElement("th");
            var th6 = document.createElement("th");
            var th7 = document.createElement("th");
            th1.appendChild(document.createTextNode("Device Type"));
            th2.appendChild(document.createTextNode("Purpose"));
            th3.appendChild(document.createTextNode("Requirement"));
            th4.appendChild(document.createTextNode("Request Date"));
            headtr.appendChild(th1);
            headtr.appendChild(th2);
            headtr.appendChild(th3);
            headtr.appendChild(th4);

            thead.appendChild(headtr);
            reqTable.appendChild(thead);

            reqArea.style.display = "";
            reqArea.setAttribute('class', 'datagrid');



            var obj = html;

            for (var i = 0; i < obj.requests.length; i++) {

                var object = obj.requests[i];

                if (object.resolved == 0 | object.resolved == 1) {
                    var newRow = document.createElement('tr');


                    if (i % 2 == 0) {
                        newRow.setAttribute("class", "alt");
                    }


                    for (var property in object) {


                        if (property != "request_id" && property != "resolved") {

                            var td = document.createElement('td');
                            if (Hwdrepo.nullCheck(object[property]) != true) {
                                td.appendChild(document.createTextNode(object[property]));
                            } else {
                                td.appendChild(document.createTextNode(""));
                            }
                            newRow.appendChild(td);
                        }

                    }

                    tbody.appendChild(newRow);
                }
            }
            reqTable.appendChild(tbody);
            reqArea.appendChild(reqTable);
        }


    }
    this.fillRequestPage = function (html) {
        console.log("Hwdrepo_func :" + "fillRequestPage" + '-' + html);
        // alert(JSON.stringify(html));

        var objArray = html.requests;

        var tablearea1 = document.getElementById('newRequestDiv');
        var tablearea2 = document.getElementById('rejectRequestDiv');
        var tablearea3 = document.getElementById('resolvedRequestDiv');
        tablearea1.innerHTML = '';
        tablearea2.innerHTML = '';
        tablearea3.innerHTML = '';
        var formatting1 = "";
        var formatting2 = "";
        var formatting3 = "";

        if (Hwdrepo.nullCheck(html.requests[0])) {

            formatting1 = '<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px;padding:0 .7em;"><span><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span><strong>Information:</strong> No new device requests from you yet!</span></div>';
            formatting2 = '<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px;padding:0 .7em;"><span><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span><strong>Information:</strong> None of your device requests have been rejected yet!</span></div>';
            formatting3 = '<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px;padding:0 .7em;"><span><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span><strong>Information:</strong> You don\'t have any resolved device requests!</span></div>';
        } else {

            for (var i = 0; i < objArray.length; i++) {

                var object = objArray[i];


                if (object.resolved == "0") {
                    object.status = "Pending";
                    object.New = "true";
                    object.resolved = null;
                    object.rejected = null;

                    var html = Mustache.render(Requestemplate, object);

                    formatting1 = formatting1.concat(html);

                } else if (object.resolved == "1") {
                    object.status = "Device Added";
                    object.New = null;
                    object.resolved = "true";
                    object.rejected = null;

                    var html = Mustache.render(Requestemplate, object);

                    formatting3 = formatting3.concat(html);
                } else if (object.resolved == "2") {
                    object.status = "Marked As Rejected";
                    object.New = null;
                    object.resolved = null;
                    object.rejected = "true";

                    var html = Mustache.render(Requestemplate, object);

                    formatting2 = formatting2.concat(html);

                } else {
                    object.status = null;
                    object.New = null;
                    object.resolved = null;
                    object.rejected = null;
                }

                //alert(JSON.stringify(object));

            }

            if (Hwdrepo.nullCheck(formatting1)) {
                formatting1 = '<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px;padding:0 .7em;"><span><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span><strong>Information:</strong> No new device requests from you yet!</span></div>';
            }
            if (Hwdrepo.nullCheck(formatting2)) {
                formatting2 = '<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px;padding:0 .7em;"><span><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span><strong>Information:</strong> None of your device requests have been rejected yet!</span></div>';
            }
            if (Hwdrepo.nullCheck(formatting3)) {
                formatting3 = '<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px;padding:0 .7em;"><span><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span><strong>Information:</strong> You don\'t have any resolved device requests!</span></div>';
            }
        }
        tablearea1.innerHTML = formatting1;
        tablearea2.innerHTML = formatting2;
        tablearea3.innerHTML = formatting3;

    }

    this.requestDevice = function (deviceType, purpose, requirement) {
        console.log("Hwdrepo_func :" + "requestDevice" + '-' + deviceType + ',' + purpose + ',' + requirement);


        HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
                operation: "addDeviceRequest",
                dev: {
                    device: deviceType,
                    purpose: purpose,
                    req: requirement
                }
            }),
            function (data, status) {
                alert(JSON.stringify(status));
                Hwdrepo.viewRequests(0);
            });

        Hwdrepo.viewRequests(0);

    }

    this.loadUpgradeHistory = function (deviceID) {
        console.log("Hwdrepo_func :" + "loadUpgradeHistory" + '-' + deviceID);

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

                if (objArray[0] == null) {

                    var html = Mustache.render(Upgradetemplate, objArray[0]);

                    formatting = formatting.concat(html);

                } else {

                    for (var i = 0; i < objArray.length; i++) {

                        var object = objArray[i];

                        //alert(JSON.stringify(object));
                        var html = Mustache.render(Upgradetemplate, object);

                        formatting = formatting.concat(html);

                    }
                }
                tablearea.innerHTML = formatting;

            });
    }

    this.getDeviceDetails = function (deviceID) {
        console.log("Hwdrepo_func :" + "getDeviceDetails" + '-' + deviceID);

        HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
                operation: "getDeviceDetails",
                deviceID: deviceID
            }),
            function (data, status) {
                var i = 0;

                //alert(JSON.stringify(data));



                var basicDetailsArea = document.getElementById("basicDetailsDiv");
                basicDetailsArea.setAttribute('class', 'datagrid');

                var basicDetailsTbl = document.createElement('table');


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

                        var thd = document.createElement('span');
                        thd.appendChild(document.createTextNode("Serial Number: " + object[property]));
                        thd.setAttribute('style', 'float:right;width:30 px');
                        th.appendChild(thd);

                    } else if (property == 'make') {


                        var thd = document.createElement('span');
                        thd.setAttribute('style', 'float:left;width:30 px');
                        thd.appendChild(document.createTextNode(object[property]));
                        th.appendChild(thd);

                    } else if (property == 'model') {
                        th.appendChild(document.createTextNode(object[property]));
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

                    if (Hwdrepo.nullCheck(object[property])) {
                        td2.appendChild(document.createTextNode(' '));

                    } else {
                        td2.appendChild(document.createTextNode(object[property]));
                    }

                    newRow.appendChild(td1);
                    newRow.appendChild(td2);
                    tbody.appendChild(newRow);

                    i++;
                }

                htr.appendChild(th);
                thead.appendChild(th);

                basicDetailsTbl.appendChild(thead);
                basicDetailsTbl.appendChild(tbody);

                basicDetailsArea.appendChild(basicDetailsTbl);
            });

    }
    this.getAccssories = function (deviceID) {
        console.log("Hwdrepo_func :" + "getAccssories" + '-' + deviceID);

        HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
                operation: "getAccessories",
                deviceID: deviceID
            }),
            function (data, status) {

                var objArray = data;

                var tablearea = document.getElementById('accessoryDiv');
                tablearea.innerHTML = '';
                var formatting = "";

                if (objArray[0] == null) {

                    //alert(objArray[0]);
                    var html = Mustache.render(Accessorytemplate, objArray[0]);

                    formatting = formatting.concat(html);

                } else {

                    //alert(JSON.stringify(objArray));

                    for (var i = 0; i < objArray.length; i++) {

                        var object = objArray[i];

                        //alert(JSON.stringify(object));

                        var html = Mustache.render(Accessorytemplate, object);

                        formatting = formatting.concat(html);
                    }

                }
                tablearea.innerHTML = formatting;

            });

    }

    this.loadIssueHistory = function (deviceID) {
        console.log("Hwdrepo_func :" + "loadIssueHistory" + '-' + deviceID);

        HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
                operation: "getIssues",
                deviceID: deviceID
            }),
            function (data) {

                //alert(JSON.stringify(data));


                var objArray = data;

                var tablearea = document.getElementById('issueDiv');
                tablearea.innerHTML = '';
                var formatting = "";

                if (objArray[0] == null) {


                    var html = Mustache.render(Issuetemplate, objArray[0]);

                    formatting = formatting.concat(html);

                } else {

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

                        //if(object)



                        // alert(JSON.stringify(object));

                        var html = Mustache.render(Issuetemplate, object);

                        formatting = formatting.concat(html);
                    }
                }
                tablearea.innerHTML = formatting;

            });

        $("#EditIssue").button();

    }
    this.loadWarranties = function (deviceID) {
        console.log("Hwdrepo_func :" + "loadWarranties" + '-' + deviceID);

        HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
                operation: "warrantyHistory",
                deviceID: deviceID
            }),

            function (data, status) {

                //  alert(JSON.stringify(data));

                var deviceArray = data.device;
                var accessoryArray = data.accessories;

                var tablearea = document.getElementById('warrantyDiv');
                tablearea.innerHTML = '';
                var formatting = "";

                if (Hwdrepo.nullCheck(deviceArray[0])) {

                    var object = {
                        "war_id": null
                    };

                    if (Hwdrepo.nullCheck(accessoryArray[0])) {
                        object.hasAccessories = null;
                    } else {
                        object.hasAccessories = true;
                    }

                    var html = Mustache.render(Warrantytemplate, object);

                    formatting = formatting.concat(html);

                } else {

                    for (var i = 0; i < deviceArray.length; i++) {

                        var object = deviceArray[i];

                        var tempSts;

                        if (object.sts == "0") {

                            tempSts = "Void";

                        } else if (object.sts == "1") {
                            tempSts = "Valid";
                        } else {
                            tempSts = "Undefined";
                        }
                        object.sts = tempSts;

                        if (accessoryArray[0] == null) {
                            object.hasAccessories = null;
                        } else {
                            object.hasAccessories = true;
                        }

                        var html = Mustache.render(Warrantytemplate, object);

                        formatting = formatting.concat(html);

                    }
                }
                tablearea.innerHTML = formatting;


                var divArea = document.getElementById('accessoryWarrantyDiv');
                divArea.innerHTML = '';
                var htmformatting = "";

                if (accessoryArray[0] == null) {

                    var html = Mustache.render(Accessorytemplate, accessoryArray[0]);

                    formatting = formatting.concat(html);

                } else {

                    for (var i = 0; i < accessoryArray.length; i++) {

                        var object = accessoryArray[i];

                        var tempStatus;

                        if (object.status == "0") {

                            tempStatus = "Void";

                        } else if (object.status == "1") {
                            tempStatus = "Valid";
                        } else {
                            tempStatus = "Undefined";
                        }
                        object.status = tempStatus;

                        //alert(JSON.stringify(object));
                        var html = Mustache.render(Accessorytemplate, object);

                        htmformatting = htmformatting.concat(html);

                    }
                }

                divArea.innerHTML = htmformatting;

            });

    }

    this.addIssue = function (issueData) {
        console.log("Hwdrepo_func :" + "addIssue" + '-' + issueData);

        HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
                operation: "addIssue",
                issue: issueData
            }),
            function (data) {
                Hwdrepo.loadIssueHistory(deviceID);
                //location.reload();

            });
    }

    this.editIssue = function (issue_no, dev_id, status, issue, oldDate, resolve) {

      //  console.log("Hwdrepo_func :" + "editIssue" + '-' + issue_no + ',' + dev_id + ',' + status + ',' + issue + ',' + oldDate + ',' + resolve);

        if (resolve == 0) {

            $("#editIssueDialog").dialog("option", "buttons", [




                {
                    text: "Ok",
                    click: function () {

                        var description = $("#editIssueDescription").val();
                        var date = $("#editDatepicker").val();

                        var errText1 = '<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"><p ><span class="ui-icon ui-icon-alert"  style="float: left; margin-right: .3em;"></span><strong>Alert:</strong> Please provide an issue description</p></div>';
                        var errText2 = '<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"><p ><span class="ui-icon ui-icon-alert"  style="float: left; margin-right: .3em;"></span><strong>Alert:</strong> Please Select a date</p></div>';

                        if (Hwdrepo.nullCheck(description)) {
                            $('#editIssErr').html(errText1);
                            $('#editIssErr').toggleClass("ui-widget", true);
                        } else if (Hwdrepo.nullCheck(date)) {

                            $('#editIssErr').html(errText2);
                            $('#editIssErr').toggleClass("ui-widget", true);
                        } else {

                            $("#dialog-confirm").dialog("open");

                            $("#dialog-confirm").dialog({
                                buttons: [{
                                    text: "Got it!",
                                    click: function () {

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

                                                if (Hwdrepo.nullCheck(document.getElementById('issueDiv'))) {
                                                    Hwdrepo.getUserIssues();
                                                } else {

                                                    Hwdrepo.loadIssueHistory(dev_id);
                                                }

                                            });

                                        $('#dialog-confirm').dialog("close");
                                        $('#editIssueDialog').dialog('close');
                                    }
                                }, {
                                    text: "No !",
                                    click: function () {
                                        $('#dialog-confirm').dialog("close");
                                    }
                                }]
                            });
                            $('#editIssueDialog').dialog('close');
                        }

                    }

            }]);

        $("#editDatepicker").datepicker({
            autoOpen: false,
            dateFormat: "yy-mm-dd",
        });
        $("#editDatepicker").datepicker("setDate", oldDate.split("+")[0]);
        $("#editIssueDescription").val(issue);
        $("#editIssueDialog").dialog("open");

    } else if (resolve == 4) {

        alert("this will delete the issue, are you sure?");


        HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
                operation: "deleteIssue",
                issue: {
                    "issue_id": issue_no
                }
            }),
            function (data) {

                if (Hwdrepo.nullCheck(document.getElementById('issueDiv'))) {
                    Hwdrepo.getUserIssues();
                } else {

                    Hwdrepo.loadIssueHistory(dev_id);
                }

            });

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

                if (Hwdrepo.nullCheck(document.getElementById('issueDiv'))) {
                    Hwdrepo.getUserIssues();
                } else {

                    Hwdrepo.loadIssueHistory(dev_id);
                }

            });

    }
}
this.loadDialogs = function (deviceID) {
    console.log("Hwdrepo_func :" + "loadDialogs" + '-' + deviceID);

    $("#datepicker").datepicker({
        autoOpen: false,
        dateFormat: "yy-mm-dd",
        gotoCurrent: true
    });

    $("#reportIssueDialog").dialog({

        autoOpen: false,
        resizable: false,
        height: 500,
        width: 700,
        modal: true,
        buttons: {
            'Confirm': function () {

                var description = $('textarea#issueDescription').val();
                var date = $("#datepicker").val();
                var errText1 = '<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"><p ><span class="ui-icon ui-icon-alert"  style="float: left; margin-right: .3em;"></span><strong>Alert:</strong> Please provide an issue description</p></div>';
                var errText2 = '<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"><p ><span class="ui-icon ui-icon-alert"  style="float: left; margin-right: .3em;"></span><strong>Alert:</strong> Please Select a date</p></div>';

                if (Hwdrepo.nullCheck(description)) {
                    $('#addHdwErr').html(errText1);
                    $('#addHdwErr').toggleClass("ui-widget", true);
                } else if (Hwdrepo.nullCheck(date)) {

                    $('#addHdwErr').html(errText2);
                    $('#addHdwErr').toggleClass("ui-widget", true);
                } else {

                    var issueData = {

                        "sts": 'New',
                        "dev_id": deviceID,
                        "desc": description,
                        "date": date

                    };
                    $("#dialog-confirm").dialog("open");
                    $("#dialog-confirm").dialog({
                        buttons: [{
                            text: "Got it!",
                            click: function () {
                                Hwdrepo.addIssue(issueData);
                                $('#dialog-confirm').dialog("close");
                                $("#reportIssueDialog").dialog('close');
                            }
                        }, {
                            text: "No !",
                            click: function () {
                                $('#dialog-confirm').dialog("close");
                            }
                        }]
                    });
                    $("#reportIssueDialog").dialog('close');
                }

            }
        }
    });


    //Hwdrepo.getHardwareComponentDescription(deviceID);       

}
this.getUserID = function () {
    console.log("Hwdrepo_func :" + "getUserID");

    return userID;
}
this.deleteRequest = function (request_id) {
    console.log("Hwdrepo_func :" + "deleteRequest" + '-' + request_id);
    HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
            operation: "deleteRequest",
            req_id: request_id
        }),
        function (html) {

            Hwdrepo.viewRequests(1);

        });

    Hwdrepo.viewRequests(1);

}
this.confirmRequest = function (request_id) {
    console.log("Hwdrepo_func :" + "confirmRequest" + '-' + request_id);
    HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
            operation: "confirmRequest",
            req_id: request_id
        }),
        function (html) {

            this.viewRequests(1);

        });

}
this.nullCheck = function (value) {
    //console.log("Hwdrepo_func :"+"nullCheck"+'-'+value);

    //   alert(JSON.stringify(typeof(value)));

    if (value == 'null') {
        return true;
    } else if (value == '') {
        return true;
    } else if (value == null) {
        return true;
    } else if (typeof (value) == 'object') {
        //alert(JSON.stringify(Object.keys(value)[0]));

        if (Object.keys(value)[0] == '@nil') {
            return true;
        } else {
            return false;
        }

    } else {
        return false;
    }
}
this.getUserIssues = function () {
    console.log("Hwdrepo_func :" + "getUserIssues");

    HwdrepoUtil.makeRequest("GET", controllerPath, "operation=loadUserIssues", "json",
        function (html) {

            // alert(JSON.stringify(html));

            var objArray = html.issues;

            var tablearea1 = document.getElementById('newIssueDiv');
            var tablearea2 = document.getElementById('rejectIssueDiv');
            var tablearea3 = document.getElementById('resolvedIssueDiv');
            var tablearea4 = document.getElementById('pastIssueDiv');
            tablearea1.innerHTML = '';
            tablearea2.innerHTML = '';
            tablearea3.innerHTML = '';
            tablearea4.innerHTML = '';
            var formatting1 = "";
            var formatting2 = "";
            var formatting3 = "";
            var formatting4 = "";

            if (Hwdrepo.nullCheck(html.issues[0])) {

                formatting1 = '<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px;padding:0 .7em;"><span><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span><strong>Information:</strong> None of your devices have issues just yet!</span></div>';
                formatting2 = '<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px;padding:0 .7em;"><span><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span><strong>Information:</strong> None of your reported issues have been rejected yet!</span></div>';
                formatting3 = '<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px;padding:0 .7em;"><span><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span><strong>Information:</strong> You don\'t have any resolved device issues!</span></div>';
                formatting4 = '<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px;padding:0 .7em;"><span><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span><strong>Information:</strong> You don\'t have any reported any device issues in the past!</span></div>';
            } else {

                for (var i = 0; i < objArray.length; i++) {

                    var object = objArray[i];


                    if (object.resolved == "0") {
                        object.New = "true";
                        object.resolved = null;
                        object.rejected = null;

                        var html = Mustache.render(Issuetemplate, object);
                        formatting1 = formatting1.concat(html);
                    } else if (object.resolved == "1") {
                        object.New = null;
                        object.resolved = "true";
                        object.rejected = null;

                        var html = Mustache.render(Issuetemplate, object);
                        formatting3 = formatting3.concat(html);
                    } else if (object.resolved == "2") {
                        object.New = null;
                        object.resolved = null;
                        object.rejected = "true";

                        var html = Mustache.render(Issuetemplate, object);
                        formatting2 = formatting2.concat(html);
                    } else {
                        object.New = null;
                        object.resolved = null;
                        object.rejected = null;

                        var html = Mustache.render(Issuetemplate, object);
                        formatting4 = formatting4.concat(html);
                    }

                    //alert(JSON.stringify(object));

                }
                if (Hwdrepo.nullCheck(formatting1)) {
                    formatting1 = '<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px;padding:0 .7em;"><span><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span><strong>Information:</strong> None of your devices have issues just yet!</span></div>';
                }
                if (Hwdrepo.nullCheck(formatting2)) {
                    formatting2 = '<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px;padding:0 .7em;"><span><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span><strong>Information:</strong> None of your reported issues have been rejected yet!</span></div>';
                }
                if (Hwdrepo.nullCheck(formatting3)) {
                    formatting3 = '<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px;padding:0 .7em;"><span><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span><strong>Information:</strong> You don\'t have any resolved device issues!</span></div>';
                }
                if (Hwdrepo.nullCheck(formatting4)) {
                    formatting4 = '<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px;padding:0 .7em;"><span><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span><strong>Information:</strong> You don\'t have any reported any device issues in the past!</span></div>';
                }
            }
            tablearea1.innerHTML = formatting1;
            tablearea2.innerHTML = formatting2;
            tablearea3.innerHTML = formatting3;
            tablearea4.innerHTML = formatting4;

        });
}

}