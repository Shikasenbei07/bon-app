document.getElementById("calc-btn").addEventListener("click", calc);

function calc() {
    let hours = parseFloat(document.getElementById("hours").value) || 0;
    let bikeHimaExtra = parseInt(document.getElementById("bike-hima").value, 10) || 0;
    let bikeSinoExtra = parseInt(document.getElementById("bike-sino").value, 10) || 0;
    let lunchExtra = parseInt(document.getElementById("lunch").value, 10) || 0;

    const cafes = document.getElementById("cafe");
    let cafePrice = Array.from(cafes.selectedOptions)
        .map(opt => parseInt(opt.value) || 0)
        .reduce((a, b) => a + b, 0);

    let dinnerExtra = parseInt(document.getElementById("dinner").value, 10) || 0;

    // 時間を切り上げ
    let roundedHours = Math.ceil(hours);

    // 基本料金計算
    let price = 0;
    if (roundedHours === 0) {
        price = 0;
    } else if (roundedHours <= 2) {
        price = 6000;
    } else {
        price = 6000 + 1000 * (roundedHours - 2);
    }

    // 各オプション加算
    price += bikeHimaExtra + bikeSinoExtra + lunchExtra + cafePrice + dinnerExtra;

    document.getElementById("result").innerText =
        `釣り時間: ${roundedHours}時間 / 料金: ${price}円`;
}
