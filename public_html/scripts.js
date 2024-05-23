function validation() {
    event.preventDefault();

    var inputName = document.getElementById('inputName');
    var inputEmail = document.getElementById('inputEmail');
    var inputPhone = document.getElementById('inputPhone');
    var inputEnquiry = document.getElementById('inputEnquiry');

    var nameCheck = document.getElementById('nameCheck');
    var emailCheck = document.getElementById('emailCheck');
    var phoneCheck = document.getElementById('phoneCheck');
    var enquiryCheck = document.getElementById('enquiryCheck');

    var [nameCheckResult, nameMsg] = checkName(inputName.value);
    var [emailCheckResult, emailMsg] = checkEmail(inputEmail.value);
    var [phoneCheckResult, phoneMsg] = checkPhone(inputPhone.value);
    var [enquiryCheckResult, enquiryMsg] = checkEnquiry(inputEnquiry.value);

    if (nameCheckResult) {
        nameCheck.classList.add('text-success');
        nameCheck.classList.remove('text-danger');
        nameCheck.innerHTML = nameMsg;
    } else {
        nameCheck.classList.add('text-danger');
        nameCheck.classList.remove('text-success');
        nameCheck.innerHTML = nameMsg;
    }

    if (emailCheckResult) {
        emailCheck.classList.add('text-success');
        emailCheck.classList.remove('text-danger');
        emailCheck.innerHTML = emailMsg;
    } else {
        emailCheck.classList.add('text-danger');
        emailCheck.classList.remove('text-success');
        emailCheck.innerHTML = emailMsg;
    }

    if (phoneCheckResult) {
        phoneCheck.classList.add('text-success');
        phoneCheck.classList.remove('text-danger');
        phoneCheck.innerHTML = phoneMsg;
    } else {
        phoneCheck.classList.add('text-danger');
        phoneCheck.classList.remove('text-success');
        phoneCheck.innerHTML = phoneMsg;
    }

    if (enquiryCheckResult) {
        enquiryCheck.classList.add('text-success');
        enquiryCheck.classList.remove('text-danger');
        enquiryCheck.innerHTML = enquiryMsg;
    } else {
        enquiryCheck.classList.add('text-danger');
        enquiryCheck.classList.remove('text-success');
        enquiryCheck.innerHTML = enquiryMsg;
    }

    if (nameCheckResult && emailCheckResult && phoneCheckResult && enquiryCheckResult) {
        console.log(inputName.value + inputEmail.value + inputPhone.value + inputEmail.value);
        
        
        data = {name: inputName.value,
                email: inputEmail.value,
                phone: inputPhone.value,
                enquiry: inputEnquiry.value
            }

        console.log(JSON.stringify(data));
        
        fetch("/enquiry", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(res => {
            console.log("Successfully sent enquiry!")
        })
    }
}

function checkName(inputName) {
    var isValid;
    var message;

    if (inputName == '') {
        isValid = false;
        message = 'You did not enter your name';
    } else {
        isValid = true;
        message = 'Valid';
    }

    return [isValid, message]
}

function checkEmail(inputEmail) {
    var isValid;
    var message;

    if (inputEmail.search('@') == -1) {
        isValid = false;
        message = "Invalid email address";
    } else {
        isValid = true;
        message = 'Valid';
    }

    return [isValid, message]
}

function checkPhone(inputPhone) {
    var isValid;
    var message;
    var nonDigitIndex;

    if (inputPhone.length != 10) {
        isValid = false;
        message = "Phone number must be exactly 10 digits";
    } else if (/\D/.test(inputPhone)) {
        isValid = false;
        nonDigitIndex = inputPhone.search(/\D/);
        message = `Contains character '${inputPhone[nonDigitIndex]}'. Number only!`;
        console.log(nonDigitIndex);
    } else {
        isValid = true;
        message = 'Valid';
    }

    return [isValid, message]
}

function checkEnquiry(inputEnquiry) {
    var isValid;
    var message;

    if (inputEnquiry == '') {
        isValid = false;
        message = 'You did not enter the enquiry';
    } else {
        isValid = true;
        message = 'Valid';
    }

    return [isValid, message]
}