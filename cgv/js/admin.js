function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}


// Quản lý phim
const fileInput = document.getElementById('fileInput');
const image = document.getElementById('image');
const nameInput = document.getElementById('name');
const theLoaiInput = document.getElementById('theLoai');
const thoiLuongInput = document.getElementById('thoiLuong');
const khoiChieuInput = document.getElementById('khoiChieu');
const urlInput = document.getElementById('url');
const addFilm = document.getElementById('addFilm');
addFilm.addEventListener("click", function () {
    // Lấy giá trị từ các input
    const file = fileInput.files[0];
    const name = nameInput.value;
    const theLoai = theLoaiInput.value;
    const thoiLuong = thoiLuongInput.value;
    const khoiChieu = khoiChieuInput.value;
    const url = urlInput.value;

    // Kiểm tra xem có giá trị đủ để thêm sản phẩm hay không
    if (file && name !== "" && url !== "") {
        // Tạo đối tượng FileReader để đọc file hình ảnh
        const reader = new FileReader();
        reader.onload = function (e) {
            // Khi file hình ảnh được đọc thành công
            // Lưu đường dẫn hình ảnh vào biến imageUrl
            const imageUrl = e.target.result;

            // Tạo đối tượng sản phẩm
            const film = {
                image: imageUrl,
                name: name,
                theLoai: theLoai,
                thoiLuong: thoiLuong,
                khoiChieu: khoiChieu,
                url: url
            };

            // Lấy danh sách sản phẩm từ localStorage (nếu có)
            let filmList = JSON.parse(localStorage.getItem("filmList"));
            if (filmList === null) {
                filmList = [];
            }

            // Thêm sản phẩm vào danh sách
            filmList.push(film);

            // Lưu danh sách sản phẩm vào localStorage
            localStorage.setItem("filmList", JSON.stringify(filmList));

            // Reset các input
            fileInput.value = "";
            image.src = "";
            nameInput.value = "";
            theLoaiInput.value = "";
            thoiLuongInput.value = "";
            khoiChieuInput.value = "";
            urlInput.value = "";

            // Hiển thị danh sách sản phẩm
            renderFilmList();
        };
        reader.readAsDataURL(file); // Đọc file dưới dạng URL dữ liệu
    }
});

// Hàm hiển thị danh sách sản phẩm
function renderFilmList() {
    const filmList = JSON.parse(localStorage.getItem("filmList"));

    // Kiểm tra xem có sản phẩm trong danh sách hay không
    if (filmList === null || filmList.length === 0) {
        document.getElementById('table').innerHTML = "<p>Không có sản phẩm.</p>";
        return;
    }

    let result =
        `
        <tr>
            <th>STT</th>
            <th>Product image</th>
            <th>Product name</th>
            <th>Thể loại</th>
            <th>Khởi chiếu</th>
            <th>Thời lượng</th>
            <th>Link</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
    `;

    for (let i = 0; i < filmList.length; i++) {
        result +=
            `
            <tr>
                <td>${i + 1}</td>
                <td><img src="${filmList[i].image}" alt="Product image" style="width: 50px;"></td>
                <td>${filmList[i].name}</td>
                <td>${filmList[i].theLoai}</td>
                <td>${filmList[i].thoiLuong}</td>
                <td>${filmList[i].khoiChieu}</td>
                <td>
                     <a href="${filmList[i].url}" target="_blank" rel="noopener noreferrer">Link</a>
                </td>
                <td>
                    <button onclick="editFilm(${i})">Edit</button>
                </td>
                <td>
                    <button onclick="deleteFilm(${i})" style="background-color: red; color: white; border: none;">Delete</button>
                </td>
            </tr>
        `;
    }

    document.getElementById('table').innerHTML = result;
}

// Hàm xóa sản phẩm
function deleteFilm(index) {
    const filmList = JSON.parse(localStorage.getItem("filmList"));

    // Kiểm tra xem có sản phẩm trong danh sách hay không
    if (filmList === null || filmList.length === 0) {
        return;
    }

    // Xóa sản phẩm khỏi danh sách theo chỉ số
    filmList.splice(index, 1);

    // Lưu danh sách sản phẩm đã được xóa vào localStorage
    localStorage.setItem("filmList", JSON.stringify(filmList));

    // Hiển thị lại danh sách sản phẩm
    renderFilmList();
}

