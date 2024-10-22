var _a;
(_a = document.getElementById('contactForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    var nameField = document.getElementById('name');
    var emailField = document.getElementById('email');
    var contactNumberField = document.getElementById('contactNumber');
    var subjectField = document.getElementById('subject');
    var messageField = document.getElementById('message');
    var isValid = true;
    resetErrorState(nameField);
    resetErrorState(emailField);
    resetErrorState(contactNumberField);
    resetErrorState(subjectField);
    resetErrorState(messageField);
    if (nameField.value.trim() === '') {
        displayErrorState(nameField, 'Name is Required');
        isValid = false;
    }
    if (emailField.value.trim() === '' || !validateEmail(emailField.value.trim())) {
        displayErrorState(emailField, 'Valid Email is Required');
        isValid = false;
    }
    if (contactNumberField.value.trim() === '') {
        displayErrorState(contactNumberField, 'Mobile number is Required');
        isValid = false;
    }
    if (subjectField.value.trim() === '') {
        displayErrorState(subjectField, 'Subject is Required');
        isValid = false;
    }
    if (messageField.value.trim() === '') {
        displayErrorState(messageField, 'Message is Required');
        isValid = false;
    }
    if (!isValid)
        return;
    var data = {
        name: nameField.value,
        email: emailField.value,
        contactNumber: contactNumberField.value,
        subject: subjectField.value,
        message: messageField.value
    };
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://67160b5a33bc2bfe40bc21d8.mockapi.io/contacts', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log('Status:', xhr.status);
            console.log('Response:', xhr.responseText);
            if (xhr.status === 200 || xhr.status === 201) {
                alert('Form Submitted Successfully');
                nameField.value = '';
                emailField.value = '';
                contactNumberField.value = '';
                subjectField.value = '';
                messageField.value = '';
            }
            else {
                alert('Submission Failed. Please try again later.');
            }
        }
    };
    xhr.send(JSON.stringify(data));
});
function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function displayErrorState(field, message) {
    field.value = '';
    field.placeholder = message;
    field.classList.add('invalid');
}
function resetErrorState(field) {
    field.classList.remove('invalid');
    field.placeholder = '';
}
