/// <reference path="../../areas/admin/scripts/datetime/jquery.inputmask.bundle.js" />
/// <reference path="../../areas/admin/scripts/datetime/bootstrap-clockpicker.min.js" />
/// <reference path="../../areas/admin/scripts/datetime/bootstrap-datetimepicker.js" />
/// <reference path="../../areas/admin/scripts/datetime/dateconfiguration.js" />
/// <reference path="../../areas/admin/scripts/datetime/bootstrap-multiselect.js" />
var CommonForAll = /** @class */ (function () {
    function CommonForAll() {
    }
    CommonForAll.prototype.ToggleSaved = function (data) {
        var value = parseInt(data);
        $('#DivAlertMsg').show();
        switch (value) {
            case 0:
                $('#warning').css('display', 'block');
                break;
            case 1:
                $('#success').css('display', 'block');
                break;
            case -99:
                $('#danger').css('display', 'block');
                break;
            default:
                if (value > 1)
                    $('#update').css('display', 'block');
        }
    };
    ;
    CommonForAll.prototype.ClearMessage = function () {
        $('#warning').css('display', 'none');
        $('#success').css('display', 'none');
        $('#danger').css('display', 'none');
        $('#update').css('display', 'none');
        $('#DivAlertMsg').hide();
        $(".loader-container").fadeOut('slow');
    };
    CommonForAll.prototype.DateTime = function () {
        $(".datePicker").inputmask({
            inputFormat: 'dd/mm/yyyy'
        });
        $('.datePicker').datetimepicker({
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2, pickTime: false,
            minView: 2,
            format: "dd/mm/yyyy",
            forceParse: 0
        });
        $('.clockpicker').clockpicker({
            twelvehour: true
        });
        $("#txtStartDate").change(function () {
            CommonForAll.prototype.DateValidation();
        });
        $("#txtEndDate").change(function () {
            CommonForAll.prototype.DateValidation();
        });
    };
    CommonForAll.prototype.DateValidation = function () {
        var fromdate = $('#txtStartDate').val().split("/");
        var fd = new Date(fromdate[2], fromdate[1] - 1, fromdate[0]);
        var todate = $('#txtEndDate').val().split("/");
        var td = new Date(todate[2], todate[1] - 1, todate[0]);
        if (fd > td) {
            alert("Start Date Should Be Less Than Or Equal To End Date");
            $('#txtEndDate').val('');
            return false;
        }
        else
            return true;
    };
    return CommonForAll;
}());
//# sourceMappingURL=CommonForAll.js.map