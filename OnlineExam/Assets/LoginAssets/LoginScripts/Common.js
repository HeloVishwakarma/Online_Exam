var RenderDropDown = function(control, data, id, value) {
	data = sortResults(data, value, true);
	control.empty();
	$.each(data, function() {
		control.append($("<option />").val(this[id]).text(this[value]));

	});
	control.prepend($("<option selected='selected' />").val(0).text("Please Select"));
};

function ConvertDate(jSonDate) {
	var dateString = jSonDate.substr(6);
	var currentTime = new Date(parseInt(dateString));
	var month = ('0' + (currentTime.getMonth() + 1)).slice(-2);
	var day = ('0' + (currentTime.getDate())).slice(-2);
	var year = currentTime.getFullYear();
	var date = day + "/" + month + "/" + year;

	return date;
};
var RenderDropDownWithOther = function(control, data, id, value) {
	data = sortResults(data, value, true);
	control.empty();
	$.each(data, function() {
		control.append($("<option />").val(this[id]).text(this[value]));
	});
	control.prepend($("<option selected='selected' />").val(0).text("Please Select"));
	control.append($("<option/>").val(-999).text("Other"));
};

var sortResults = function(data, prop, asc) {
	data.sort(function(a, b) {
		if (asc) {
			return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
		} else {
			return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
		}
	});
	return data;
}

//Validation for Checking Numeric (Number noly) value
function IsNumeric(evt) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
};


function CheckValidPassword(password) {
	var upperCase = new RegExp('[A-Z]');
	var lowerCase = new RegExp('[a-z]');
	var numbers = new RegExp('[0-9]');
	var special = new RegExp("^[a-zA-Z0-9]+$");

	if (($.trim(password).length >= 6) && password.match(upperCase) && password.match(lowerCase) && password.match(numbers) && !special.test(password)) {
		return true;
	} else {
		return false;
	}
};

//function IsFloatNumber(evt) {
//    if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
//        event.preventDefault();
//    }
//};

function isFloatNumber(event) {
	if (event.which == 8 || event.keyCode == 39 || event.keyCode == 46)
		return true;

	else if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57))
		event.preventDefault();
};

var IsValidEmail = function(email) {
	if (email == "") {} else {
		var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		if (filter.test(email)) {
			return true;
		} else {
			return false;
		}
	}
}

function isCharacters(e) {
	var regex = new RegExp(/^[a-zA-Z\s]+$/);
	var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
	if (regex.test(str) || e.which == 8 || e.keyCode == 39 || e.keyCode == 46) {
		return true;
	} else {
		e.preventDefault();
		return false;
	}
};

function isCharacterWithComma(e) {
	var regex = new RegExp(/^[a-zA-Z\s]+$/);
	var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
	if (regex.test(str) || e.which == 8 || e.keyCode == 39 || e.keyCode == 46 || e.keyCode == 44) {
		return true;
	} else {
		e.preventDefault();
		return false;
	}
};

function isAlphanumeric(e) {
	var regex = new RegExp(/^[a-zA-Z0-9 ]+$/);
	var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
	if ($("input:focused").is(".enrollmentNo")) {
		regex = new RegExp(regex.source + "|\/");
	}
	if (regex.test(str)) {
		return true;
	} else {
		e.preventDefault();
		return false;
	}
};

function removeBlankSpace(e) {
	if (e.which == 32)
		return false;
}

var GetLogOutUrl = function() {
	return "/StudentLogin/Index/";
}


var GoBack = function() {
	window.history.pushState(null, "", window.location.href);
	window.onpopstate = function() {
		window.history.pushState(null, "", window.location.href);
	};
}

function StudentApproval() {
	$("#StudentApprovalModal").modal("toggle");
}

function CreateUser() {
	$("#CreateUserModal").modal("toggle");
}

function ClearMessage() {
	$('#warning').css('display', 'none');
	$('#success').css('display', 'none');
	$('#danger').css('display', 'none');
	$('#update').css('display', 'none');
	$('#DivAlertMsg').hide();
	$(".loader-container").fadeOut('slow');
}

function ToggleSaved(data) {
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

function UpdateStudentApproval() {
	$("#btnSubmit").prop("disabled", "disabled");
	$(".loader-container").css("display", "block");
	var formData = {
		StudentApproval: $('#chkIsStudentApproval').is(":checked")
	};

	$.ajax({
		url: "/Admin/CollegeConfiguration/StudentApproval",
		type: "POST",
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(formData),
		success: function(data) {
			ToggleSaved(data);
			var value = parseInt(data);
			$('#DivAlertMsg').show();
			switch (value) {
				case 1:
					alert("Update Sucessfully.")
					break;
				default:
					if (value > 1)
						alert("Someting with Wrong?")
			}
			$('#btnCancel').click();
			$(".loader-container").fadeOut('slow');
		}
	});
}

function GetCollegeConfig() {
	$.ajax({
		url: "/Admin/CollegeConfiguration/GetCollegeConfig",
		type: "Get",
		dataType: "json",
		success: function(rowData) {
			if (rowData.StudentApproval == true) {
				$("#chkIsStudentApproval").prop('checked', true);
			} else {
				$("#chkIsStudentApproval").prop('checked', false);
			}
		}
	});
}