// Hàm sửa sản phẩm
function editFilm(index) {
    const filmList = JSON.parse(localStorage.getItem("filmList"));

    // Kiểm tra xem có sản phẩm trong danh sách hay không
    if (filmList === null || filmList.length === 0) {
        return;
    }

    // Lấy sản phẩm cần sửa từ danh sách
    const film = filmList[index];

    // Đổ dữ liệu của sản phẩm lên các input
    fileInput.value = "";
    image.src = film.image;
    nameInput.value = film.name;
    theLoaiInput.value = film.theLoai;
    thoiLuongInput.value = film.thoiLuong;
    khoiChieuInput.value = film.khoiChieu;
    urlInput.value = film.url;

    // Xóa sản phẩm khỏi danh sách theo chỉ số
    filmList.splice(index, 1);

    // Lưu danh sách sản phẩm đã được sửa vào localStorage
    localStorage.setItem("filmList", JSON.stringify(filmList));

    // Hiển thị lại danh sách sản phẩm
    renderFilmList();
}

// Hiển thị danh sách sản phẩm khi trang web được tải
renderFilmList();




// ------------------------------------------------



// Quản lý phim sắp chiếu
const fileInputs = document.getElementById('fileInputs');
const images = document.getElementById('images');
const nameInputs = document.getElementById('names');
const theLoaiInputs = document.getElementById('theLoais');
const thoiLuongInputs = document.getElementById('thoiLuongs');
const khoiChieuInputs = document.getElementById('khoiChieus');
const addFilms = document.getElementById('addFilms');

addFilms.addEventListener("click", function () {
    const files = fileInputs.files[0];
    const names = nameInputs.value;
    const theLoais = theLoaiInputs.value;
    const thoiLuongs = thoiLuongInputs.value;
    const khoiChieus = khoiChieuInputs.value;

    if (files && names !== "") {
        const readerFilm = new FileReader();
        readerFilm.onload = function (e) {
            const imageUrlFilm = e.target.result;

            const films = {
                images: imageUrlFilm,
                names: names,
                theLoais: theLoais,
                thoiLuongs: thoiLuongs,
                khoiChieus: khoiChieus,
            };

            let filmListSapChieu = JSON.parse(localStorage.getItem("filmListSapChieu"));
            if (filmListSapChieu === null) {
                filmListSapChieu = [];
            }

            filmListSapChieu.push(films);

            localStorage.setItem("filmListSapChieu", JSON.stringify(filmListSapChieu));

            fileInputs.value = "";
            images.src = "";
            nameInputs.value = "";
            theLoaiInputs.value = "";
            thoiLuongInputs.value = "";
            khoiChieuInputs.value = "";

            renderFilmListSapChieu();
        };
        readerFilm.readAsDataURL(files);
    }
});

function renderFilmListSapChieu() {
    const filmListSapChieu = JSON.parse(localStorage.getItem("filmListSapChieu"));

    if (filmListSapChieu === null || filmListSapChieu.length === 0) {
        document.getElementById('tables').innerHTML = "<p>Không có phim.</p>";
        return;
    }

    let results =
        `
            <tr>
                <th>STT</th>
                <th>Hình ảnh</th>
                <th>Tên phim</th>
                <th>Thể loại</th>
                <th>Khởi chiếu</th>
                <th>Thời lượng</th>
                <th>Sửa</th>
                <th>Xóa</th>
            </tr>
        `;

    for (let i = 0; i < filmListSapChieu.length; i++) {
        results +=
            `
                <tr>
                    <td>${i + 1}</td>
                    <td><img src="${filmListSapChieu[i].images}" alt="Hình ảnh" style="width: 50px;"></td>
                    <td>${filmListSapChieu[i].names}</td>
                    <td>${filmListSapChieu[i].theLoais}</td>
                    <td>${filmListSapChieu[i].khoiChieus}</td>
                    <td>${filmListSapChieu[i].thoiLuongs}</td>
                    <td>
                        <button onclick="editFilmSapChieu(${i})">Sửa</button>
                    </td>
                    <td>
                        <button onclick="deleteFilmSapChieu(${i})">Xóa</button>
                    </td>
                </tr>
            `;
    }

    document.getElementById('tables').innerHTML = results;
}

