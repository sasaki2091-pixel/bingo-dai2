function generateColumn(min, max) {
  let numbers = [];
  while (numbers.length < 5) {
    let n = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!numbers.includes(n)) numbers.push(n);
  }
  return numbers;
}

function generateBingoNumbers() {
  const B = generateColumn(1, 15);
  const I = generateColumn(16, 30);
  const N = generateColumn(31, 45);
  const G = generateColumn(46, 60);
  const O = generateColumn(61, 75);

  N[2] = "FREE"; // 中央

  return [B, I, N, G, O];
}

function generateBingo() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const name = document.getElementById("name").value;
  const kw1 = document.getElementById("kw1").value;
  const kw2 = document.getElementById("kw2").value;
  const kw3 = document.getElementById("kw3").value;

  const numbers = generateBingoNumbers();

  const img = new Image();
  img.src = "template.png";

  img.onload = function() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";

    // --- 名前 ---
    ctx.font = "bold 42px Arial";
    ctx.textAlign = "left";
    ctx.fillText(name, 300, 340);

    // --- キーワード ---
    ctx.font = "36px Arial";
    ctx.fillText(kw1, 720, 340);
    ctx.fillText(kw2, 300, 450);
    ctx.fillText(kw3, 720, 450);

    // --- ビンゴ数字 ---
    ctx.font = "bold 60px Arial";
    ctx.textAlign = "center";

    const startX = 280;   // 左端
    const startY = 670;   // 上端
    const cell = 140;     // マス間隔

    for (let col = 0; col < 5; col++) {
      for (let row = 0; row < 5; row++) {
        ctx.fillText(
          numbers[col][row],
          startX + col * cell,
          startY + row * cell
        );
      }
    }

    // --- ダウンロード ---
    const link = document.createElement("a");
    link.download = (name || "bingo") + "_card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
}