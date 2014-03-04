function readURL() {
    var urlData = window.location.search.substring(1);
    warrantyID = urlData.split("=");

    var i = 0;

<<<<<<< HEAD
    $.post("admin/dataGetFiles/admin_data_get.jag", {
=======
    $.post("admin_data_get.jag", {
>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
        warrantyID: warrantyID[1],
        operation: "getWarrantyDetailsByID"
    }, function (data, status) {

        var object = JSON.parse(data);

        var tablearea = document.getElementById('warrantyBasicDetails');
        var warrantyTbl = document.getElementById('warrantyDetailsTable');
        var tbody = document.createElement('tbody');

        tablearea.setAttribute("class", "datagrid");
        warrantyTbl.style.width = "600px";

        for (var property in object) {

            var newRow = document.createElement('tr');

            if (i % 2 == 0) {
                newRow.setAttribute("class", "alt");
            }

            var td1 = document.createElement('td');
            var td2 = document.createElement('td');

            td1.appendChild(document.createTextNode(property));
            td2.appendChild(document.createTextNode(object[property]));

            newRow.appendChild(td1);
            newRow.appendChild(td2);

            tbody.appendChild(newRow);

            i++;
        }

        warrantyTbl.appendChild(tbody);

    });
}