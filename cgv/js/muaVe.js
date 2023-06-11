
document.addEventListener("DOMContentLoaded", function () {
    const seats = document.querySelectorAll('.row .seat:not(.occupied)');
    const count = document.getElementById('count');
    const total = document.getElementById('total');
    const movieSelect = document.getElementById('movie');
    const button = document.querySelector('button');

    let ticketPrice = +movieSelect.value;

    // Lưu lại index và giá tiền của ghế được chọn
    function setMovieData(movieIndex, moviePrice) {
        localStorage.setItem('selectedMovieIndex', movieIndex);
        localStorage.setItem('selectedMoviePrice', moviePrice);
    }

    // Cập nhật tổng số ghế và giá tiền
    function updateSelectedCount() {
        const selectedSeats = document.querySelectorAll('.row .seat.selected');

        const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

        localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

        const selectedSeatsCount = selectedSeats.length;

        count.innerText = selectedSeatsCount;
        total.innerText = selectedSeatsCount * ticketPrice;

        setMovieData(movieSelect.selectedIndex, movieSelect.value);
    }

    // Lấy dữ liệu từ local storage và cập nhật giao diện
    function populateUI() {
        const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

        if (selectedSeats !== null && selectedSeats.length > 0) {
            seats.forEach((seat, index) => {
                if (selectedSeats.indexOf(index) > -1) {
                    seat.classList.add('selected');
                }
            });
        }

        const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

        if (selectedMovieIndex !== null) {
            movieSelect.selectedIndex = parseInt(selectedMovieIndex);
            ticketPrice = +movieSelect.value;
        }
    }

    // Sự kiện chọn phim
    movieSelect.addEventListener('change', e => {
        ticketPrice = +e.target.value;
        setMovieData(e.target.selectedIndex, e.target.value);
        updateSelectedCount();

        // Kiểm tra và bỏ chọn các ghế không phù hợp với giá tiền
        seats.forEach(seat => {
            const seatPrice = parseInt(seat.getAttribute('data-price'));
            if (seatPrice !== ticketPrice) {
                seat.classList.remove('selected');
            }
        });
    });

    // Sự kiện click ghế
    document.addEventListener('click', e => {
        if (
            e.target.classList.contains('seat') &&
            !e.target.classList.contains('occupied')
        ) {
            const seatPrice = parseInt(e.target.getAttribute('data-price'));
            if (seatPrice === ticketPrice) {
                e.target.classList.toggle('selected');
                updateSelectedCount();
            } else {
                alert('Vui lòng chọn ghế có giá tiền tương ứng.');
            }
        }
    });

    updateSelectedCount();
    populateUI();

    button.addEventListener('click', () => {
        const selectedSeats = document.querySelectorAll('.row .seat.selected');

        if (selectedSeats.length === 0) {
            alert('Vui lòng chọn ít nhất một ghế.');
            return;
        }

        selectedSeats.forEach(seat => {
            seat.classList.remove('selected');
            seat.classList.add('occupied');
        });

        // Chuyển sang trang vé của tôi
        window.location.href = '../html/veCuaToi.html';
    });
});

  