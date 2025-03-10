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
    },
    {
        question: "Which method is used to convert a string into a number?",
        options: ["parseInt()", "Number()", "Both A & B", "stringToNumber()"],
        correct: 2
    },
    {
        question: "What is the default value of an uninitialized variable in JavaScript?",
        options: ["null", "0", "undefined", "NaN"],
        correct: 2
    },
    {
        question: "Which function is used to execute a function after a specific time interval?",
        options: ["setTimeout()", "setInterval()", "setDelay()", "timeOut()"],
        correct: 0
    },
    {
        question: "What will be the output of `console.log(typeof [])`?",
        options: ["object", "array", "undefined", "list"],
        correct: 0
    },
    {
        question: "Which method is used to remove the last element from an array?",
        options: ["pop()", "shift()", "splice()", "removeLast()"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const scoreText = document.getElementById("score-text");
const restartButton = document.createElement("button"); // Restart button create

restartButton.textContent = "Restart Quiz";
restartButton.style.display = "none"; // Pehle hide rakhenge
restartButton.onclick = restartQuiz; // Function connect

document.body.appendChild(restartButton); // Button ko body me add karna

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = `${index + 1}. ${option}`; // Numbering add kar di
        button.style.display = "block"; // Har button ko alag line me dikhane ke liye
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });

    nextButton.style.display = "none"; // Har naye question pe Next button hide rahe
}

function checkAnswer(selectedIndex) {
    if (selectedIndex === questions[currentQuestionIndex].correct) {
        score++;
    }
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    questionText.textContent = "Quiz Completed!";
    optionsContainer.innerHTML = "";
    nextButton.style.display = "none";
    scoreText.textContent = `Your Score: ${score} / ${questions.length}`;

    restartButton.style.display = "block"; // Restart button show kare
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    restartButton.style.display = "none"; // Restart button hide kare
    scoreText.textContent = "";
    loadQuestion();
}

loadQuestion();
