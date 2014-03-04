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

<<<<<<< HEAD
=======



>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
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
<<<<<<< HEAD

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
=======
>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
