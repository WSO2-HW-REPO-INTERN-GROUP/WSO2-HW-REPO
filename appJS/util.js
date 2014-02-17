/* Author - Taken from CoffeeShop Sample in jaggery Samples- util.js
* 
* project-wso2 Hardware Repository
* 
*/


HwdrepoUtil = new function () {

    this.makeRequest = function(type, u, d,dType,callback) {
        console.log("makeRequest: "+type+'-'+u+'-'+d+'-'+dType);
        $.ajax({
            type: type,
            url: u,
            data: d,
            dataType: dType,
            success: callback
        });
    };

    this.makeJsonRequest = function (type, u, d, callback) {
        console.log("makeJRequest: "+type+'-'+u+'-'+d);
        $.ajax({
            type: type,
            url: u,
            data: d,
            contentType:"application/json; charset=utf-8",
            processData: false,
            dataType: "json",
            success: callback
        });
    };
}