document.getElementById('contactForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const nameField = document.getElementById('name') as HTMLInputElement;
    const emailField = document.getElementById('email') as HTMLInputElement;
    const contactNumberField = document.getElementById('contactNumber') as HTMLInputElement;
    const subjectField = document.getElementById('subject') as HTMLInputElement;
    const messageField = document.getElementById('message') as HTMLTextAreaElement;
    let isValid = true;
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
    if (!isValid) return;

    const data = {
        name: nameField.value,
        email: emailField.value,
        contactNumber: contactNumberField.value,
        subject: subjectField.value,
        message: messageField.value
    };
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://67160b5a33bc2bfe40bc21d8.mockapi.io/contacts', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log('Status:', xhr.status); 
            console.log('Response:', xhr.responseText); 
            if (xhr.status === 200|| xhr.status===201) {
                alert('Form Submitted Successfully');
               
                nameField.value = '';
                emailField.value = '';
                contactNumberField.value = '';
                subjectField.value = '';
                messageField.value = '';
            } else {
                alert('Submission Failed. Please try again later.');
            }
        }
    };

   
    xhr.send(JSON.stringify(data));
});

function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function displayErrorState(field: HTMLInputElement | HTMLTextAreaElement, message: string) {
    field.value = ''; 
    field.placeholder = message; 
    field.classList.add('invalid'); 
}

function resetErrorState(field: HTMLInputElement | HTMLTextAreaElement) {
    field.classList.remove('invalid');
    field.placeholder = ''; 
}
