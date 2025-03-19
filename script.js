let questions = []; // Empty array for questions
let currentQuestionIndex = 0;
let score = 0;
let timer;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const scoreText = document.getElementById("score-text");
const progressBar = document.getElementById("progress-bar"); // Progress bar
const restartButton = document.createElement("button");

// Restart button setup
restartButton.textContent = "Restart Quiz";
restartButton.style.display = "none";
restartButton.onclick = restartQuiz;
document.body.appendChild(restartButton);

// Fetch random web development questions
async function fetchQuestions() {
    try {
        const response = await fetch("https://opentdb.com/api.php?amount=10&category=27&difficulty=easy");
        const data = await response.json();
        questions = data.results.map((q) => ({
            question: q.question,
            options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5), // Randomize options
            correct: q.correct_answer
        }));
        progressBar.max = questions.length; // Set progress bar max value
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
        button.onclick = () => checkAnswer(button, option, currentQuestion.correct);
        optionsContainer.appendChild(button);
    });

    nextButton.style.display = "none";
    progressBar.value = currentQuestionIndex; // Update progress bar
    startTimer();
}

// Start timer function
function startTimer() {
    let timeLeft = 60;
    const timerDisplay = document.getElementById("timer-text");

    clearInterval(timer); // Clear previous timer
    timer = setInterval(() => {
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);
            currentQuestionIndex++;
            loadQuestion();
        }
    }, 1000);
}

// Check answer and move to next question
function checkAnswer(button, selected, correct) {
    clearInterval(timer);

    // Disable all buttons after selection
    [...optionsContainer.children].forEach((btn) => {
        btn.disabled = true;
        if (btn.textContent === correct) {
            btn.classList.add("correct"); // Correct answer green
        } else if (btn.textContent === selected) {
            btn.classList.add("wrong"); // Wrong answer red
        }
    });

    if (selected === correct) {
        score++;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 2000); // Move to next question after 2 sec
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
