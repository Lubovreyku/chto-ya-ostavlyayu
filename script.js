// Карты "Что я оставляю в уходящем году"
// 7 ответов, одна "рубашка". Без библиотек.

const FRONT_IMAGES = [
  "card1.png",
  "card2.png",
  "card3.png",
  "card4.png",
  "card5.png",
  "card6.png",
  "card7.png"
];
const BACK_IMAGE = "back.png";

const grid = document.getElementById("cardsGrid");
const btnReset = document.getElementById("btnReset");

let locked = false;

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createCard(frontSrc, idx) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "card";
  btn.setAttribute("aria-label", "Карта " + (idx + 1));

  btn.innerHTML = `
    <div class="card-inner">
      <img class="card-face card-back" src="${BACK_IMAGE}" alt="Рубашка карты" loading="lazy" />
      <img class="card-face card-front" src="${frontSrc}" alt="Послание" loading="lazy" />
    </div>
  `;

  btn.addEventListener("click", () => {
    if (locked || btn.classList.contains("is-flipped")) return;

    btn.classList.add("is-flipped");

    // Блокируем остальные (эффект выбора одной карты)
    locked = true;
    [...grid.querySelectorAll(".card")].forEach((c) => {
      if (c !== btn) c.disabled = true;
    });
  });

  return btn;
}

function render() {
  locked = false;
  grid.innerHTML = "";

  const order = shuffle(FRONT_IMAGES);

  order.forEach((src, i) => {
    grid.appendChild(createCard(src, i));
  });
}

btnReset.addEventListener("click", () => render());

// Первый рендер
render();
