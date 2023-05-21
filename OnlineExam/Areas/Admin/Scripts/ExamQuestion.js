var ExamQuestion = function () {
    var init = function () {
        BindQuestionList()
        BindExam()
        BindEvent()
    };
    var BindExam = function () {
        $.ajax({
            url: "/ExamName/GetBindExamList",
            type: "post",
            success: function (data) {
                RenderDropDown($("#ddlExam"), data, 'ExamId', 'Exam');

            }
        });

        var getAddedQuestionOptionsTableData = function () {
            var dataTable = '[{';
            $("#bodyAddOptionsDetails tr").each(function () {
                var optionName = $(this).find($('[id^=lblOptionName]')).text();
                var isAnswer = $(this).find($('[id^=hdnIsAnswer]')).val();

                //if (parseInt(Amount) != 0 && parseInt(Amount) != 'NaN') {
                if (dataTable == '[{') {
                    dataTable += '"OptionsName": "' + optionName + '","IsAnswer": "' + isAnswer + '"}';
                }
                else {
                    dataTable += ',{"OptionsName": "' + optionName + '","IsAnswer": "' + isAnswer + '"}';
                }
                //}
            });
            dataTable = dataTable + ']';
            if (dataTable == '[{]')
                dataTable = '[]';
            var documentTable = JSON.parse(dataTable);
            return documentTable;
        };
        $('#btnSubmit').click(function () {

            var questionTypeId = $('#ddlQuestionType').val();
            var optionCount = $("#bodyAddOptionsDetails tr").length;
            var optionValue = $('#txtOptionSelection').val();
            var searchBy = $('input[type=radio][name=Scriteria]:checked').val();
            var ArrCourseId = new Array();
            var selCourseIds = $("#ddlCourse option:selected");

            if (selCourseIds.length) {
                selCourseIds.each(function () {
                    //FeeHeads += $(this).val() + "$";
                    ArrCourseId.push({ CourseId: $(this).val() });
                });
            } else {
                ArrCourseId.push({ CourseId: 0 });
            }


            if (searchBy == '1') {
                if ($('#ddlExam').val() == "0") {
                    alert("Please Select Exam.");
                    $('#ddlExam').focus();
                    return false;
                }
            }
            if (searchBy == '2') {
                if ($('#ddlExam').val() == "0") {
                    alert("Please Select Exam.");
                    $('#ddlExam').focus();
                    return false;
                }
                if (selCourseIds.length == '0') {
                    alert('Please Select Course');
                    $('#ddlCourse').focus();
                    return false;
                }
                //if ($('#ddlCourse').val() == "0") {
                //    alert("Please Select Course.");
                //    $('#ddlCourse').focus();
                //    return false;
                //}
            }
            if (questionTypeId <= 0) {
                alert("Please Select Question Type");
                $('#ddlQuestionType').focus();
                return false;
            }
            else if ($('#txtQuestion').val() == '') {
                alert("Please Enter Question");
                $('#txtQuestion').focus();
                return false;
            }
            else if ($('#txtSerialNumber').val() == '') {
                alert("Please Enter Serial Number");
                $('#txtSerialNumber').focus();
                return false;
            }
            if (questionTypeId == 1 || questionTypeId == 3 || questionTypeId == 4) {
            }
            else if (optionValue == '') {
                alert("Please Enter Max. Option Selection");
                $('#txtOptionSelection').focus();
                return false;
            }
            else if (optionValue > optionCount) {
                alert("Option Selection Must Be Less Than Or Equal To Added Options");
                $('#txtOptionSelection').focus();
                return false;
            }
            if (questionTypeId == 3) {
            }
            else if (optionCount <= 0) {
                alert("Please Add Options For This Question");
                return false;
            }
            //#region Validation
            //if ($("#bodyAddOptionsDetails tr").length) {
            if ($.trim($('#txtQuestionOption').val()) == '') {
            }
            else {
                alert("Please Add The Option You Have Entered");
                $('#txtQuestionOption').focus();
                return false;
            }
            var dataTable = getAddedQuestionOptionsTableData();

            $("#btnSubmit").prop("disabled", "disabled");
            $("#btnSubmit").val("Processing...");

            SaveQuestionDetails(dataTable, ArrCourseId);

        });
    };
    
    var SaveQuestionDetails = function (data, ArrCourseId) {
        //alert(JSON.stringify(data), JSON.stringify(jsonData));
        var jsonData = {
            FeedBackQuestionsId: $('#hdnFeedbackQuestionId').val(),
            SerialNumber: $("#txtSerialNumber").val(),
            Questions: $("#txtQuestion").val(),
            MaxOptionSelection: $("#txtOptionSelection").val(),
            IsCompulsary: true,//$("#btnSubmit").val(),
            QuestionsTypeId: $("#ddlQuestionType").val(),
            IsActive: $("#chkIsActive").is(':checked'),
            questionOptions: data,
            CourseIds: ArrCourseId,
            CourseLevelId: $('#ddlExam').val()
        }
        $.ajax({
            url: "/Admin/ExamQuestion/AddUpdateQuestionData",
            type: "POST",
            data: { questionOptions: data, vmQuestionDefinitionPost: jsonData },
            dataType: 'json',
            success: function (data) {
                ClearData(data);
            },
            error: function (errResponse) {
            }
        });

    }
    var BindExamName = function () {
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
            BindExamName();
        });
        $('#ddlQuestionType').change(function () {
            ClearData(-2);
            var id = $('#ddlQuestionType').val();
            if (id > 0) {
                var searchBy = $('input[type=radio][name=Scriteria]:checked').val();
                if (searchBy == '1') {
                    toggleQuestionOption(id);
                    GetLoadData(id, $('#ddlExam').val(), 0);
                }
                else if (searchBy == '2') {
                    toggleQuestionOption(id);
                    GetLoadData(id, $('#ddlExam').val(), $("#ddlExamName").val());
                }


            }
            else {
                GetLoadData(id, 0, 0);
                ClearCancelData();
            }
        });
        $('#btnAdd').click(function () {
            var searchBy = $('input[type=radio][name=Scriteria]:checked').val();
            if (searchBy == '1') {
                if ($('#ddlExam').val() == "0") {
                    alert("Please Select Exam.");
                    $('#ddlExam').focus();
                }
            }
            if (searchBy == '2') {
                if ($('#ddlExamName').val() == "0") {
                    alert("Please Select Exam Name.");
                    $('#ddlExamName').focus();
                }
                if ($('#ddlExamType').val() == "0") {
                    alert("Please Select Exam Type");
                    $('#ddlExamType').focus();
                }
            }
            if ($('#ddlQuestionType').val() == "") {
                alert("Please Select Question Type.");
                $('#ddlQuestionType').focus();
            }
            if ($('#txtQuestion').val() == "") {
                alert("Please Enter Question.");
                $('#txtQuestion').focus();
            }
            else {
                var flag = true;
                $('#bodyAddOptionsDetails tr').each(function () {
                    var optionName = $(this).find('#lblOptionName').text();
                    if (optionName == $('#txtQuestionOption').val()) {
                        flag = false;
                        return false;
                    }
                    else {
                        flag = true;
                    }
                });
                var optionCount = $('#bodyAddOptionsDetails tr').length;
                if (parseInt(optionCount) == 2 && $('#ddlQuestionType').val() == 4) {
                    alert("You Can Add Only 2 Option In This Question Type");
                    return false;
                }
                if (flag) {
                    var options = [{
                        OptionsName: $('#txtQuestionOption').val(),
                        IsAnswer: $('#chkMarkedAnswer').is(':checked'),
                        QuestionOptionId: 0
                    }]
                    RenderQuestionOptionsGrid(options);
                }
                else {
                    alert("Option already exist.");
                    return false;
                }
            }
        });
    }
    var RenderQuestionOptionsGrid = function (data) {
        var html = '';
        $.each(data, function (key, valuuu) {
            if (valuuu.OptionsName == null || valuuu.OptionsName == '') { }
            else {
                html += '<tr>';
                html += '<td style="width: 80%; text-align: left"><label id="lblOptionName">' + valuuu.OptionsName + '</label><input type="hidden" value="' + valuuu.IsAnswer + '" id="hdnIsAnswer"/></td>';//<input type="hidden" value="' + valuuu.QuestionOptionId + '" id="hdnQuestionOptionId"/>
                //html += '<td style="width: 40%; text-align: left"><label id="lblFileName">' + data.FileName + '</label><input type="hidden" value="' + data.QuestionOptionId + '" id="hdnQuestionOptionId"/></td>';
                html += '<td style="width: 20%;text-align: center">';
                html += '<a href="javascript:;" class="btn btn-small" onclick="return RemoveDocumentRow(this);"><i class="fa fa-remove" style="color:red;"></i></a></td>';
                html += '</tr>';
            }
        });
        $('#bodyAddOptionsDetails').append(html);
        ClearOptionData();
        ToggleTable();
    }
    function ToggleTable() {
        if ($('#bodyAddOptionsDetails tr').length) {
            $('#divQuestionOptions').css('display', 'block');
        }
        else {
            $('#divQuestionOptions').css('display', 'none');
        }
    }
    var ClearOptionData = function () {

        $('#txtQuestionOption').val('');
        $("#chkMarkedAnswer").prop('checked', false);
    }
    var ClearData = function (valuee) {

        if (valuee != -2) {
            GetLoadData(0, 0, 0);
            $('#ddlQuestionType').val(0);
            $('#ddlCourseLevel').val('0');
        }

        $('#txtQuestion').val('');
        $("#chkIsActive").prop('checked', true);
        $('#hdnFeedbackQuestionId').val(0);
        $('#divQuestionOption').css('display', 'none');
        $('#txtQuestionOption').val('');
        $('#txtSerialNumber').val('');
        $('#txtOptionSelection').val('');
        $("#chkMarkedAnswer").prop('checked', false);
        $('#divQuestionOptions').css('display', 'none');
        $("#bodyAddOptionsDetails").empty();
        $("#bodyQuestionDetails").empty();
        $("#btnSubmit").val("Submit");
        $('#btnSubmit').removeAttr('disabled');

        $('#Panel_Confirm').css('display', 'none');
        $('#Panel_Error').css('display', 'none');
        $('#Panel_Warning').css('display', 'none');
        $('#Label_ConfirmMessage').text('');
        $('#Label_Warning').text('');
        $('#Label_ErrorMessage').text('');

        if (valuee == '1') {
            $('#Panel_Confirm').css('display', 'block');
            $('#Panel_Error').css('display', 'none');
            $('#Panel_Warning').css('display', 'none');
            $('#Label_ConfirmMessage').text('Record Saved Successfully!');
        }
        else if (valuee == '2') {
            $('#Panel_Confirm').css('display', 'block');
            $('#Panel_Error').css('display', 'none');
            $('#Panel_Warning').css('display', 'none');
            $('#Label_ConfirmMessage').text('Record Updated Successfully!');
        }
        else if (valuee == '0') {
            $('#Panel_Confirm').css('display', 'none');
            $('#Panel_Error').css('display', 'none');
            $('#Panel_Warning').css('display', 'block');
            $('#Label_Warning').text('Can Not Update The Record, As Student Already Answered The Question');
        } else if (valuee == '-1') {
            $('#Panel_Confirm').css('display', 'none');
            $('#Panel_Error').css('display', 'none');
            $('#Panel_Warning').css('display', 'block');
            $('#Label_Warning').text('Serial Number Already Assigned To The Question Or Question Already Exist');
        }
        else if (valuee == '-99') {
            $('#Panel_Confirm').css('display', 'none');
            $('#Panel_Error').css('display', 'block');
            $('#Panel_Warning').css('display', 'none');
            $('#Label_ErrorMessage').text('Something went wrong, please try again');
        }
    }
    var RenderQuestionDataGrid = function (data) {

        var html = '';
        if (data.length) {
            $.each(data, function (i, val) {
                html += '<tr><td style="width:15%; text-align: left"><a href="javascript:;" class="btn btn-small" onclick="return EditQuestion(this, ' + val.FeedBackQuestionsId + ');"><i class="fa fa-pencil" id="btnEdit"></i></a></td>';
                html += '<td style="width:15%;text-align: left">' + val.SerialNumber + '</td>';
                html += '<td style="width:35%;text-align: left">' + val.Questions + '<input type="hidden" value="' + val.FeedBackQuestionsId + '" id="hdnCertificateId"/></td>';
                html += '<td style="width:20%;text-align: left">' + val.Course + '</td>';
                html += '<td style="width:15%;text-align: left">' + val.Active + '</td>';
                html += '</tr>';
            });
        }
        else {
            html += '<tr><td colspan="3">Question not found</td>';
            html += '</tr>';
        }
        $('#bodyQuestionDetails').empty().append(html);
        $('#divQuestionList').css('display', 'block');
    }

    function toggleQuestionOption(questionTypeId) {
        switch (parseInt(questionTypeId)) {
            case 1:
                $('#divOptionSelection').css('display', 'none');
                $('#divQuestionOption').css('display', 'block');
                break;
            case 2:
                $('#divOptionSelection').css('display', 'block');
                $('#divQuestionOption').css('display', 'block');
                break;
            case 3:
                $('#divOptionSelection').css('display', 'none');
                $('#divQuestionOption').css('display', 'none');
                break;
            case 4:
                $('#divOptionSelection').css('display', 'none');
                $('#divQuestionOption').css('display', 'block');
                break;
        }
    }
    function GetLoadData(id, ExamId, ExamNameId) {
        $.ajax({
            url: '/Admin/ExamQuestion/GetQuestionData?questionTypeId=' + id + '&ExamId=' + ExamId + '&ExamNameId=' + ExamNameId,
            type: "POST",
            success: function (result) {
                RenderQuestionDataGrid(result);
            },
            error: function (err) {
            }
        });
    }
    var BindQuestionList = function () {
        $.ajax({
            url: "/Admin/ExamQuestion/GetBindQuestionList",
            type: "post",
            success: function (data) {
                RenderDropDown($('#ddlQuestionType'), data, 'QuestionTypeId', 'QuestionTypeName');
            }
        });
    }
    return {
        Init: init//,
        //LoadEditData: loadEditData
        , ToggleTable: ToggleTable
    };
}();
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
function RemoveDocumentRow(event) {
    if (confirm("Do you want to delete the option?")) {
        $(event).closest('tr').remove();
        ExamQuestion.ToggleTable();
    }
    else {
    }
}
