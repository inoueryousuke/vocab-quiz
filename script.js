// 3問だけのミニ問題集（日本語→英語）
const questions = [
  { jp: "りんご", choices: ["apple","grape","peach","melon"], answer: "apple" },
  { jp: "早い",   choices: ["slow","fast","late","early"],    answer: "fast"  },
  { jp: "図書館", choices: ["library","station","school","park"], answer: "library" }
];

let idx = 0;
let score = 0;

const qText = document.getElementById("q-text");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("next");
const resultEl = document.getElementById("result");
const finishEl = document.getElementById("finish");
const quizEl = document.getElementById("quiz");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart");

function shuffle(arr) {
  return arr.map(v => [Math.random(), v]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
}

function render() {
  const q = questions[idx];
  qText.textContent = `Q${idx+1}. 「${q.jp}」に合う英語はどれ？`;
  resultEl.textContent = "";
  nextBtn.disabled = true;
  choicesEl.innerHTML = "";
  shuffle(q.choices).forEach(choice => {
    const div = document.createElement("button");
    div.className = "choice";
    div.textContent = choice;
    div.onclick = () => select(choice, q.answer, div);
    choicesEl.appendChild(div);
  });
}

function select(choice, answer, el) {
  Array.from(choicesEl.children).forEach(c => c.disabled = true);
  if (choice === answer) {
    el.classList.add("correct");
    resultEl.textContent = "正解！";
    score++;
  } else {
    el.classList.add("wrong");
    resultEl.textContent = `不正解… 正解は「${answer}」`;
  }
  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  idx++;
  if (idx < questions.length) {
    render();
  } else {
    quizEl.classList.add("hidden");
    finishEl.classList.remove("hidden");
    scoreEl.textContent = `スコア：${score} / ${questions.length}`;
  }
};

restartBtn.onclick = () => {
  idx = 0; score = 0;
  finishEl.classList.add("hidden");
  quizEl.classList.remove("hidden");
  render();
};

// 初期表示
render();
