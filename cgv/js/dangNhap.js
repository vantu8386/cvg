
let form = document.querySelector("#main-form");
let errorContainer = document.querySelector(".error");
let successMessage = document.getElementById("regiter-success");
let errorMessage = document.getElementById("regiter-error");
let saveLocal = JSON.parse(localStorage.getItem("register")) || [];

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let email = form.email.value;
    let password = form.password.value;
    let passRegex1 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailRegex.test(email)) {
        errorContainer.style.display = "block";
        errorMessage.innerText = "Email không hợp lệ";
        return;
    }

    if (!passRegex1.test(password)) {
        errorContainer.style.display = "block";
        errorMessage.innerText = "Mật khẩu không hợp lệ";
        return;
    }

    errorContainer.style.display = "none";

    let user = saveLocal.find(function (user) {
        return user.email === email && user.password === password;
    });

if (user) {
    let logins = JSON.parse(localStorage.getItem('logins')) || [];
    logins.push(user.email);
    localStorage.setItem("logins", JSON.stringify(logins));
    localStorage.setItem("userLoggedIn", "true");
    successMessage.style.display = "block";
    
    setTimeout(function() {
        window.location.href = "../trangChuCGV.html";
    }, 2000);
} else {
    errorContainer.style.display = "block";
    errorMessage.innerText = "Email hoặc mật khẩu không chính xác";
}

});
