$(document).ready(function () {
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');
    if (togglePassword) {
        togglePassword.addEventListener('click', function (e) {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            console.log(type);
            password.setAttribute('type', type);
            this.classList.toggle('icon-eye-blocked');
        });
    }
});

$(document).ready(function () {
    const togglePassword = document.querySelector('#toggleNewPassword');
    const password = document.querySelector('#newPassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', function (e) {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            this.classList.toggle('icon-eye-blocked');
        });
    }
});

$(document).ready(function () {
    const togglePassword = document.querySelector('#toggleConfirmPassword');
    const password = document.querySelector('#confirmPassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', function (e) {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            this.classList.toggle('icon-eye-blocked');
        });
    }
});
