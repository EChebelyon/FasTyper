window.addEventListener('load', init);

var firebaseConfig = {
    apiKey: "AIzaSyDfooXy4mx4m8G4teen-RGJ1pwKGxn3nWo",
    authDomain: "fastyper-7d0b6.firebaseapp.com",
    projectId: "fastyper-7d0b6",
    storageBucket: "fastyper-7d0b6.appspot.com",
    messagingSenderId: "784059967668",
    appId: "1:784059967668:web:7bf03af5afdce863818fe1",
    measurementId: "G-QBQQ1QYNKG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var scoresRef = firebase.database().ref('scores');

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
const finalScore = document.querySelector('#final-score')

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

//check game status and send score to DB
function checkStatus() {
    if (!isPlaying && time === 0) {
        
        message.innerHTML = 'Game over Boss!!'
        var maxScore = scoreDisplay.innerHTML;
        finalScore.innerHTML = 'Your final score is ' + maxScore
        document.querySelector('.alert').style.display = 'block';

        //add event listener to play again button
        //submit scores
        // saveScore(maxScore);
        


    }

}
function getMaxScore() {
    if (!isPlaying && time === 0) {
        var maxScore = scoreDisplay.innerHTML;
        finalScore.innerHTML = 'Your final score is ' + maxScore
        saveScore(maxScore)
    }
}
//Fxn to save score
function saveScore( score){
    var newScoresRef = scoresRef.push();
    newScoresRef.set({
        score: score
    })
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