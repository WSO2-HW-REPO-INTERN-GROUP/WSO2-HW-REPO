function getSearchedDevices(queryType, searchText) {

    var ajaxUrl='DataTable/loadSearchedDevices.jag?queryType='+queryType+'&searchText='+searchText;

    document.getElementById('deviceDetailsDiv').style.display="none";
    document.getElementById('searchedDeviceDetailsDiv').style.display="";

    $('#searchedDevices').dataTable({
        "bProcessing": true,
        "sAjaxSource": ajaxUrl,
        "bAutoWidth": false,
        "sPaginationType": "full_numbers",
        "bJQueryUI": true,
        "aaSorting": [[ 4, "desc" ]],
        "bDestroy": true
    });
}


function getAllDevices() {
    $('#devices').dataTable({
        "bProcessing": true,
        "sAjaxSource": 'DataTable/loadAllDevices.jag',
        "bAutoWidth": false,
        "sPaginationType": "full_numbers",
        "bJQueryUI": true,
        "aaSorting": [[ 4, "desc" ]]
    });
}

function deleteDevice(devId){
    $.post("admin/dataGetFiles/admin_devices_updates.jag",{operation:"deleteDevice",deviceID:devId},function(data,status){
        if(data=='SUCCESSFUL'){
            location.reload(true);
        }
        else{
            alert("Error While Updating Database");
        }
    });
}

