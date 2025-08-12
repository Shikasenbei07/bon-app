// 列強調スクリプト
window.addEventListener('DOMContentLoaded', function() {
  const schedule = document.querySelector('.schedule');
  const headers = schedule.querySelectorAll('.header');
  const columns = getComputedStyle(schedule).gridTemplateColumns.split(' ').length;
  // ヘッダのインデックス（0,1は空白/タイムラインなので2から）
  headers.forEach((header, idx) => {
    header.style.cursor = 'pointer';
    header.addEventListener('click', (e) => {
      e.stopPropagation();
      highlightColumn(idx+2, columns); // idx: 0=時刻, 5=☕
    });
  });

  // ヘッダ以外クリックで解除
  document.addEventListener('click', (e) => {
    // .header自身以外
    if (!e.target.classList.contains('header')) {
      clearHighlight();
    }
  });

  function highlightColumn(targetCol, columns) {
    // SVGや空div（ヘッダー前の空白）を除外
    const cells = Array.from(schedule.children).filter(cell => cell.nodeName !== 'SVG' && !(cell.tagName === 'DIV' && cell.className === ''));
    let colIdx = 0;
    cells.forEach(cell => {
      // grid-column: span N対応
      let span = 1;
      const spanMatch = (cell.getAttribute('style')||'').match(/grid-column:\s*span\s*(\d+)/);
      if(spanMatch) span = parseInt(spanMatch[1]);
      // このセルがまたがる全てのカラムインデックス（1始まり）
      const coveredCols = [];
      for(let i=0;i<span;i++){
        coveredCols.push(colIdx + i + 1);
      }
      if (coveredCols.includes(targetCol)) {
        cell.classList.remove('dimmed-cell');
      } else {
        cell.classList.add('dimmed-cell');
      }
      colIdx += span;
      if(colIdx >= columns) colIdx = 0;
    });
  }

  function clearHighlight() {
    const cells = Array.from(schedule.children);
    cells.forEach(cell => cell.classList.remove('dimmed-cell'));
  }
});
