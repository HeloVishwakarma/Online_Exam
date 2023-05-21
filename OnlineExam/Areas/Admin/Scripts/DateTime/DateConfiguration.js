var DateConfiguration = function () {
    var init = function () {
        BindDateConfigurations();
        BindEvent();
        GetDropdowns();
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
            // format: "yyyy/mm/dd",
            forceParse: 0
        });

        //_______________________________________________________

        $('.clockpicker').clockpicker({
            twelvehour: true
        })
            .find('input').change(function () {
                console.log(this.value);
            });

        $('.clockpicker-with-callbacks').clockpicker({
            donetext: 'Done',
            init: function () {
                console.log("colorpicker initiated");
            },
            beforeShow: function () {
                console.log("before show");
            },
            afterShow: function () {
                console.log("after show");
            },
            beforeHide: function () {
                console.log("before hide");
            },
            afterHide: function () {
                console.log("after hide");
            },
            beforeHourSelect: function () {
                console.log("before hour selected");
            },
            afterHourSelect: function () {
                console.log("after hour selected");
            },
            beforeDone: function () {
                console.log("before done");
            },
            afterDone: function () {
                console.log("after done");
            }
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


        $("#ddlCourseLevel").change(function () {
            $('#Panel_Confirm').css('display', 'none');
            $('#Panel_Error').css('display', 'none');

            LoadCourseLevelData($("#ddlCourseLevel").val());
            //BindDateConfigurations();
            //}
        });


        $("#ddlBasicCourse").change(function () {
            $('#Panel_Confirm').css('display', 'none');
            $('#Panel_Error').css('display', 'none');
            if ($("#ddlBasicCourse").val() <= 0) {
                $("#ddlCourse").empty().append($('<option />').val(0).text('Please select'));
            }
            else {
                LoadCourseData($("#ddlBasicCourse").val());
                BindDateConfigurations();
            }
        });
        $("#ddlCourse").change(function () {
            $('#Panel_Confirm').css('display', 'none');
            $('#Panel_Error').css('display', 'none');
        });

        $('#btnSubmit').click(function () {
            if ($("#ddlCourse option:selected").length <= 0) {
                alert('Please Select Course');
                $('#ddlCourse').focus();
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
            else {
                var ArrCourseId = new Array();
                var selCourseIds = $("#ddlCourse option:selected");

                selCourseIds.each(function () {
                    //FeeHeads += $(this).val() + "$";
                    ArrCourseId.push({ CourseId: $(this).val() });
                });

                var formData = {
                    OnlineRegistrationDateId: $('#hdnOnlineRegistrationDateId').val(),
                    StartDate: $('#txtStartDate').val(),
                    EndDate: $('#txtEndDate').val(),
                    //HomePageHeader: $('#txtHomePageHeader').val(),
                    IsActive: $('#chkIsActive').is(":checked"),
                    IsImportUser: $('#chkIsImportUser').is(":checked"),
                    CourseId: $('#ddlCourse').val(),
                    CourseIds: ArrCourseId,
                    RegStarttime: $('#txtSessionStarttime').val(),
                    RegEndtime: $('#txtSessionEndtime').val(),
                };
                $('#btnSubmit').prop('disabled', 'disabled').val('Processing');
                $.ajax({
                    url: "/DateConfiguration/AddUpdateDateConfiguration",
                    type: "POST",
                    data: formData,
                    success: function (data) {
                        ToggleSaved(data);
                    }
                });
            }
        });
        $('#btnCancel').click(function () {
            $('#Panel_Confirm').css('display', 'none');
            $('#Panel_Error').css('display', 'none');
            clearCancelData();
        });
    };

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

    var BindDateConfigurations = function () {
        var oTable = $('#example').DataTable({
            destroy: true,
            "ajax": {
                "url": '/DateConfiguration/GetDateConfigurationJson?Id=' + $('#ddlBasicCourse').val(),
                "type": 'get',
                "datatype": 'json'
            },
            "columns": [
                {
                    "data": "OnlineRegistrationDateId", "width": "20px", "sClass": "tdalign", "render": function (data) {
                        return '<i class="fa fa-pencil-square-o" style="cursor:pointer"  tabindex="2" aria-hidden="true" onclick="return UpadateData(' + data + ')"></i>';
                    }
                },
                { "data": "CourseName", "autoWidth": false },
                { "data": "StartDate", "autoWidth": false },
                { "data": "EndDate", "autoWidth": false },
                { "data": "Starttime", "autoWidth": false },
                { "data": "Endtime", "autoWidth": false },
                { "data": "ImportUserStatus", "autoWidth": false },
                { "data": "ActiveStatus", "autoWidth": false },

            ],
        })
    };

    var ToggleSaved = function (data) {
        $('#btnSubmit').removeAttr('disabled').val('Submit');
        if (parseInt(data) > 0) {
            $('#Panel_Confirm').css('display', 'block');
            if ($('#hdnOnlineRegistrationDateId').val() == 0) {
                $('#Label_ConfirmMessage').html('Record Saved Successfully!');
            }
            else {
                $('#Label_ConfirmMessage').html('Record Updated Successfully!');
            }
            $('html, body').animate({
                scrollTop: $(".panel-body").offset().top
            }, 500);
            clearData();
            // BindDateConfigurations();
        }
        if (data == -99) {
            $('#Panel_Error').css('display', 'block');
            $('#Label_ErrorMessage').html('Something went wrong, please try again later!');
            $('html, body').animate({
                scrollTop: $(".panel-body").offset().top
            }, 500);
        }
    }
    var clearData = function () {
        $("#ddlCourse option:selected").removeAttr("selected");
        $("#ddlCourse").multiselect("refresh");
        //$("#ddlBasicCourse").val("0");
        /////$("#ddlCourseLevel").val("0");
        $('#txtSessionStarttime').val('');
        $('#txtSessionEndtime').val('');
        $("#txtStartDate").val('');
        $("#txtEndDate").val('');
        // $("#ddlBasicCourse").val("0");
        //$("#ddlCourse").val("0");
        //$("#txtHomePageHeader").val('');
        $("#chkIsActive").prop('checked', 'checked');
        BindDateConfigurations();
        //$('#ddlCourse').multiselect('rebuild');
    };
    var clearCancelData = function () {
        $("#ddlCourse").val("0");

        $("#ddlCourse option:selected").removeAttr("selected");
        $("#ddlCourse").multiselect("refresh");
        $('#txtSessionStarttime').val('');
        $('#txtSessionEndtime').val('');
        $("#txtStartDate").val('');
        $("#txtEndDate").val('');
        $("#ddlBasicCourse").val("0");
        $("#ddlCourseLevel").val("0");
        //$("#txtHomePageHeader").val('');
        $("#chkIsActive").prop('checked', 'checked');

        // BindDateConfigurations();
        $('#example tbody').empty();
        BindDateConfigurations();
    };

    var GetDropdowns = function () {
        $.ajax({
            url: "/DateConfiguration/GetConfigBasicCourseLoad",
            type: "post",
            success: function (data) {
                RenderLoadDropdowns(data["BasicCourse"]);
                RenderCourseDropdowns(data["CourseList"]);
                RenderCourseLevelDropdowns(data["CourseLevelList"]);
            }
        });
    }

    var RenderLoadDropdowns = function (data) {
        RenderDropDown($("#ddlBasicCourse"), data, 'BasicCourseId', 'BasicCourseName');
    }

    var RenderCourseDropdowns = function (data) {
        $('#ddlCourse').empty();
        $.each(data, function () {

            $('#ddlCourse').append($("<option />").val(this.CourseId).text(this.CourseName));
        });
        $('#ddlCourse').multiselect('rebuild');

    };


    var RenderCourseLevelDropdowns = function (data) {
        RenderDropDown($("#ddlCourseLevel"), data, 'CourseLevelId', 'CourseLevel');
    }
    var LoadCourseData = function (basicCourseId) {
        $.ajax({
            url: "/DateConfiguration/GetCourse",
            type: "post",
            data: { basicCourseId: basicCourseId },
            success: function (data) {
                //RenderDropDown($("#ddlCourse"), data, 'CourseId', 'CourseName');
                RenderCourseDropdowns(data);
            }
        });
    }
    var LoadCourseLevelData = function (CourseLevelId) {
        $.ajax({
            url: "/DateConfiguration/GetDataByCourseLevelId",
            type: "post",
            data: { CourseLevelId: CourseLevelId },
            success: function (data) {
                //RenderCourseDropdowns(data);

                RenderLoadDropdowns(data["BasicCourse"]);
                RenderCourseDropdowns(data["CourseList"]);
            }
        });
    }

    function loadEditData(rowData) {

        $('#Panel_Confirm').css('display', 'none');
        $('#Panel_Error').css('display', 'none');
        $("#hdnOnlineRegistrationDateId").val(rowData.OnlineRegistrationDateId);
        $("#txtStartDate").val(rowData.StartDate);
        $("#txtEndDate").val(rowData.EndDate);
        $('#ddlCourseLevel').val(rowData.CourseLevelId);
        $('#ddlCourse').val([rowData.CourseId]);
        //$("#ddlCourse").val(rowData.CourseId);
        $("#ddlCourse").multiselect("refresh");

        $("#ddlBasicCourse").val(rowData.BasicCourseId);
        $('#txtSessionStarttime').val(rowData.Starttime);
        $('#txtSessionEndtime').val(rowData.Endtime);
        //$("#txtHomePageHeader").val(rowData.HomePageHeader);
        $("#chkIsActive").prop('checked', rowData.IsActive);
        $("#chkIsImportUser").prop('checked', rowData.IsImportUser);
        $("#btnSubmit").text('Update');
    };
    return {
        Init: init,
        LoadEditData: loadEditData
    };
}();

function UpadateData(id) {
    $.ajax({
        url: "/DateConfiguration/GetDateConfigurationById?onlineRegId=" + id,
        type: "POST",
        async: false,
        success: function (data) {

            DateConfiguration.LoadEditData(data);
        },
        error: function (errResponse) {
            console.log(errResponse);
        }
    });
};