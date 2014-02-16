function getReportedIssues() {

    var urlData = window.location.search.substring(1);
    var deviceID = urlData.split("=");
    alert(deviceID);

    $.post("admin_devices_data_get.jag", {
        operation: "getReportedIssues",
        device_id: deviceID[1]
    }, function (data, status) {

        alert(data);

        var objArray = JSON.parse(data);

        var tablearea = document.getElementById('deviceIssuesDevision');
        tablearea.setAttribute("class", "datagrid");

        for (var i = 0; i < objArray.length; i++) {

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
            link.setAttribute("href", ("/HW_REPO/adminissues?id=" + device_id));
            link.innerHTML = 'more';
            linkTd.appendChild(link);
            linkRow.appendChild(linkTd);
            tbody.appendChild(linkRow);

            newTable.appendChild(tbody);

            tablearea.appendChild(newTable);
        }

    });
}