//きのこバスター
const gameArea = document.getElementById("gameArea");
let score = 0;

const scoreElement = document.getElementById("score");

// 画像の設定
const targetImageSrc = "./image/kinoko.png"; // 当たりの画像
const missImageSrc = "./image/takenoko.png"; // はずれの画像
const clickedImageSrc = "./image/bakuhatsu.png";

// 画像をランダムな位置と角度で表示する関数
function createImage(imageSrc, isTarget) {
  const img = document.createElement("img");
  img.src = imageSrc;
  img.style.position = "absolute";
  img.style.top = `${Math.random() * 100}%`;
  img.style.left = `${Math.random() * 100}%`;
  img.style.transform = `rotate(${Math.random() * 360}deg)`;
  img.style.transition = "all 1s linear";

  img.style.width = "100px";
  img.style.height = "100px";

  // クリックイベント
  img.addEventListener("click", () => {
    if (isTarget) {
      score++;
    } else {
      score--;
    }
    updateScore();
    img.src = clickedImageSrc;

    // 0.5秒後に画像を削除
    setTimeout(() => {
      img.remove();
    }, 100); // 0.5秒後に削除
  });

  gameArea.appendChild(img);

  // 画像が流れる処理
  const angle = Math.random() * 360; // ランダムな角度
  const distance = 2000; // 移動距離（2000px）
  img.style.transition = `transform ${distance / 100}s linear`; // 移動時間を距離に基づいて調整

  setTimeout(() => {
    // ランダムな方向に画像を移動
    img.style.transform = `translate(${Math.cos(angle) * distance}px, ${
      Math.sin(angle) * distance
    }px)`;
  }, 0);
}

// スコアの更新
function updateScore() {
  scoreElement.textContent = `ポイント: ${score}`;
}

// 画像を定期的に流し続ける関数
function startGame() {
  setInterval(() => {
    const isTarget = Math.random() > 0.5;
    const imageSrc = isTarget ? targetImageSrc : missImageSrc;
    createImage(imageSrc, isTarget);
  }, 100);
}

// ゲーム開始
startGame();
