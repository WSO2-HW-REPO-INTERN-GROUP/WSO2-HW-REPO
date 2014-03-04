var deviceID;
function readURL() {
    var urlData = window.location.search.substring(1);
    
    var issueID = urlData.split("=");
<<<<<<< HEAD
    $.ajax({
        type: 'POST',
        url :"admin/dataGetFiles/admin_data_get.jag", 
=======

    // $.post("admin_data_get.jag", {
    //     operation: "getissueDetails",
    //     issueID: issueID[1]
    // }, function (data, status) {
    //     var i = 0;

    //     var issueDetailsTbl = document.getElementById('issueDetailsTable');
    //     var issueDetailsArea = document.getElementById("issueDetailsDiv");
    //     issueDetailsArea.setAttribute('class', 'datagrid');
    //     var tbody = document.createElement('tbody');

    //     var object = JSON.parse(data);

    //     alert(data);

    //     for (var property in object) {

    //         var newRow = document.createElement('tr');

    //         if (i % 2 == 0) {
    //             newRow.setAttribute("class", "alt");
    //         }

    //         if (property == "device_id") {
    //             alert("Why"+deviceID);
    //             deviceID = object[property];
    //             alert("Why"+deviceID);
    //         } else if (property == "resolved") {
    //             if (object[property] == "0") {
    //                 //$("#issueResolve").hide();
    //                 $("#viewUpgrades").hide();
    //             } else if (object[property] == "1") {
    //                 $("#issueReject").hide();
    //                 $("#issueResolve").hide();
    //             }
    //         } else {
    //             var td1 = document.createElement('td');
    //             var td2 = document.createElement('td');
    //             td1.style.padding = '3px 20px';
    //             td2.style.padding = '3px 20px';

    //             td1.appendChild(document.createTextNode(property));
    //             td2.appendChild(document.createTextNode(object[property]));

    //             newRow.appendChild(td1);
    //             newRow.appendChild(td2);
    //             tbody.appendChild(newRow);

    //             i++;
    //         }


    //     }
    //     issueDetailsTbl.appendChild(tbody);




    //     alert("boo"+data);
    // });
    $.ajax({
        type: 'POST',
        url :"admin_data_get.jag", 
>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
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

<<<<<<< HEAD
=======
        alert(data);

>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
        for (var property in object) {

            var newRow = document.createElement('tr');

            if (i % 2 == 0) {
                newRow.setAttribute("class", "alt");
            }

            if (property == "device_id") {
<<<<<<< HEAD
                deviceID = object[property];
=======
                alert("Why"+deviceID);
                deviceID = object[property];
                alert("Why"+deviceID);
>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
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
<<<<<<< HEAD
=======
        alert("boo"+data);
>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
    },
    async:false
    });
    return deviceID;   
}