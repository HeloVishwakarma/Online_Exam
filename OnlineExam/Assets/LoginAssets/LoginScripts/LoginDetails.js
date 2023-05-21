var LoginDetails = function () {
    var fieldData;
    var FormLinkStatus;
    var language;
    var init = function () {
        $(".loader-container").css("display", "block");
        if ($('#hdnIsCaptcha').val() == 'True') {
            Captcha();
        }

        BindEvents();
        /*Captcha();*/

        $(".loader-container").fadeOut('slow');
    };
    var BindEvents = function () {

        $('#registrationUserName').keyup(function () {
            $(this).val($(this).val().replace(/ +?/g, ''));
        });

        $('#btnLinkRegister').click(function () {
            $('#divLogin').css('display', 'none');
            $('#divRegister').css('display', 'block');
            $('#divForgotPassword').css('display', 'none');
            clearRegisterData();
        });
        $('#btnLinkLogin').click(function () {
            $('#divLogin').css('display', 'block');
            $('#divRegister').css('display', 'none');
            $('#divForgotPassword').css('display', 'none');
        });
        $('#btnLinkLogin2').click(function () {
            $('#divLogin').css('display', 'block');
            $('#divRegister').css('display', 'none');
            $('#divForgotPassword').css('display', 'none');
        });
        //validation for Login and InstituteLogin

        //Captcha login

        $('#btnStudLogin').click(function () {
            if (trimField($("#Email").val()) == '') {
                alert("Please Enter Username");
                $('#Email').focus();
                return false;
            }
            else if (trimField($("#Password").val()) == '') {
                alert("Please Enter Password");
                $('#Password').focus();
                return false;
            }

            var string1 = removeSpaces(document.getElementById('mainCaptcha').value);
            if (trimField($("#txtInput").val()) == '') {
                alert("Please Enter Captcha");
                $('#txtInput').focus();
                return false;
            }
            var string2 = removeSpaces(document.getElementById('txtInput').value);

            if (string1 == string2) {
                return true;
            } else {
                alert("Invalid Captcha");
                Captcha();
                return false;
            }

        })

        //$('#btnStudLogin').click(function () {
        //    if (trimField($("#Email").val()) == '') {
        //        alert("Please Enter Username");
        //        $('#Email').focus();
        //        return false;
        //    }
        //    else if (trimField($("#Password").val()) == '') {
        //        alert("Please Enter Password");
        //        $('#Password').focus();
        //        return false;
        //    }
        //})

        $('#btnAdminLogin').click(function () {
            if (trimField($("#EmailAdmin").val()) == '') {
                alert("Please Enter Username");
                $('#EmailAdmin').focus();
                return false;
            }
            else if (trimField($("#PasswordAdmin").val()) == '') {
                alert("Please Enter Password");
                $('#PasswordAdmin').focus();
                return false;
            }
        })
        $('#btnRegister').click(function () {
            if (trimField($("#registrationUserName").val()) == '') {
                alert("Please Enter Username");
                $('#registrationUserName').focus();
                return false;
            }
            else if ($("#registrationUserName").val().length < 6) {
                alert('Username Must Be Minimum 6 Characters Long');
                $('#registrationUserName').focus();
                return false;
            }
            else if (trimField($("#registrationPassword").val()) == '') {
                alert("Please Enter Password");
                $('#registrationPassword').focus();
                return false;
            }
            else if (trimField($("#registrationConfirmPassword").val()) == '') {
                alert("Please Enter Confirm Password");
                $('#registrationPassword').focus();
                return false;
            }
            else if (trimField($("#registrationPassword").val()) != trimField($("#registrationConfirmPassword").val())) {
                alert("Password And Confirm Password Does Not Match");
                $('#registrationConfirmPassword').focus();
                return false;
            }
            else if (trimField($("#registrationMobileNumber").val()) == '') {
                alert("Please Enter Mobile Number");
                $('#registrationMobileNumber').focus();
                return false;
            } else if ($.trim($('#registrationMobileNumber').val().length) != 10) {
                alert('Please Enter Valid Mobile Number');
                $('#registrationMobileNumber').focus();
                return false;
            } else if ($("#registrationPassword").val().length < 6) {
                alert('Password Must Be Minimum 6 Characters Long');
                $('#registrationPassword').focus();
                return false;
            } else if (!passwordMatch($.trim($('#registrationPassword').val()), $.trim($('#registrationConfirmPassword').val()))) {
                alert('Password Not Matched');
                $('#registrationConfirmPassword').focus();
                return false;
            }
            if ($('#hiddenPasswordValue').val() == "True") {
                if (!IsValidPassword($('#registrationPassword').val())) {
                    alert('Password must contain eight characters, at least one uppercase letter, one lowercase letter, one number and one special character');
                    $('#registrationPassword').focus();
                    return false;
                }
            }
            if ($('#hdnCollegeId').val() == 699) {
                if (trimField($("#registrationEmail").val()) == '') {
                    alert("Please Enter Email Id");
                    $('#registrationEmail').focus();
                    return false;
                }
            }
            if ($('#hdnCollegeId').val() == 697) {
                if (!IsValidEmail($('#registrationEmail').val())) {
                    alert('Please Enter Valid Email Id');
                    $('#registrationEmail').focus();
                    return false;
                }
            }
            else {
                if (trimField($('#registrationEmail').val()) != '') {
                    if (!IsValidEmail($('#registrationEmail').val())) {
                        alert('Please Enter Valid Email Id');
                        $('#registrationEmail').focus();
                        return false;
                    }
                }

            }

            $(".loader-container").css("display", "block");

            var jsonData = {
                UserName: $('#registrationUserName').val(),
                Password: $('#registrationPassword').val(),
                ConfirmPassword: $('#registrationConfirmPassword').val(),
                MobileNumber: $('#registrationMobileNumber').val(),
                Email: $('#registrationEmail').val()
            };

            $.ajax({
                type: 'POST',
                url: '/LoginRegistration/Register',
                data: jsonData,
                //dataType: 'json',
                success: function (response) {
                    $(".loader-container").fadeOut('slow');
                    if (response == 1) {
                        Swal.fire({
                            text: 'Registered Successfully!'
                        });
                        $('#divLogin').css('display', 'block');
                        $('#divRegister').css('display', 'none');
                        $('#divForgotPassword').css('display', 'none');
                    }
                    else if (response == 2) {
                        Swal.fire({
                          text: 'Username already exist, please choose another username'
                        });
                    }
                    else if (response == -99) {
                        //alert("Something went wrong, please try again later");
                        Swal.fire({
                            text: 'Something went wrong, please try again later'
                        });
                    }
                    else if (response == 3) {
                        //alert("Something went wrong, please try again later");
                        Swal.fire({
                            /*text: 'Something went wrong, please try again later'*/
                            text: 'Session has Expired please reload the page.'
                        });
                    }
                    else {
                        Swal.fire({
                            text: 'Registered Successfully! Username and Password Sent On Registered Mobile No.'

                        });
                        //alert("Registered Successfully! Username and Password Sent On Registered Mobile No.");
                        clearRegisterData();
                        $('#divLogin').css('display', 'block');
                        $('#divRegister').css('display', 'none');
                        $('#divForgotPassword').css('display', 'none');
                    }
                },
                error: function () {
                }
            });
        });
        $('#btnMsLogin').click(function () {
            if (trimField($("#MSUserName1").val()) == '') {
                alert("Please Enter Username");
                $('#MSUserName1').focus();
                return false;
            }
            else if (trimField($("#MSPassword1").val()) == '') {
                alert("Please Enter Password");
                $('#MSPassword1').focus();
                return false;
            }
        })
        $('#btnMsRegister').click(function (e) {
            if (trimField($("#MSUserName").val()) == '') {
                alert("Please Enter Username");
                $('#MSUserName').focus();
                return false;
            }
            else if ($("#MSUserName").val().length < 6) {
                alert('Username Must Be Minimum 6 Characters Long');
                $('#MSUserName').focus();
                return false;
            }
            if ($('#MSPassword').val() == '') {
                if (!IsValidEmail($('#MSPassword').val())) {
                    alert('Please Enter Password');
                    $('#MSPassword').focus();
                    return false;
                }
            }
            else {
                if (trimField($('#MSPassword').val()) != '') {
                    if (!IsValidPassword($('#MSPassword').val())) {
                        alert('Password must contain eight characters, at least one uppercase letter, one lowercase letter, one number and one special character');
                        $('#MSPassword').focus();
                        return false;
                    }
                }
            }
            debugger;
            if ($("#MSUserName").val() == $("#MSPassword").val()) {
                alert("Username And Password Does Not Be Same");
                $('#MSPassword').focus();
                return false;
            }


            if (trimField($("#MSConfirmPassword").val()) == '') {
                alert("Please Enter Confirm Password");
                $('#MSConfirmPassword').focus();
                return false;
            }
            else if (trimField($("#MSPassword").val()) != trimField($("#MSConfirmPassword").val())) {
                alert("Password And Confirm Password Does Not Match");
                $('#MSConfirmPassword').focus();
                return false;
            }
            else if (trimField($("#MSMobile").val()) == '') {
                alert("Please Enter Mobile Number");
                $('#MSMobile').focus();
                return false;
            } else if ($.trim($('#MSMobile').val().length) != 10) {
                alert('Please Enter Valid Mobile Number');
                $('#MSMobile').focus();
                return false;
            }
            //else if ($("#MSPassword").val().length < 8) {
            //    alert('Password Must Be Minimum 8 Characters Long');
            //    $('#MSPassword').focus();
            //    return false;
            //}
            //if (!usernameMatch($.trim($('#MSUserName').val()), $.trim($('#MSPassword').val()))) {
            //    alert("Username And Password Does Not Be Same");
            //    $('#MSPassword').focus();
            //    return false;
            //}
            //else {
            //    return true;
            //}
            else if (!passwordMatch($.trim($('#MSPassword').val()), $.trim($('#MSConfirmPassword').val()))) {
                alert('Password Not Matched');
                $('#MSConfirmPassword').focus();
                return false;
            }
            if ($('#hdnCollegeId').val() == 697) {
                if (!IsValidEmail($('#registrationEmail').val())) {
                    alert('Please Enter Valid Email Id');
                    $('#registrationEmail').focus();
                    return false;
                }
            }
            else {
                if (trimField($('#MSEmail').val()) != '') {
                    if (!IsValidEmail($('#MSEmail').val())) {
                        alert('Please Enter Valid Email Id');
                        $('#MSEmail').focus();
                        return false;
                    }
                }

            }

            debugger;
            var name = $("#MSUserName").val();
            var password = $("#MSPassword").val();

            var partsOfThreeLetters = name.match(/.{3}/g).concat(
                name.substr(1).match(/.{3}/g),
                name.substr(2).match(/.{3}/g));
            if (new RegExp(partsOfThreeLetters.join("|"), "i").test(password))// true
            {
                alert("Username And Password Does Not Be Same");
                return false;
            }


            $(".loader-container").css("display", "block");
            var jsonData = {
                UserName: $('#MSUserName').val(),
                Password: $('#MSPassword').val(),
                ConfirmPassword: $('#MSConfirmPassword').val(),
                MobileNumber: $('#MSMobile').val(),
                Email: $('#MSEmail').val()
            };

            $.ajax({
                type: 'POST',
                url: '/Registration/MSTeamsRegister',
                data: jsonData,
                //dataType: 'json',
                success: function (response) {
                    $(".loader-container").fadeOut('slow');
                    if (response == 1) {
                        // alert("Username already exist, please choose another username");
                        //popup JS code
                        Swal.fire({
                            text: 'Username already exist, please choose another username'
                        });
                    }
                    else if (response == -99) {
                        //alert("Something went wrong, please try again later");
                        Swal.fire({
                            /*text: 'Something went wrong, please try again later'*/
                            text: 'Registered Successfully!'
                        });
                    }
                    else {
                        Swal.fire({
                            text: 'Registered Successfully! Username and Password Sent On Registered Mobile No.'

                        });
                        $('#myModalteams').modal('hide');
                        //alert("Registered Successfully! Username and Password Sent On Registered Mobile No.");
                        clearRegisterData();
                        $('#divLogin').css('display', 'block');
                        $('#divRegister').css('display', 'none');
                        $('#divForgotPassword').css('display', 'none');
                    }
                },
                error: function () {
                }
            });
        });
        $('#forgotPassord').click(function (e) {
            $('#forgetpasswordtype').val(0);
            e.preventDefault();
            $('#divLogin').css('display', 'none');
            $('#divRegister').css('display', 'none');
            $('#divForgotPassword').css('display', 'block');
        });
        $('#adminforgotPassord').click(function (e) {
            $('#forgetpasswordtype').val(0);
            e.preventDefault();
            $('#divLogin').css('display', 'none');
            $('#divRegister').css('display', 'none');
            $('#forgetpasswordtype').val(1);
            $('#divForgotPassword').css('display', 'block');
        });
        $("#btnGetPassword").click(function (e) {
            if (trimField($("#forgotPasswordUserName").val()) == '') {
                alert("Please Enter Registered Mobile No.");
                $('#forgotPasswordUserName').focus();
                return false;
            }
            $(".loader-container").css("display", "block");
            var form = $('#__AjaxAntiForgeryForm');
            var token = $('input[name="__RequestVerificationToken"]', form).val();
            $.ajax({
                type: 'POST',
                url: '/Registration/GetForgetPassword',
                data: {
                    mobilenumber: $("#forgotPasswordUserName").val(), forgetpasswordtype: $('#forgetpasswordtype').val(), __RequestVerificationToken: token
                },

                //dataType: 'json',
                success: function (response) {
                    $(".loader-container").fadeOut('slow');

                    if (response != 1) {
                        Swal.fire({
                            text: 'Mobile Number Does Not Exist In The System'
                        });
                    }
                    else {
                        Swal.fire({
                            text: 'Credential Sent On Your Registered Mobile Number'
                        });
                        $('#divLogin').css('display', 'block');
                        $('#divRegister').css('display', 'none');
                        $('#divForgotPassword').css('display', 'none');
                    }
                    //if (response != null) {
                    //    if (response.IsUserExist) {                           
                    //        Swal.fire({
                    //            text: 'Mobile Number Does Not Exist In The System'
                    //        });
                    //    }
                    //    else {                           
                    //        Swal.fire({
                    //            text: 'Credential Sent On Your Registered Mobile Number'
                    //        });
                    //        $('#divLogin').css('display', 'block');
                    //        $('#divRegister').css('display', 'none');
                    //        $('#divForgotPassword').css('display', 'none');
                    //    }
                    //}
                    //else {
                    //    //alert("Something went wrong, please try again later");
                    //    Swal.fire({
                    //        text: 'Something went wrong, please try again later'
                    //    });
                    //}
                },
                error: function () {
                }
            });
        });

    };

    function Captcha() {
        var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
        var i;
        for (i = 0; i < 6; i++) {
            var a = alpha[Math.floor(Math.random() * alpha.length)];
            var b = alpha[Math.floor(Math.random() * alpha.length)];
            var c = alpha[Math.floor(Math.random() * alpha.length)];
            var d = alpha[Math.floor(Math.random() * alpha.length)];
            var e = alpha[Math.floor(Math.random() * alpha.length)];
            var f = alpha[Math.floor(Math.random() * alpha.length)];
            var g = alpha[Math.floor(Math.random() * alpha.length)];
        }
        var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
        document.getElementById("mainCaptcha").innerHTML = code
        document.getElementById("mainCaptcha").value = code
    }

    var clearRegisterData = function () {
        $('#registrationUserName').val("");
        $('#registrationPassword').val("");
        $('#registrationConfirmPassword').val("");
        $('#registrationMobileNumber').val("");
        $('#registrationEmail').val("");
    }
    //$('#btnTeamsLogin').click(function () {
    //    $('#MSUserName').val("");
    //    $('#MSPassword').val("");
    //    $('#MSConfirmPassword').val("");
    //    $('#MSMobile').val("");
    //    $('#MSEmail').val("");
    //});
    //$('#closemodal').click(function () {
    //    $('#MSUserName').val("");
    //    $('#MSPassword').val("");
    //    $('#MSConfirmPassword').val("");
    //    $('#MSMobile').val("");
    //    $('#MSEmail').val("");
    //});
    var passwordMatch = function (password, cpassword) {
        return password == cpassword ? true : false;
    }
    var usernameMatch = function (username, password) {
        return username == password ? true : false;
    }
    var IsValidEmail = function (email) {
        if (email == "") {
        }
        else {
            var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (filter.test(email)) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    var IsValidPassword = function (password) {
        if (password == "") {
        }
        else {
            var filter = /^(?=.*?[A-Z]{1,})(?=.*?[a-z]{1,})(?=.*?[0-9]{1,})(?=.*?[#?!@$%^&*-]{1,}).{8,}$/;
            if (filter.test(password)) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    var trimField = function (value) {
        return $.trim(value);
    }
    return {
        Init: init
    };
}();

function removeSpaces(string) {
    return string.split(' ').join('');
}

function GetReferrer() {
    var preUrl = document.referrer;
    if (preUrl == null)
        return "The previous page url is empty";
    else
        return preUrl;
}
