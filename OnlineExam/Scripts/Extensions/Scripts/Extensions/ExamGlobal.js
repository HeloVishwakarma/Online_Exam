/// <reference path="../typings/jquery/jqueryui.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/jquery/jquery.cookie.d.ts" />
/// <reference path="../typings/jquery/jquery.validation.d.ts" />
var isFadeOut = true;
var fadeOutTime = 10000;
var CheckBoxCollection = new Array();
var UpdateContainerId;
var _document;
var showGlobalLoader = true;
var ZnodeBase = /** @class */ (function () {
    function ZnodeBase() {
        this.pendingAjaxRequests = false;
    }
    ZnodeBase.prototype.ajaxRequest = function (url, method, parameters, successCallback, responseType, async, globalLoader) {
        if (async === void 0) { async = true; }
        if (globalLoader === void 0) { globalLoader = true; }
        /* loader hide and show depends on "showGlobalLoader" variable.
         * It is now updated from the request parameter.
         * Default value of this variable will be true */
        showGlobalLoader = globalLoader;
        if (!method) {
            method = "GET";
        }
        if (!responseType) {
            responseType = "json";
        }
        if (typeof successCallback != "function") {
            this.errorOutfunction("CallbackFunction");
        }
        else {
            $.ajax({
                type: method,
                url: url,
                async: async,
                data: this.cachestampfunction(parameters),
                dataType: responseType,
                success: function (response) {
                    successCallback(response);
                },
                error: function () {
                    ZnodeBase.prototype.errorOutfunction("APIEndpoint" + url);
                }
            });
        }
    };
    ZnodeBase.prototype.errorOutfunction = function (message) {
        console.log(message);
        if (this.errorAsAlert) {
            alert(message);
        }
    };
    ZnodeBase.prototype.cachestampfunction = function (data) {
        var d = new Date();
        if (typeof data == "string") {
            data += "&_=" + d.getTime();
        }
        else if (typeof data == "object") {
            data["_"] = d.getTime();
        }
        else {
            data = { "_": d.getTime() };
        }
        return (data);
    };
    return ZnodeBase;
}());
;
//# sourceMappingURL=ExamGlobal.js.map