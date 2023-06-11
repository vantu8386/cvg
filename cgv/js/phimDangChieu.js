

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


// ----------------------------------------

let listProducts = JSON.parse(localStorage.getItem("filmList"));
function renderProduct() {
    let result = "";
    // console.log(container);
    for (let i = 0; i < listProducts.length; i++) {
        result += `
        <div class="list-film-dang-chieu">
          <div class="film">
          <img src="${listProducts[i].image}" alt="">
          </div>
          <div class="ten-phim">
              <h5>${listProducts[i].name}</h5>
              <li><b>Thể loại:</b>${listProducts[i].theLoai}</li>
              <li><b>Thời lượng</b>${listProducts[i].thoiLuong}</li>
              <li><b>Khởi chiếu</b>${listProducts[i].khoiChieu}</li>
          </div>
          <div class="lien-he">
              <span><i class="fa-regular fa-thumbs-up"></i>Like 0</span>
              <span class="btn-mua-ve"><img src="../image/bg-cate-booking.png" alt=""> MUA VÉ</span>
          </div>
        </div>
          `;
    }
    document.querySelector(".film-hay-dang-chieu").innerHTML = result;
}
renderProduct();


let btnMuaVe = document.querySelectorAll(".btn-mua-ve");
let myOverlay = document.querySelector("#myOverlay");
let closebtn = document.querySelector(".closebtn");

btnMuaVe.forEach(function (btnMuaVe) {
  btnMuaVe.addEventListener("click", function () {
    myOverlay.style.display = "block";
  });
});

closebtn.addEventListener("click", function () {
  myOverlay.style.display = "none";
});

// Xử lý sự kiện cho các phần tử lịch, khu vực, và giờ xem
let lichItems = document.querySelectorAll(".lich");
let khuVucItems = document.querySelectorAll(".khuVuc");
let gioXemItems = document.querySelectorAll(".gioXem");
let selectedLich = null;
for (let i = 0; i < lichItems.length; i++) {
  lichItems[i].addEventListener("click", function () {
    lichItems.forEach(function (item) {
      item.classList.remove("active");
    });
    this.classList.add("active");
    selectedLich = this.textContent;
    // localStorage.setItem("selectedDay", selectedLich);
  });
}

khuVucItems.forEach(function (item) {
  item.addEventListener("click", function () {
    khuVucItems.forEach(function (item) {
      item.classList.remove("active");
    });
    this.classList.add("active");
  });
});

gioXemItems.forEach(function (item) {
  item.addEventListener("click", function () {
    gioXemItems.forEach(function (item) {
      item.classList.remove("active");
    });
    this.classList.add("active");
  });
});

let khuVucHaNoi = document.querySelector(".khuVucHaNoi");
let khuVucHCM = document.querySelector(".khuVucHCM");
let khuVucCanTho = document.querySelector(".khuVucCanTho");
let haNoi = document.querySelector(".haNoi");
let hcm = document.querySelector(".hcm");
let canTho = document.querySelector(".canTho");
let tenPhimElement = document.querySelector(".nameFilm");
let tenPhim = tenPhimElement ? tenPhimElement.textContent : "";


let haNoiPhanTu = haNoi.querySelectorAll("p");
let hcmPhanTu = hcm.querySelectorAll("p");
let canThoPhanTu = canTho.querySelectorAll("p");

let selectedKhuVuc = "";
let selectedGioXem = "";

khuVucHaNoi.addEventListener("click", function () {
  haNoi.style.display = "block";
  hcm.style.display = "none";
  canTho.style.display = "none";
  selectedKhuVuc = "Hà Nội";
});

khuVucHCM.addEventListener("click", function () {
  haNoi.style.display = "none";
  hcm.style.display = "block";
  canTho.style.display = "none";
  selectedKhuVuc = "Hồ Chí Minh";
});

khuVucCanTho.addEventListener("click", function () {
  haNoi.style.display = "none";
  hcm.style.display = "none";
  canTho.style.display = "block";
  selectedKhuVuc = "Cần Thơ";
});

// Xử lý sự kiện khi chọn giờ xem phim
let gioXemPhim = document.querySelectorAll(".gioXem");

gioXemPhim.forEach(function (gioXem) {
  gioXem.addEventListener("click", function () {
    selectedGioXem = gioXem.textContent;
    showConfirmationDialog();
  });
});

// Hiển thị hộp thoại xác nhận
function showConfirmationDialog() {
  let confirmation = confirm(
    "Bạn có muốn đặt vé lịch " +
    selectedGioXem +
    " tại " +
    selectedKhuVuc +
    " không?"
  );

  if (confirmation) {
    let selectedMovieTheater = "";

    if (selectedKhuVuc === "Hà Nội") {
      selectedMovieTheater = haNoi.querySelector(".haNoi-cgv").textContent;
    } else if (selectedKhuVuc === "Hồ Chí Minh") {
      selectedMovieTheater = hcm.querySelector(".hcm-cgv").textContent;
    } else if (selectedKhuVuc === "Cần Thơ") {
      selectedMovieTheater = canTho.querySelector(".canTho-cgv").textContent;
    }

    let mang = [];
    let thongtin = {
      nameFilm: tenPhim,
      khuVuc: selectedKhuVuc,
      diaDiem: selectedMovieTheater,
      ngayXem: selectedLich,
      gioXem: selectedGioXem
    };
    mang.push(thongtin);

    localStorage.setItem("selectedKhuVuc", JSON.stringify(mang));
    window.location.href = "./muaVe.html";
  } else {
    alert("Đã hủy đặt vé");
  }
}


