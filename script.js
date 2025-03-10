const questions = [
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "All of the above"],
        correct: 3
    },
    {
        question: "What is the output of `typeof null` in JavaScript?",
        options: ["null", "undefined", "object", "string"],
        correct: 2
    },
    {
        question: "Which function is used to print something in the console?",
        options: ["print()", "log()", "console.log()", "display()"],
        correct: 2
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: ["//", "/*", "#", "--"],
        correct: 0
    },
    {
        question: "Which operator is used to compare values AND types in JavaScript?",
        options: ["==", "===", "!=", "!=="],
        correct: 1
    }
];

let shuffledQuestions = []; // Randomized questions store karne ke liye
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60; // Har question ke liye 60 second

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const scoreText = document.getElementById("score-text");
const timerText = document.getElementById("timer-text"); // Timer ka element
const restartButton = document.createElement("button"); // Restart button

restartButton.textContent = "Restart Quiz";
restartButton.style.display = "none"; 
restartButton.onclick = restartQuiz;
document.body.appendChild(restartButton); 

// Questions ko random order me karne ka function
function shuffleQuestions() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
}

// Timer start karne ka function
function startTimer() {
    timeLeft = 60;
    timerText.textContent = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerText.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion(); // Agar time khatam ho gaya, next question
        }
    }, 1000);
}

// Question load karne ka function
function loadQuestion() {
    clearInterval(timer); // Purana timer stop kare
    if (currentQuestionIndex < shuffledQuestions.length) {
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        optionsContainer.innerHTML = "";

        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.textContent = `${index + 1}. ${option}`;
            button.style.display = "block"; 
            button.onclick = () => checkAnswer(index);
            optionsContainer.appendChild(button);
        });

        nextButton.style.display = "none"; 
        startTimer(); // Har naye question pe timer start ho
    } else {
        showScore();
    }
}

// Answer check karne ka function
function checkAnswer(selectedIndex) {
    if (selectedIndex === shuffledQuestions[currentQuestionIndex].correct) {
        score++;
    }
    currentQuestionIndex++;
    loadQuestion();
}

// Score show karne ka function
function showScore() {
    questionText.textContent = "Quiz Completed!";
    optionsContainer.innerHTML = "";
    nextButton.style.display = "none";
    scoreText.textContent = `Your Score: ${score} / ${shuffledQuestions.length}`;
    restartButton.style.display = "block"; 
    clearInterval(timer);
}

// Quiz restart karne ka function
function restartQuiz() {
    shuffleQuestions();
    currentQuestionIndex = 0;
    score = 0;
    restartButton.style.display = "none"; 
    scoreText.textContent = "";
    loadQuestion();
}

// Pehle questions shuffle karo aur quiz start karo
shuffleQuestions();
loadQuestion();
