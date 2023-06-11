
let isLoggedIn = localStorage.getItem("userLoggedIn") === "true";
let logins = JSON.parse(localStorage.getItem("logins"));
if (isLoggedIn) {
  let loginUser = JSON.parse(localStorage.getItem("register"));

  if (loginUser && loginUser.length > 0) {
    let userMail = document.querySelector(".dangNhap");
    let dangXuat = document.querySelector(".dangKi");
    let isLoggedInUser = false;

    for (let i = 0; i < loginUser.length; i++) {
      if (loginUser[i].email === logins[logins.length - 1]) {
        isLoggedInUser = true;
        userMail.innerHTML = "Xin Chào, " + logins[logins.length - 1];
        dangXuat.innerHTML = `<span class="dangXuat" id="dangXuat">Đăng Xuất</span>`;
        break;
      }
    }

    if (!isLoggedInUser) {
      let loginMessage = document.getElementById("login-message");
      loginMessage.innerText = "Vui lòng đăng kí trước khi đăng nhập!";
    }
  } else {
    let loginMessage = document.getElementById("login-message");
    loginMessage.innerText = "Vui lòng đăng kí trước khi đăng nhập!";
  }
} else {
  let loginMessage = document.getElementById("login-message");
  loginMessage.innerText = "Vui lòng đăng kí trước khi đăng nhập!";
}

let dangXuatUser = document.getElementById("dangXuat");
if (dangXuatUser) {
  dangXuatUser.addEventListener("click", function () {
    localStorage.setItem("userLoggedIn", "false");
    localStorage.removeItem("logins");
    window.location.href = "../trangChuCGV.html";
  });
}




let filmListSapChieu = JSON.parse(localStorage.getItem("filmListSapChieu"));
function renderProduct() {
    let result = "";
    // console.log(container);
    for (let i = 0; i < filmListSapChieu.length; i++) {
        result += `
        <div class="list-film-dang-chieu">
          <div class="film">
          <img src="${filmListSapChieu[i].images}" alt="">
          </div>
          <div class="ten-phim">
              <h5>${filmListSapChieu[i].names}</h5>
              <li><b>Thể loại: </b>${filmListSapChieu[i].theLoais}</li>
              <li><b>Thời lượng: </b>${filmListSapChieu[i].thoiLuongs}</li>
              <li><b>Khởi chiếu: </b>${filmListSapChieu[i].khoiChieus}</li>
          </div>
          <div class="lien-he">
                <span><i class="fa-regular fa-thumbs-up"></i>Like <span>0</span></span>
            </div>
        </div>
          `;
    }
    document.querySelector(".film-hay-dang-chieu").innerHTML = result;
}
renderProduct();