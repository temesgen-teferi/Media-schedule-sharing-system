const signUp = e => {
    let fname = document.getElementById('fname').value,
        lname = document.getElementById('lname').value,
        email = document.getElementById('email').value,
        pwd = document.getElementById('pwd').value;

    let formData = JSON.parse(localStorage.getItem('formData')) || [];

    let exist = formData.length &&
        JSON.parse(localStorage.getItem('formData')).some(data =>
            data.fname.toLowerCase() == fname.toLowerCase() &&
            data.lname.toLowerCase() == lname.toLowerCase()
        );

    if (!exist) {
        formData.push({ fname, lname, email, pwd });
        localStorage.setItem('formData', JSON.stringify(formData));
        document.querySelector('form').reset();
        document.getElementById('fname').focus();
        alert("Account Created.\n\nPlease sign In using the link below.");
    }
    else {
        alert("sry...Duplicate found!!\nYou have already signed up");
    }
    e.preventDefault();
}

const signIn = e => {
    let email = document.getElementById('email').value, pwd = document.getElementById('pwd').value;
    let formData = JSON.parse(localStorage.getItem('formData')) || [];
    let exist = formData.length &&
        JSON.parse(localStorage.getItem('formData')).some(data => data.email.toLowerCase() === email && data.pwd.toLowerCase() === pwd);

    let admin = formData.length &&
        "temesgenteferi19@gmail.com" === email && "1234" === pwd;

    if (admin) {
        location.href = "index-admin.html";
    }
    else if (exist) {
        location.href = "index-user.html";
    }
    else if (!exist && !admin) {
        alert("Incorrect login credentials");
    }
    else {
        alert("invalid attempt!!")
    }

    e.preventDefault();
}

