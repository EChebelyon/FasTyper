window.addEventListener('load', init);
//Initialize Globals
let time = 5;
let score = 0;
let isPlaying;

//Grab DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#message');

const words = [
    'boot',
    'snatch',
    'thaw',
    'elderly',
    'suggestion',
    'furry',
    'branch',
    'unused',
    'plug',
    'burst',
    'decide',
    'trap'
];

//Initialize Game
function init() {
    //load word from array
    showWord(words);

    //Match on word input
    wordInput.addEventListener('input', startMatch);

    //countdown seconds
    setInterval(countdown, 1000);

    //check game status
    setInterval(checkStatus, 50);
}
//Randomly pick word from array
function showWord(words) {
    //random index of array
    const randIndex = Math.floor(Math.random() * words.length);

    //output random word to dom
    currentWord.innerHTML = words[randIndex];
}

//Countdown timer
function countdown() {
    //check time hasn't run out
    if (time > 0) {
        time--;
    } else if(time===0) {
        isPlaying = false
    }
    timeDisplay.innerHTML = time;
}

//check game status
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'Game over Boss!!'
    }
}

function startMatch() {
    if(matchWords()) {
        // console.log('Matching!!!')
        isPlaying = true;
        time = 6;
        showWord(words);
        wordInput.value = ''
        score++;
        
    }
    //start score at -1 but display 0
    if (score === -1) {
        scoreDisplay.innerHTML = 0
    } else {
        scoreDisplay.innerHTML = score
    }
    
}

//Matches input to current word
function matchWords() {
    if (wordInput.value === currentWord.innerHTML) {

        message.innerHTML = 'You are correct boss';
        return true;
        
    } else {
        message.innerHTML = '';
        return false;
    }
}