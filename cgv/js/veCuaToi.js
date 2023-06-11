

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

function renderVe(){
    let data = JSON.parse(localStorage.getItem("selectedKhuVuc"));
    let selected = JSON.parse(localStorage.getItem("selectedSeats"));
    let result = `
    <tr>
    <th>Tên Phim</th>
    <th>Khu Vực</th>
    <th>Địa Điểm</th>
    <th>Ngày Xem</th>
    <th>Giờ Xem</th>
    <th>Ghế Của Bạn</th>
    </tr>
    `
    for (let i = 0; i < data.length; i++) {
        result +=
        `
        <tr>
                <td>${data[i].nameFilm}</td>
                <td>${data[i].khuVuc}</td>
                <td>${data[i].diaDiem}</td>
                <td>${data[i].ngayXem}</td>
                <td>${data[i].gioXem}</td>
                <td>${selected}</td>
            </tr>
        `
    }
    document.querySelector('.lichSuGiaoDich table').innerHTML = result;
}
renderVe();


