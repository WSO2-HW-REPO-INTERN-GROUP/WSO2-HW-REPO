var appName = "WSO2-HW-REPO";
var controllerPath = "/WSO2-HW-REPO/controller/input.jag";

var Issuetemplate;
var userID;


$.get(controllerPath,"operation=getUserID", function(data) {

    userID = data.user;
                        
            },'json');

$.get('templates/template.html', function(template) {
                    Issuetemplate = template;        
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

            alert(JSON.stringify(html));
            ss=html.requests;
            var dataArray = new Array;
            var aaData=new Array;
            
            for(var i=0;i<ss.length;i++){

                var dataObject=ss[i];

for(var o in dataObject) {

    dataArray.push(dataObject[o]);
}
 //dataArray.push("<input type='checkbox' name='check"+dataObject['request_id']+"' value='"+dataObject['request_id']+"'>");

       aaData.push(dataArray);
       dataArray=new Array;
}

            //Hwdrepo.fillRequestTable(html);

            /********************/
        $('#example').dataTable( {
        "aaData": aaData,
        "aoColumns": [
            { "sTitle": "Device Type" },
            { "sTitle": "Purpose" },
            { "sTitle": "Requirements" },
            { "sTitle": "Request ID", "sClass": "center" }
         //  { "sTitle": "Grade", "sClass": "center" }
        ]
    } 

    ); 
/******************************************/

        });

    }
/*
    this.fillRequestTable = function (html) {


        var reqArea = document.getElementById('requestArea');
        var reqTable = document.getElementById("requestTable");
        reqArea.style.display = "";
        reqArea.setAttribute('class', 'datagrid');
        var tbody = reqArea;

        tbody.innerHTML = '';

        var obj = html;

        alert(JSON.stringify(obj));

        for (var i = 0; i < obj.requests.length; i++) {

            var object = obj.requests[i];
            var newRow = document.createElement('tr');


            if (i % 2 == 0) {
                newRow.setAttribute("class", "alt");
            }


            for (var property in object) {

                if(property=="request_id"){



                    var tdCheck = document.createElement('td');
                    var checkbox = document.createElement('input');
                    checkbox.type = "checkbox";
                    checkbox.id = "chkbox_"+object[property];


                    tdCheck.appendChild(checkbox);
                    newRow.appendChild(tdCheck);

                }
                else{
                var td = document.createElement('td');


                td.appendChild(document.createTextNode(object[property]));
                newRow.appendChild(td);




            }
        }

            

//var label = document.createElement('label')
//label.htmlFor = "id";
//

//tdCheck.appendChild(label);
            


            tbody.appendChild(newRow);
        }
    }*/

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

        /*HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
            operation: "upgradeHistory",
            deviceID: deviceID
        }),

            function (data, status) {

                var objArray = data;

                var tablearea = document.getElementById('upgradeDiv');
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
            });*/
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

                return data;
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

                var tablearea = document.getElementById('issueDiv');
                var formatting="";

                for (var i = 0; i < objArray.length; i++) {

                    var object = objArray[i]; 

                    alert(JSON.stringify(object));

                    var html = Mustache.render(Issuetemplate,object);

                    formatting=formatting.concat(html);
                }
                tablearea.innerHTML = formatting;

            });

    }

    this.addIssue = function (issueData) {

        HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
            operation: "addIssue",
            issue: issueData
        }),
            function (data) {

               $( "#addHdwInfo" ).attr("class","ui-widget" );
                
            });
    }

    this.getHardwareComponentDescription=function(deviceID){

        $.post(controllerPath,JSON.stringify({
            operation: "getDeviceDetails",
            deviceID: deviceID
        })
        , function(data) {


            $( "#componentDetailsArea" ).html("<p>"+data.remarks+"</p>");

                                       
            },'json');
       

    }

    this.editIssue = function(issue_no,dev_id,status,issue,date,resolve){
/*
        if(resolve==0){

                $( "#reportIssueDialog" ).dialog({ buttons: [ { text: "Ok", click: function() {


            HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
            operation: "editIssue",
            issue: {"sts":status,"desc":issue,"date":date,"resolv":resolve,"issue_id":issue_no}
        }),
            function (data) {

               $( "#addHdwInfo" ).attr("class","ui-widget" );
                
            });
         
            Hwdrepo.loadIssueHistory();
         $('#reportIssueDialog').dialog('destroy');

          } } ] });

        $( "#datepicker" ).datepicker("setDate",date.split("+")[0]);
        $("#issueDescription").val(issue);
        $( "#reportIssueDialog" ).dialog('option', 'title', 'Edit Issue');


                


        $("#reportIssueDialog").dialog("open");

    }
    else{


            HwdrepoUtil.makeJsonRequest("POST", controllerPath, JSON.stringify({
            operation: "editIssue",
            issue: {"sts":status,"desc":issue,"date":date,"resolv":resolve,"issue_id":issue_no,"resolve":3}
        }),
            function (data) {
                    
                    Hwdrepo.loadIssueHistory();
                
            });
         
                            
*/

    }

    this.loadDialogs = function(deviceID){

       

    }

    this.getUserID = function(){

        HwdrepoUtil.makeJsonRequest("GET", controllerPath, "operation=getUserID",
            function (html) {
                 var userID=html;
            });
    }
    this.deleteRequests = function(cb){

       alert(cb);

    }

}