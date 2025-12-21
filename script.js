const cardsData = [
  {
    img: "/images/card1.png",
    text: "Ты оставляешь бег.\nПришло время покоя."
  },
  {
    img: "/images/card2.png",
    text: "Ты больше не обязана быть прежней.\nВсё, что отжило — можно оставить."
  },
  {
    img: "/images/card3.png",
    text: "Страхи не идут с тобой дальше.\nСвет уже рядом.\nПозволь себе увидеть его."
  },
  {
    img: "/images/card4.png",
    text: "Ты отпускаешь то, что ранило.\nСердце выбирает мягкость и покой."
  },
  {
    img: "/images/card5.png",
    text: "Ты оставляешь вину.\nТы достаточно хороша уже сейчас."
  },
  {
    img: "/images/card6.png",
    text: "Ты отпускаешь тревогу о завтрашнем дне.\nОпора внутри тебя."
  },
  {
    img: "/images/card7.png",
    text: "Ты оставляешь сомнения в себе.\nТвоя сила с тобой."
  }
];

const BACK_IMG = "/images/back.png";

const grid = document.getElementById("grid");
const resetBtn = document.getElementById("resetBtn");
const result = document.getElementById("result");
const resultText = document.getElementById("resultText");
const copyBtn = document.getElementById("copyBtn");

let locked = false;

function shuffle(arr){
  const a = [...arr];
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeCard({img, text}, index){
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.index = String(index);

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-face card-back">
        <img src="${BACK_IMG}" alt="Рубашка карты">
      </div>
      <div class="card-face card-front">
        <img src="${img}" alt="Карта">
      </div>
    </div>
  `;

  card.addEventListener("click", () => {
    if(locked) return;
    locked = true;

    card.classList.add("is-flipped");
    showResult(text);

    // остальные карты блокируем, чтобы не было повторных кликов
    document.querySelectorAll(".card").forEach(c => {
      if(c !== card) c.classList.add("disabled");
    });

    // небольшой скролл к результату (приятно на мобильном)
    setTimeout(() => {
      result.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  });

  return card;
}

function showResult(text){
  resultText.textContent = text;
  result.classList.remove("hidden");
}

function reset(){
  locked = false;
  result.classList.add("hidden");
  resultText.textContent = "";

  grid.innerHTML = "";

  const shuffled = shuffle(cardsData);
  shuffled.forEach((c, i) => grid.appendChild(makeCard(c, i)));
}

resetBtn.addEventListener("click", reset);

copyBtn.addEventListener("click", async () => {
  const text = resultText.textContent.trim();
  if(!text) return;

  try{
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = "Скопировано ✓";
    setTimeout(() => copyBtn.textContent = "Скопировать текст", 1200);
  }catch(e){
    // запасной вариант
    alert("Не получилось скопировать автоматически. Выделите текст и скопируйте вручную.");
  }
});

reset();
