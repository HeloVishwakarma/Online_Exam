var ExamType = function () {
    var init = function () {
        BindExam()
        $('#DivAlertMsg').hide();
        BindEvent();
    };
    var BindExam = function () {
        $.ajax({
            url: "/ExamType/GetBindExamList",
            type: "post",
            success: function (data) {
                RenderDropDown($("#ddlExam"), data, 'ExamId', 'Exam');

            }
        });

    };
    var BindExamType = function () {
        $.ajax({
            url: '/Admin/ExamType/GetBindExamTypeList?Id=' + $('#ddlExam').val(),
            type: 'POST',
            success: function (data) {
                RenderDropDown($("#ddlExamName"), data, 'ExamNameId', 'ExamName');
            }
        });
    };
    var BindEvent = function () {
        $("#ddlExam").change(function () {
            $('#ddlExamName').val(0)
            BindExamType();
            if ($('#ddlExamName').val() == 0) {
                var ExamNameId = $('#ddlExamName').val();
            }
            else {
                var ExamNameId = $('#ddlExamName').val() ? null : 0;
            }
            ExamTypeBind(ExamNameId);
        });
        $("#ddlExamName").change(function () {
            ExamTypeBind($('#ddlExamName').val());
        });
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
            .find('input').change(function () {
                console.log(this.value);
            });

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
            if ($.trim($('#ddlExam').val()) == 0) {
                alert('Please select Exam');
                $('#txtExamType').focus();
                return false;
            }
            if ($.trim($('#txtExamType').val()) == '') {
                alert('Please Insert ExamType');
                $('#txtExamType').focus();
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
                ExamId: $("#ddlExam").val(),
                ExamNameId: $("#ddlExamName").val(),
                ExamType: $("#txtExamType").val(),
                ExamTypeId: $.trim($('#hdnExamTypeId').val()),
                IsActive: $('#chkIsActive').is(":checked"),
                StartDate: $('#txtStartDate').val(),
                EndDate: $('#txtEndDate').val(),
                Starttime: $('#txtSessionStarttime').val(),
                Endtime: $('#txtSessionEndtime').val()
            };
            $('#btnSubmit').prop('disabled', 'disabled').val('Processing');
            $.ajax({
                url: "/Admin/ExamType/ExamTypeSaveUpdate",
                type: "POST",
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(formData),
                success: function (data) {
                    ToggleSaved(data);
                    clearData();
                }
            });
            $(".loader-container").fadeOut('slow');
        });
    };
    var ExamTypeBind = function (ExamNameId) {
        $('#example').DataTable({
            destroy: true,
            "ajax": {
                "url": '/Admin/ExamType/GetExamTypeData?ExamId=' + $("#ddlExam").val() + '&ExamNameId=' + ExamNameId,
                "type": "get",
                "datatype": "json"
            },
            "columns": [
                {
                    "data": "ExamTypeId", "width": "20px", "sClass": "tdalign", "render": function (data) {
                        return '<Center><i class="fa fa-pencil-square-o" style="cursor:pointer" tabindex="2" aria-hidden="true" onclick="editdetails(' + data + ')"></i></Center>';
                    }
                },
                { "data": "Exam", "autoWidth": false },
                { "data": "ExamName", "autoWidth": false },
                { "data": "ExamType", "autoWidth": false },
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
        $('#ddlExam').val(0);
        $('#txtExamType').val('');
        $('#btnSubmit').removeAttr('disabled');
        $('#txtStartDate').val('');
        $('#txtEndDate').val('');
        $('#txtSessionStarttime').val('');
        $('#txtSessionEndtime').val('');
        $("#hdnExamTypeId").val(0);
        $('#ddlExamName').val(0);
        $('#chkIsActive').prop('checked', 'checked');
        $("#btnSubmit").html('<span class="fa fa-floppy-o" aria-hidden="true" id="btnSubmit">&nbsp;Submit</span>');

    };

    function loadEditData(rowData) {
        $("#ddlExam").val(rowData.ExamId);
        $('#ddlExamName').val(rowData.ExamNameId)
        $("#hdnExamTypeId").val(rowData.ExamTypeId);
        $("#txtExamType").val(rowData.ExamType);
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
        url: "/Admin/ExamType/GetDataByExamId?Id=" + id,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            ExamType.LoadEditData(data)
        }
    });
}

