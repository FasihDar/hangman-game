const words = [
    "javascript",
    "hangman",
    "website",
    "coding",
    "programming",
    "computer",
    "technology",
    "internet",
    "software",
    "database",
    "algorithm",
    "function",
    "loop",
    "variable",
    "object",
    "class",
    "html",
    "css",
    "python",
    "java",
    "c++",
    "machine learning",
    "artificial intelligence",
    "cybersecurity",
    "cloud computing",
    "data science",
    "innovation",
    "efficiency",
    "communication",
    "problem-solving",
    "creativity",
    "design",
  ];
let selectedWord;
let guessedLetters;
let incorrectGuesses;
const maxIncorrectGuesses = 6;

const canvas = document.getElementById('hangmanCanvas');
const context = canvas.getContext('2d');
const modal = document.getElementById('gameOverModal');
const modalMessage = document.getElementById('modalMessage');

function init() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    incorrectGuesses = 0;
    document.getElementById('message').innerText = '';
    document.getElementById('wrongGuesses').innerText = '';
    drawWord();
    drawHangman();
    document.addEventListener('keydown', handleKeyPress);
    modal.style.display = 'none';
}

function drawWord() {
    const wordContainer = document.getElementById('wordContainer');
    wordContainer.innerHTML = '';
    for (let char of selectedWord) {
        const span = document.createElement('span');
        span.className = 'dash';
        span.innerText = guessedLetters.includes(char) ? char : '';
        wordContainer.appendChild(span);
    }
}

function drawHangman() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = "white";
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(50, canvas.height - 50);
    context.lineTo(50, 10);
    context.lineTo(150, 10);
    context.lineTo(150, 30);
    context.stroke();

    context.beginPath();
    context.moveTo(50, 190);
    context.lineTo(50, 10); 
    context.lineTo(150, 10); 
    context.lineTo(150, 30);
    context.stroke();
    
    if (incorrectGuesses > 0) {
        context.beginPath();
        context.arc(150, 80, 20, 0, Math.PI * 2);
        context.stroke();
    }

    if (incorrectGuesses > 1) {
        context.beginPath();
        context.moveTo(150, 100);
        context.lineTo(150, 170);
        context.stroke();
    }

    if (incorrectGuesses > 2) {
        context.beginPath();
        context.moveTo(150, 120);
        context.lineTo(120, 150);
        context.stroke();
    }

    if (incorrectGuesses > 3) {
        context.beginPath();
        context.moveTo(150, 120);
        context.lineTo(180, 150);
        context.stroke();
    }

    if (incorrectGuesses > 4) {
        context.beginPath();
        context.moveTo(150, 170);
        context.lineTo(120, 200);
        context.stroke();
    }

    if (incorrectGuesses > 5) {
        context.beginPath();
        context.moveTo(150, 170);
        context.lineTo(180, 200);
        context.stroke();
    }
}

function handleKeyPress(event) {
    const guess = event.key.toLowerCase();
    if (!/[a-z]/.test(guess) || guess.length !== 1) {
        return;
    }

    if (guessedLetters.includes(guess)) {
        showMessage('Already used it');
        return;
    }

    guessedLetters.push(guess);

    if (!selectedWord.includes(guess)) {
        incorrectGuesses++;
        updateWrongGuesses(guess);
        drawHangman();
    }

    drawWord();
    checkGameStatus();
}

function updateWrongGuesses(letter) {
    const wrongGuesses = document.getElementById('wrongGuesses');
    const wrongGuess = document.createElement('div');
    wrongGuess.className = 'wrongGuess';
    wrongGuess.innerText = "'" + letter + "'";
    wrongGuesses.appendChild(wrongGuess);
}

function showMessage(msg) {
    const message = document.getElementById('message');
    message.innerText = msg;
    message.style.padding = '15px 0'; 
    setTimeout(() => {
        message.innerText = '';
        message.style.padding = '0';
    }, 3000);
}

function checkGameStatus() {
    const wordContainer = document.getElementById('wordContainer');
    const currentWord = Array.from(wordContainer.querySelectorAll('.dash')).map(span => span.innerText).join('');

    if (currentWord === selectedWord) {
        modalMessage.innerText = 'Congratulations! You won!';
        showModal();
    } else if (incorrectGuesses >= maxIncorrectGuesses) {
        modalMessage.innerText = `You Lost!  The word was: ${selectedWord}`;
        showModal();
    }
}

function showModal() {
    modal.style.display = 'block';
    document.removeEventListener('keydown', handleKeyPress);
}

function resetGame() {
    document.removeEventListener('keydown', handleKeyPress);
    init();
}

window.onload = init;
