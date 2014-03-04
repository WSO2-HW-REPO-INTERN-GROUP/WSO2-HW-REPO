var deviceID;
function readURL() {
    var urlData = window.location.search.substring(1);
    
    var issueID = urlData.split("=");

    $.ajax({
        type: 'POST',
        url :"admin/dataGetFiles/admin_data_get.jag", 

        data :{
        operation: "getissueDetails",
        issueID: issueID[1]
        }, 
        success :function (data, status) {
        var i = 0;

        var issueDetailsTbl = document.getElementById('issueDetailsTable');
        var issueDetailsArea = document.getElementById("issueDetailsDiv");
        issueDetailsArea.setAttribute('class', 'datagrid');
        var tbody = document.createElement('tbody');

        var object = JSON.parse(data);


        for (var property in object) {

            var newRow = document.createElement('tr');

            if (i % 2 == 0) {
                newRow.setAttribute("class", "alt");
            }

            if (property == "device_id") {

                deviceID = object[property];

            } else if (property == "resolved") {

                if(object[property] == "1" || object[property] == "4" || object[property] == "3"){
                    $("#issueStat").hide();
                }

                if (object[property] == "0") {
                    //$("#issueResolve").hide();
                    $("#viewUpgrades").hide();
                } else if (object[property] == "1") {
                    $("#issueReject").hide();
                    $("#issueResolve").hide();
                }
            } else {
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


        }
        issueDetailsTbl.appendChild(tbody);

    },
    async:false
    });
    return deviceID;   
}