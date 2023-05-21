var ChapterContent = function () {
    var init = function () {
        $('#DivAlertMsg').hide();
        BindChapterContent()
       //ChapterContentBind();
    };
    var BindChapterContent = function () {
        $.ajax({
            url: "/ChapterContent/GetBindChapterList",
            type: "post",
            success: function (data) {
                RenderDropDown($("#ddlChapterId"), data, 'ChapterId', 'ChapterName');
            }
        });

    };
   $('#ddlChapterId').change(function(){
       ChapterContentBind($('#ddlChapterId').val());
   });
        $('#btnSubmit').click(function () {
          if ($.trim($('#ddlChapterId').val()) == 0) {
              alert('Please select Chapter');
              $('#ddlChapterId').focus();
              return false;
          }
          if ($.trim($('#txtChapterContent').val()) == '') {
              alert('Please Insert ChapterContent');
              $('#txtChapterContent').focus();
              return false;
          }
          
          $("#btnSubmit").prop("disabled", "disabled");
          $(".loader-container").css("display", "block");
          var formData = {
              ChapterId: $("#ddlChapterId").val(),
              ChapterContent: $("#txtChapterContent").val(),
              ChapterContentId: $.trim($('#hdnChapterContentId').val()),
              IsActive: $('#chkIsActive').is(":checked")
          };
          $('#btnSubmit').prop('disabled', 'disabled').val('Processing');
          $.ajax({
              url: "/Admin/ChapterContent/ChapterNameSaveUpdate",
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
    var ChapterContentBind = function (Id) {
        $('#example').DataTable({
            destroy: true,
            "ajax": {
                "url": '/Admin/ChapterContent/GetChapterContent?Id='+ Id,
                "type": "get",
                "datatype": "json"
            },
            "columns": [
                {
                    "data": "ChapterContentId", "width": "20px", "sClass": "tdalign", "render": function (data) {
                      return '<Center><i class="fa fa-pencil-square-o" style="cursor:pointer" tabindex="2" aria-hidden="true" onclick="editdetails(' + data + ')"></i></Center>';
                  }
              },
              { "data": "ChapterContent", "autoWidth": false },
              { "data": "ChapterName", "autoWidth": false },
              { "data": "IsActive", "autoWidth": false },
          ],
  
      })
  };
   $('#btnClose').click(function () {
   ClearMessage()
   clearData();
   });

   var clearData = function () {
       $('#ddlChapterId').val(0);
       $('#txtChapterContent').val('');
       $("#hdnChapterContentId").val(0);
       $('#chkIsActive').prop('checked', 'checked');
       $("#btnSubmit").html('<span class="fa fa-floppy-o" aria-hidden="true" id="btnSubmit">&nbsp;Submit</span>');
  
   };

    function loadEditData(rowData) {
        $("#ddlChapterId").val(rowData.ChapterId);
        $("#hdnChapterContentId").val(rowData.ChapterContentId);
        $("#txtChapterContent").val(rowData.ChapterContent);
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
        url: "/Admin/ChapterContent/GetDataByChapterContentId",
        type: "POST",
        data: JSON.stringify({ id: id }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            ChapterContent.LoadEditData(data)
        }
    });
}

