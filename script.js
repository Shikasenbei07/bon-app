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

// ハンバーガーメニュー制御
document.addEventListener("DOMContentLoaded", function() {
  // ハンバーガーアイコン生成
  if (!document.querySelector('.hamburger')) {
    const btn = document.createElement('button');
    btn.className = 'hamburger';
    btn.innerHTML = '<span></span><span></span><span></span>';
    document.body.appendChild(btn);
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      document.querySelector('.side-menu').classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });
    // メニュー外クリックで閉じる
    document.addEventListener('click', function(e) {
      if (
        document.querySelector('.side-menu.open') &&
        !e.target.closest('.side-menu') &&
        !e.target.closest('.hamburger')
      ) {
        document.querySelector('.side-menu').classList.remove('open');
        document.body.classList.remove('menu-open');
      }
    });
  }
});
