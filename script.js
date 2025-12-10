// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen"); // make sure HTML id matches this
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

// Initial setup
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

// Start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;
  progressBar.style.width = "0%";

  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

// Show current question & answers
function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Update question text and counter
  questionText.textContent = currentQuestion.question;
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  // Clear previous answers
  answersContainer.innerHTML = "";

  // Create new answer buttons
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("btn", "answer-btn");
    button.textContent = answer.text;
    button.dataset.correct = answer.correct; // "true" or "false"
    button.addEventListener("click", handleAnswerClick);
    answersContainer.appendChild(button);
  });

  // Update progress bar (progress of completed questions)
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";
}

// Handle answer click
function handleAnswerClick(event) {
  if (answersDisabled) return;
  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Update score
  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  // Show correct/wrong styling and disable all buttons
  Array.from(answersContainer.children).forEach((button) => {
    const buttonIsCorrect = button.dataset.correct === "true";
    if (buttonIsCorrect) {
      button.classList.add("correct");
    } else {
      button.classList.add("wrong");
    }
    button.disabled = true;
  });

  // Go to next question or show results
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 800);
}

// Show result screen
function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;
  maxScoreSpan.textContent = quizQuestions.length;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect score! Amazing! 🎉";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Nice job! You did well 👍";
  } else {
    resultMessage.textContent = "Keep practicing, you'll get there! 💪";
  }

  // Full progress when done
  progressBar.style.width = "100%";
}

// Restart quiz from result screen
function restartQuiz() {
  startQuiz();
}
