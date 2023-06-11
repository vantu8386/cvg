let form = document.querySelector("#main-form");
let error = "";
let errorContainer = document.querySelector(".error");
let listRegister = JSON.parse(localStorage.getItem("register")) || [];

// Hàm tự sinh ID
function generateID() {
  const maxID = 1000000000; // Giá trị tối đa của ID
  return Math.floor(Math.random() * maxID);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let email = form.email.value;
  let password = form.password.value;
  let nhapLaiPassword = form.nhapLaiPassword.value;
  error = "";
  let checkPassword = password === nhapLaiPassword;

  let passRegex1 =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  let passRegex2 =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  let emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!emailRegex.test(email)) {
    error += "- Email không hợp lệ <br/>";
  }
  if (!passRegex1.test(password)) {
    error += "- Mật khẩu không hợp lệ!! <br/>";
  }
  if (!passRegex2.test(nhapLaiPassword)) {
    error += "- Mật khẩu không hợp lệ!! <br/>";
  }
  if (passRegex1.test(password) && passRegex2.test(nhapLaiPassword) && passRegex1.test(email)) {
    error = "";
  }

  if (listRegister.some(function (user) {
    return user.email === email;
  })) {
    let checkEmail = document.querySelector(".error");
    checkEmail.className = "show";
    document.querySelector("#regiter-error").innerText = "Email này đã có người đăng ký";
    document.querySelector("#regiter-error").style.display = "block";
    setTimeout(() => {
      document.querySelector("#regiter-error").style.display = "none";
    }, 2000);
    return;
  } else if (!checkPassword) {
    let checkPass = document.querySelector(".error");
    checkPass.className = "show";
    document.querySelector("#regiter-error").innerText = "Mật khẩu không khớp, mời nhập lại";
    document.querySelector("#regiter-error").style.display = "block";
    setTimeout(() => {
      document.querySelector("#regiter-error").style.display = "none";
    }, 2000);
    return;
  }

// Trong phần mã JavaScript
if (error) {
  errorContainer.classList.remove("hide");
  errorContainer.innerHTML = error;
} else {
  errorContainer.classList.add("hide");
  errorContainer.innerHTML = error;
  let id = generateID(); // Tự sinh ID mới
  let userRegister = {
      // Gán ID mới cho người đăng ký
      email: email,
      id: id,
      password: password,
      nhapLaiPassword: nhapLaiPassword
  };
  listRegister.push(userRegister);
  localStorage.setItem("register", JSON.stringify(listRegister));
  document.querySelector("#regiter-success").style.display = "block";
  let successMessage = document.querySelector("#regiter-success");
  successMessage.classList.add("showw");
  setTimeout(function () {
      successMessage.style.display = "none";
      window.location.href = "./dangNhap.html";
  }, 2000);
}

});
