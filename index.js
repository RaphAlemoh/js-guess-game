'use strict';

let secretNumber = Math.trunc(Math.random() * 100) + 1;
console.log(secretNumber);

let score = 100;
let highscore = 0;
const userMaxAttempts = 5;
let userAttempts = 0;

const redColorPage = "#cc3300";
const whiteColorPage = "#fff";
const greenColorPage = "#60b347";

const feedback = document.querySelector(".message");
const userScoreText = document.querySelector(".score");
const hiddenNumber = document.querySelector(".hidden-number");
const guessNumber = document.querySelector('.guess');
const countAttempt = document.querySelector('.attemptscount');


const displayMessage = function (message) {
    feedback.textContent = message;
};

const updateScore = function (newScore) {
    userScoreText.textContent = newScore;
};

const resetGame = function () {
    score = 100;
    secretNumber = Math.trunc(Math.random() * 100) + 1;
    userAttempts = 0;
    displayMessage('Start guessing...');
    updateScore(score);

    hiddenNumber.textContent = '?';
    guessNumber.value = '';
    document.querySelector('body').style.backgroundColor = whiteColorPage;
    hiddenNumber.style.width = '15rem';
};

document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(guessNumber.value);
    if (!guess) {
        displayMessage('No number!');
    } else if (guess === secretNumber) {
        displayMessage('Correct Number!');
        hiddenNumber.textContent = secretNumber;
        document.querySelector('body').style.backgroundColor = greenColorPage;
        hiddenNumber.style.width = '30rem';

        if (score > highscore) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }
        countAttempt.textContent = userAttempts;
    } else if (guess !== secretNumber) {
        if (userAttempts < userMaxAttempts - 1) {
            displayMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
            score--;
            updateScore(score);
            userAttempts++;
        } else {
            document.querySelector('body').style.backgroundColor = redColorPage;
            displayMessage('You lost the game!');
            updateScore(0);
        }
    }
});

document.querySelector('.again').addEventListener('click', resetGame);
