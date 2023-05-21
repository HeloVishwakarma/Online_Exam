var StudentApproval = function () {
            $('#DivAlertMsg').hide();
    var init = function () {
        BindEvents();
    }
    var BindEvents = function () {
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
            // format: "yyyy/mm/dd",
            forceParse: 0,
            endDate: new Date()
        });

        $("#txtFromDate").change(function () {
            DateValidation();
        });
        $("#txtToDate").change(function () {
            DateValidation();
        });

        $("#btnShow").click(function () {
           GetStudentApprovalGried();
        });
        var GetStudentApprovalGried = function(){
             $('#Panel_Confirm').css('display', 'none');
            $('#Panel_Error').css('display', 'none');
            $("#btnShow").html('<span class="fa fa-spinner" aria-hidden="true" id="btnShowSpan">&nbsp;Processing...</span>');
            $('#btnShow').prop('disabled', 'disabled');
            $('#btnSave').prop('disabled', 'disabled');
            $(".loader-container").css("display", "block");
            var formData = {
                StartDate: $("#txtFromDate").val(),
                EndDate: $("#txtToDate").val(),
            }
            $.ajax({
                url: "/Admin/StudentApproval/GetAllStudentApproval",
                type: "Get",
                data: formData,
                success: function (data) {
                    GetStudentApprovalList(data);
                }
            });
        }
        $('#ChkAll').change(function () {
            if (this.checked) {
                $(".checkBoxClass").val();
                $(".checkBoxClass").prop('checked', this.checked).change();
            }
            else {
                $(".checkBoxClass").prop('checked', false).change();
            }
        });
    }


    var DateValidation = function () {
        var fromdate = $('#txtFromDate').val().split("/");
        var fd = new Date(fromdate[2], fromdate[1] - 1, fromdate[0]);
        var todate = $('#txtToDate').val().split("/");
        var td = new Date(todate[2], todate[1] - 1, todate[0]);
        if (fd > td) {
            alert("From Date Should Be Less Than Or Equal To To Date");
            $('#txtToDate').val('');
            return false;
        }
        else
            return true;
    }

    var GetStudentApprovalList = function (data) {
        $('#tbody').empty();        
        var i = 0;
        $.each(data, function (key, item) {
            var html = '';
            html += '<tr>';
            html += '<td class="col-xs-1" style="text-align: center;"><input type="checkbox" class="checkBoxClass txtCenter" value="' + item.LoginRegistration + '" id="ChkStudentId' + item.LoginRegistration + '" tabindex="10" /></td>';
            html += '<td class="col-xs-2">' + item.UserName + '</td>';
            html += '<td class="col-xs-5">' + item.MobileNumber + '</td>'; 
            html += '<td class="col-xs-3">' + item.SerialNumber + '</td>';
            html += '<td class="col-xs-3">' + item.Email + '</td>';
            html += '<td style="text-align: center;"><input type="button" onclick="return ApplicationPrint(' + item.LoginRegistration + ')" id = "btnPrintApplication" value="Accept" tabindex="1" class="btn btn-primary"></td>';
            html += '</tr>';
            $('#tbody').append(html);
            i++;
        });
        $('#divStudents').css('display', 'block');
        $("#btnShow").html('<span class="fa fa-floppy-o" aria-hidden="true" id="btnShowSpan">&nbsp;Show </span>');
        $('#btnShow').removeAttr('disabled');
        $('#btnSave').removeAttr('disabled');
        $(".loader-container").fadeOut('slow');
    };
        $('#btnCancel').click(function () {
        $('#txtFromDate').val('');
        $('#txtToDate').val('');
        $('#divStudents').hide();
    });
        $('#btnSave').click(function () {
        var StudentList = new Array();
        var BulkStudentApproval = '';
        $('input:checkbox.checkBoxClass').each(function () {
            if (this.checked) {
                var list = {
                    StudentId: $(this).val()
                }
                StudentList.push(list);
                BulkStudentApproval += $(this).val() + '$';
            }
        });
        if (StudentList.length <= 0) {
            alert("Please select Student!");
            return false;
        }
        $("#btnSave").html('<span class="fa fa-spinner" aria-hidden="true" id="btnAddSpan">&nbsp;Processing...</span>');
        $('#btnSave').prop('disabled', 'disabled');
        $('#btnShow').prop('disabled', 'disabled');
        $(".loader-container").css("display", "block");
          $.post("/StudentApproval/BulkStudentApproval", {'BulkStudentApproval': BulkStudentApproval }, 'json')
              .done(function (data) {
                  ToggleSaved(data);
              });
    var ToggleSaved = function (data) {
        if (parseInt(data) > 0) {
            $('#Panel_Confirm').css('display', 'block');
            $('#Label_ConfirmMessage').html('Record Updated Successfully!');
            $('html, body').animate({
                scrollTop: $(".panel-body").offset().top
            }, 500);
            SendSMS();
            ClearData();
        }
        if (data == -99) {
            $('#Panel_Error').css('display', 'block');
            $('#Label_ErrorMessage').html('Something went wrong, please try again later!');
            $('html, body').animate({
                scrollTop: $(".panel-body").offset().top
            }, 500);

            ClearData();
        }        
    };
    var ClearData = function () {
        $('#btnShow').removeAttr('disabled');
        $('#btnSave').removeAttr('disabled');
        $("#btnShow").html('<span class="fa fa-floppy-o" aria-hidden="true" id="btnShowSpan">&nbsp;Show </span>');
        $("#btnSave").html('<span class="fa fa-floppy-o" aria-hidden="true" id="btnAddSpan">&nbsp;Verify </span>');
        $(".loader-container").fadeOut('slow');
        $('#tbody').empty();
        $('#divStudents').css('display', 'none');
        $("#ChkAll").prop('checked', false);
        $('#txtFromDate').val('');
        $('#txtToDate').val('');
    };
   
    });
    return {
        Init: init
    }
}();
