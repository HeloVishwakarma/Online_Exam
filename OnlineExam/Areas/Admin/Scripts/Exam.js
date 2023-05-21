var Exam = function () {
    var init = function () {
        $('#DivAlertMsg').hide();
        ExamBind();
        BindEvent();
    };
    var BindEvent = function () {
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

        //_______________________________________________________

        $('.clockpicker').clockpicker({
            twelvehour: true
        })
            
        // Manually toggle to the minutes view
        $('#check-minutes').click(function (e) {
            // Have to stop propagation here
            e.stopPropagation();
            input.clockpicker('show')
                .clockpicker('toggleView', 'minutes');
        });
        //_______________________________________________________________

        $("#txtStartDate").change(function () {
            DateValidation();
        });
        $("#txtEndDate").change(function () {
            DateValidation();
        });
        var DateValidation = function () {
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
        }


        $('#btnSubmit').click(function () {
            if ($.trim($('#txtExam').val()) == '') {
                alert('Please Insert Exam');
                $('#txtExam').focus();
                return false;
            }
            else if ($('#txtStartDate').val() == '') {
                alert('Please Select Start Date');
                $('#txtStartDate').focus();
                return false;
            }
            else if ($('#txtEndDate').val() == '') {
                alert('Please Select End Date');
                $('#txtEndDate').focus();
                return false;
            }
            else if ($('#txtSessionStarttime').val() == '') {
                alert('Please Enter start Time');
                $('#txtSessionStarttime').focus();
                return false;

            }
            else if ($('#txtSessionEndtime').val() == '') {
                alert('Please Enter End Time');
                $('#txtSessionEndtime').focus();
                return false;

            }

            $("#btnSubmit").prop("disabled", "disabled");
            $(".loader-container").css("display", "block");
            var formData = {
                Exam: $("#txtExam").val(),
                ExamId: $.trim($('#ExamId').val()),
                IsActive: $('#chkIsActive').is(":checked"),
                StartDate: $('#txtStartDate').val(),
                EndDate: $('#txtEndDate').val(),
                Starttime: $('#txtSessionStarttime').val(),
                Endtime: $('#txtSessionEndtime').val()
            };
            $('#btnSubmit').prop('disabled', 'disabled').val('Processing');
            $.ajax({
                url: "/Admin/Exam/ExamSaveUpdate",
                type: "POST",
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(formData),
                success: function (data) {
                    ToggleSaved(data)
                    clearData();
                }
            });

            //ExamEndpoint.prototype.SetBranchCode(formData, function (response) {
            //    CommonForAll.prototype.ToggleSaved(response);
            //    });
               
            $(".loader-container").fadeOut('slow');
        });
    };

    var ExamBind = function () {
        $('#example').DataTable({
            destroy: true,
            "ajax": {
                "url": '/Admin/Exam/GetExamData/',
                "type": "get",
                "datatype": "json"
            },
            "columns": [
                {
                    "data": "ExamId", "width": "20px", "sClass": "tdalign", "render": function (data) {
                        return '<Center><i class="fa fa-pencil-square-o" style="cursor:pointer" tabindex="2" aria-hidden="true" onclick="editdetails(' + data + ')"></i></Center>';
                    }
                },
                { "data": "Exam", "autoWidth": false },
                { "data": "StartDate", "autoWidth": false },
                { "data": "EndDate", "autoWidth": false },
                { "data": "Starttime", "autoWidth": false },
                { "data": "Endtime", "autoWidth": false },
                { "data": "IsActive", "autoWidth": false },
            ],

        })
    };
    $('#btnClose').click(function () {
       ClearMessage();
        clearData();
    });

    var clearData = function () {
        $('#ExamId').val(0);
        $('#txtExam').val('');
        $('#btnSubmit').removeAttr('disabled');
        $('#txtStartDate').val('');
        $('#txtEndDate').val('');
        $('#txtSessionStarttime').val('');
        $('#txtSessionEndtime').val('');
        ExamBind();
        $('#chkIsActive').prop('checked', 'checked');
        $("#btnSubmit").html('<span class="fa fa-floppy-o" aria-hidden="true" id="btnSubmit">&nbsp;Submit</span>');

    };

    function loadEditData(rowData) {
        $("#ExamId").val(rowData.ExamId);
        $("#txtExam").val(rowData.Exam);
        $('#txtStartDate').val(rowData.StartDate),
            $('#txtEndDate').val(rowData.EndDate),
            $('#txtSessionStarttime').val(rowData.Starttime),
            $('#txtSessionEndtime').val(rowData.Endtime)
        if (rowData.IsActive == true) {
            $("#chkIsActive").prop('checked', true);
        }
        else {
            $("#chkIsActive").prop('checked', false);
        }
        $("#btnSubmit").html('<span class="fa fa-refresh" aria-hidden="true" id="btnSubmit">&nbsp;Update</span>');
    };
    return {
        Init: init,
       LoadEditData: loadEditData
    };
}();
function editdetails(id) {
    $('.alert').css('display', 'none');
    $.ajax({
        url: "/Admin/Exam/GetDataById",
        type: "POST",
        data: JSON.stringify({ id: id }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            Exam.LoadEditData(data)
        }
    });
}

