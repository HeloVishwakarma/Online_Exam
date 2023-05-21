class CommonForAll {

     ToggleSaved  (data) {
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
    ClearMessage(): any {
        $('#warning').css('display', 'none');
        $('#success').css('display', 'none');
        $('#danger').css('display', 'none');
        $('#update').css('display', 'none');
        $('#DivAlertMsg').hide();
        $(".loader-container").fadeOut('slow');
    }
}
