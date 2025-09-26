// v2: 進捗バー・スコア表示・5問に増量
const questions = [
  { jp: "りんご",   choices: ["apple","grape","peach","melon"], answer: "apple" },
  { jp: "早い",     choices: ["slow","fast","late","early"],    answer: "fast"  },
  { jp: "図書館",   choices: ["library","station","school","park"], answer: "library" },
  { jp: "机",       choices: ["table","river","door","bread"],  answer: "table" },
  { jp: "難しい",   choices: ["easy","heavy","difficult","light"], answer: "difficult" },
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
const barEl = document.getElementById("bar");
const statusEl = document.getElementById("status");

function shuffle(arr) {
  return arr.map(v => [Math.random(), v]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
}

function updateProgress() {
  const pct = Math.round((idx) / questions.length * 100);
  barEl.style.width = `${pct}%`;
  statusEl.textContent = `Q${Math.min(idx+1, questions.length)} / ${questions.length}・スコア ${score}`;
}

function render() {
  updateProgress();
  const q = questions[idx];
  qText.textContent = `Q${idx+1}. 「${q.jp}」に合う英語はどれ？`;
  resultEl.textContent = "";
  nextBtn.disabled = true;
  choicesEl.innerHTML = "";
  shuffle(q.choices).forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = choice;
    btn.onclick = () => select(choice, q.answer, btn);
    choicesEl.appendChild(btn);
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
    // 100% にして終了表示
    barEl.style.width = "100%";
    quizEl.classList.add("hidden");
    finishEl.classList.remove("hidden");
    scoreEl.textContent = `スコア：${score} / ${questions.length}`;
    statusEl.textContent = `完了・スコア ${score}`;
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
