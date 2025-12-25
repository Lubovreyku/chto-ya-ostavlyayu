const cardsData = [
  { img: "card1.png", text: "Ты оставляешь бег.\nПришло время покоя." },
  { img: "card2.png", text: "Ты больше не обязана быть прежней.\nВсё, что отжило — можно оставить." },
  { img: "card3.png", text: "Страхи не идут с тобой дальше.\nСвет уже рядом.\nПозволь себе увидеть его." },
  { img: "card4.png", text: "Ты отпускаешь то, что ранило.\nСердце выбирает мягкость и покой." },
  { img: "card5.png", text: "Ты оставляешь вину.\nТы достаточно хороша уже сейчас." },
  { img: "card6.png", text: "Ты отпускаешь старые ожидания.\nЖизнь разворачивается мягко." },
  { img: "card7.png", text: "Ты оставляешь сомнения в себе.\nТвоя сила — с тобой." }
];

const BACK_IMG = "back.png";

const grid = document.getElementById("grid");
const resetBtn = document.getElementById("resetBtn");
const result = document.getElementById("result");
const resultText = document.getElementById("resultText");
const copyBtn = document.getElementById("copyBtn");

let opened = false;

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeCard(cardData) {
  const card = document.createElement("div");
  card.className = "card";

  const inner = document.createElement("div");
  inner.className = "card-inner";

  const back = document.createElement("div");
  back.className = "card-face card-back";
  const backImg = document.createElement("img");
  backImg.src = BACK_IMG;
  back.appendChild(backImg);
const front = document.createElement("div");
front.className = "card-face card-front";

const frontImg = document.createElement("img");
frontImg.src = cardData.img;

const textOverlay = document.createElement("div");
textOverlay.className = "card-text";
textOverlay.textContent = cardData.text;

front.appendChild(frontImg);
front.appendChild(textOverlay);
 const text = document.createElement("div");
text.className = "card-text";
text.textContent = cardData.text;


front.appendChild(text);
  inner.append(back, front);
  card.appendChild(inner);

  card.addEventListener("click", () => {
    if (opened) return;
    opened = true;
    card.classList.add("is-flipped");
    showResult(cardData.text);
    document.querySelectorAll(".card").forEach(c => {
      if (c !== card) c.classList.add("disabled");
    });
  });

  return card;
}

function showResult(text) {
  resultText.textContent = text;
  result.classList.remove("hidden");
}

function reset() {
  opened = false;
  result.classList.add("hidden");
  grid.innerHTML = "";
  init();
}

function init() {
  shuffle(cardsData).forEach(c => grid.appendChild(makeCard(c)));
}

copyBtn.onclick = () => navigator.clipboard.writeText(resultText.textContent);
resetBtn.onclick = reset;
init();
