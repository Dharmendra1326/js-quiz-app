let questions = []; // Empty array for questions
let currentQuestionIndex = 0;
let score = 0;
let timer;
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const scoreText = document.getElementById("score-text");
const timerText = document.getElementById("timer-text"); // Get red timer
const restartButton = document.createElement("button");

// Restart button setup
restartButton.textContent = "Restart Quiz";
restartButton.style.display = "none";
restartButton.onclick = restartQuiz;
document.body.appendChild(restartButton);

// Fetch random web development questions
async function fetchQuestions() {
    try {
        const response = await fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple");
        const data = await response.json();
        questions = data.results.map((q) => ({
            question: q.question,
            options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5), // Randomize options
            correct: q.correct_answer
        }));
        loadQuestion();
    } catch (error) {
        console.error("Error fetching questions:", error);
        questionText.textContent = "Failed to load questions. Please try again.";
    }
}

// Load question and start timer
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showScore();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerHTML = currentQuestion.question;
    optionsContainer.innerHTML = "";
    
    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(option, currentQuestion.correct);
        optionsContainer.appendChild(button);
    });

    nextButton.style.display = "none";
    
    // Start 60-second timer
    startTimer();
}

// Start timer function (Fixed issue)
function startTimer() {
    let timeLeft = 60;
    timerText.textContent = `Time Left: ${timeLeft}s`; // Update red timer initially

    timer = setInterval(() => {
        timeLeft--;
        timerText.textContent = `Time Left: ${timeLeft}s`; // Update red timer

        if (timeLeft < 0) {
            clearInterval(timer);
            currentQuestionIndex++;
            loadQuestion();
        }
    }, 1000);
}

// Check answer and move to next question
function checkAnswer(selected, correct) {
    clearInterval(timer);
    if (selected === correct) {
        score++;
    }
    currentQuestionIndex++;
    loadQuestion();
}

// Show final score
function showScore() {
    questionText.textContent = "Quiz Completed!";
    optionsContainer.innerHTML = "";
    nextButton.style.display = "none";
    scoreText.textContent = `Your Score: ${score} / ${questions.length}`;
    restartButton.style.display = "block";
}

// Restart quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    restartButton.style.display = "none";
    scoreText.textContent = "";
    fetchQuestions();
}

// Start fetching questions
fetchQuestions();
