var Chapter = function () {
    var init = function () {
        $('#DivAlertMsg').hide();
        ChapterBind();
        BindEvent();
    };
    var BindEvent = function () {
       
        $('#btnSubmit').click(function () {
            if ($.trim($('#txtChapterName').val()) == '') {
                alert('Please Insert Chapter Name');
                $('#txtChapter').focus();
                return false;
            }
           
            $("#btnSubmit").prop("disabled", "disabled");
            $(".loader-container").css("display", "block");
            var formData = {
                ChapterName: $("#txtChapterName").val(),
                ChapterId: $.trim($('#ChapterId').val()),
                IsActive: $('#chkIsActive').is(":checked"),
            };
            $('#btnSubmit').prop('disabled', 'disabled').val('Processing');
            $.ajax({
                url: "/Admin/Chapter/ChapterSaveUpdate",
                type: "POST",
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(formData),
                success: function (data) {
                    ToggleSaved(data)
                    clearData();
                }
            });
            $(".loader-container").fadeOut('slow');
        });
    };

    var ChapterBind = function () {
        $('#example').DataTable({
            destroy: true,
            "ajax": {
                "url": '/Admin/Chapter/GetChapterData/',
                "type": "get",
                "datatype": "json"
            },
            "columns": [
                {
                    "data": "ChapterId", "width": "20px", "sClass": "tdalign", "render": function (data) {
                        return '<Center><i class="fa fa-pencil-square-o" style="cursor:pointer" tabindex="2" aria-hidden="true" onclick="editdetails(' + data + ')"></i></Center>';
                    }
                },
                { "data": "ChapterName", "autoWidth": false },
                { "data": "IsActive", "autoWidth": false },
            ],

        })
    };
    $('#btnClose').click(function () {
       ClearMessage();
        clearData();
    });

    var clearData = function () {
        $('#ChapterId').val(0);
        $('#txtChapterName').val('');
        $('#btnSubmit').removeAttr('disabled');
        ChapterBind();
        $('#chkIsActive').prop('checked', 'checked');
        $("#btnSubmit").html('<span class="fa fa-floppy-o" aria-hidden="true" id="btnSubmit">&nbsp;Submit</span>');

    };

    function loadEditData(rowData) {
        $("#ChapterId").val(rowData.ChapterId);
        $("#txtChapterName").val(rowData.ChapterName);
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
        url: "/Admin/Chapter/GetDataById",
        type: "POST",
        data: JSON.stringify({ id: id }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            Chapter.LoadEditData(data)
        }
    });
}

