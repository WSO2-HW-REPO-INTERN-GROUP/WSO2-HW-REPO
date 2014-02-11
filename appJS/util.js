HwdrepoUtil = new function () {

    this.makeRequest = function(type, u, d, callback) {

        $.ajax({
            type: type,
            url: u,
            data: d,
            dataType: "json",
            success: callback
        });
    };

    this.makeJsonRequest = function (type, u, d, callback) {
        console.log(d);
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