function deleteFilmSapChieu(index) {
    let filmListSapChieu = JSON.parse(localStorage.getItem("filmListSapChieu"));

    if (filmListSapChieu === null || filmListSapChieu.length === 0) {
        return;
    }

    filmListSapChieu.splice(index, 1);

    localStorage.setItem("filmListSapChieu", JSON.stringify(filmListSapChieu));

    renderFilmListSapChieu();
}

function editFilmSapChieu(index) {
    let filmListSapChieu = JSON.parse(localStorage.getItem("filmListSapChieu"));

    if (filmListSapChieu === null || filmListSapChieu.length === 0) {
        return;
    }

    const films = filmListSapChieu[index];

    fileInputs.value = "";
    images.src = films.images;
    nameInputs.value = films.names;
    theLoaiInputs.value = films.theLoais;
    thoiLuongInputs.value = films.thoiLuongs;
    khoiChieuInputs.value = films.khoiChieus;

    const updatedFilm = {
        images: films.images,
        names: nameInputs.value,
        theLoais: theLoaiInputs.value,
        thoiLuongs: thoiLuongInputs.value,
        khoiChieus: khoiChieuInputs.value,
    };

    filmListSapChieu[index] = updatedFilm;

    localStorage.setItem("filmListSapChieu", JSON.stringify(filmListSapChieu));

    renderFilmListSapChieu();
}

renderFilmListSapChieu();


// ----------------Quản lý user------------------

let quanLyUser = JSON.parse(localStorage.getItem("register")) || [];
let loggedInUsers = JSON.parse(localStorage.getItem("logins")) || {};

function renderUser() {
  let result = `
    <tr>
      <th>STT</th>
      <th>Email</th>
      <th>ID User</th>
      <th>Trạng Thái Hoạt Động</th>
      <th>Delete</th>
    </tr>
  `;

  for (let i = 0; i < quanLyUser.length; i++) {
    result += `
      <tr>
        <td>${i + 1}</td>
        <td>${quanLyUser[i].email}</td>
        <td>${quanLyUser[i].id}</td>
        <td>
          <select class="status" onchange="changeStatus(${i}, this)">
            <option value="true" ${quanLyUser[i].status === true ? "selected" : ""}>true</option>
            <option value="false" ${quanLyUser[i].status === false ? "selected" : ""}>false</option>
          </select>
        </td>
        <td><button onclick="deleteUser(${i})">Delete</button></td>
      </tr>
    `;
  }

  document.querySelector(".quanLyUser").innerHTML = result;
}

renderUser();

function deleteUser(index) {
  if (index >= 0 && index < quanLyUser.length) {
    let userEmail = quanLyUser[index].email;
    quanLyUser.splice(index, 1);

    delete loggedInUsers[userEmail];

    localStorage.setItem("register", JSON.stringify(quanLyUser));
    localStorage.setItem("logins", JSON.stringify(loggedInUsers));
    renderUser();
  }
}

function changeStatus(index, selectElement) {
  if (index >= 0 && index < quanLyUser.length) {
    let selectedValue = selectElement.value;
    quanLyUser[index].status = selectedValue === "true";
  
    let userEmail = quanLyUser[index].email;
    loggedInUsers[userEmail] = selectedValue === "true";
  
    localStorage.setItem("register", JSON.stringify(quanLyUser));
    localStorage.setItem("logins", JSON.stringify(loggedInUsers));
    renderUser();
  
    if (selectedValue === "false") {
      localStorage.setItem("userLoggedIn", "false");
      localStorage.removeItem("logins");
    } else if (selectedValue === "true") {
      localStorage.setItem("userLoggedIn", "true");
    }
  }
}

