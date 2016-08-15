function checkName(value) {
    if (value.trim() == "") {
        document.getElementById('errorname').innerHTML = "This is an invalid name";
    }
    else
        document.getElementById('errorname').innerHTML = "";
}


function checkAddress(value) {
    if (value.trim() == "") {
        document.getElementById('Span3').innerHTML = "This is an invalid Address";
    }
    else
        document.getElementById('Span3').innerHTML = "";
}
function checkComp(value) {
    if (value.trim() == "") {
        document.getElementById('Span8').innerHTML = "This is an invalid name";
    }
    else
        document.getElementById('Span8').innerHTML = "";
}
function checkNum(num) {
    //re = /[0-9]/; re3 = /[A-Z]/; re2 = /[a-z]/;
    //if (!re.test(value))
    //    document.getElementById('Span2').innerHTML = "Phone number must be a numberic value";
    //else if (re.test(value) && !re2.test(value) && !re3.test(value))
    //    document.getElementById('Span2').innerHTML = "";
    var phoneno = /^\d{10}$/;
    if (num.match(phoneno)) {
        document.getElementById('Span2').innerHTML = "";
        return true;
    }
    else {
        document.getElementById('Span2').innerHTML = "Phone number must be a numberic value";
        return false;
    }
}

function checkPwd(value) {
    re = /[0-9]/;
    re2 = /[a-z]/; re3 = /[A-Z]/;
    if (value.length < 6) {
        document.getElementById('Span1').innerHTML = "Password must contain at least six characters!"
        return false;
    } else if (!re.test(value)) {
        document.getElementById('Span1').innerHTML = "Password must contain at least one number (0-9)!";
        return false;
    } else if (!re2.test(value)) {
        document.getElementById('Span1').innerHTML = "Password must contain at least one lowercase letter (a-z)!";
        return false;
    } else if (!re3.test(value)) {
        document.getElementById('Span1').innerHTML = "Password must contain at least one uppercase letter (A-Z)!";
        return false;
    }
    else if (value.length > 6 && re.test(value) && re2.test(value) && re3.test(value))
        document.getElementById('Span1').innerHTML = "";
}
function checkEmail(value) {
    var x = value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
        document.getElementById('Span6').innerHTML = "Not a valid e-mail address";
        return false;
    }
    else
        document.getElementById('Span6').innerHTML = "";
}
function checkPin(num) {
    //re = /[0-9]/; re3 = /[A-Z]/; re2 = /[a-z]/;
    //if (!re.test(value))
    //    document.getElementById('Span4').innerHTML = "Pin code must be a numberic value";
    //else if (re.test(value) && !re2.test(value) && !re3.test(value))
    //    document.getElementById('Span4').innerHTML = "";
    var phoneno = /^\d{6}$/;
    if (num.match(phoneno)) {
        document.getElementById('Span4').innerHTML = "";
        return true;
    }
    else {
        document.getElementById('Span4').innerHTML = "Pin code must be a numberic value";
        return false;
    }
}

function checkPan(value) {
    re = /[0-9]/; re3 = /[A-Z]/; re2 = /[a-z]/;
    if ((re.test(value) && re2.test(value)) || (re.test(value) && re3.test(value)))
        document.getElementById('Span7').innerHTML = ""
    else
        document.getElementById('Span7').innerHTML = "Pan number must be an alphanumeric";
}

function checkFax(num) {
    var phoneno = /^\d{10}$/;
    if (num.match(phoneno)) {
        document.getElementById('Span9').innerHTML = "";
        return true;
    }
    else {
        document.getElementById('Span9').innerHTML = "Fax no must be a numberic value";
        return false;
    }
}

function checkAdhaar(value) {
    re = /[0-9]/; re3 = /[A-Z]/; re2 = /[a-z]/;
    if ((re.test(value) && re2.test(value)) || (re.test(value) && re3.test(value)))
        document.getElementById('Span10').innerHTML = ""
    else
        document.getElementById('Span10').innerHTML = "Adhaar number must be an alphanumeric";
}