// window.addEventListener('load', init);

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
let isSignedIn = false

//Grab DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#message');
const finalScore = document.querySelector('#final-score')
const user = document.querySelector('#user-name')

const words = [
    'Humriz',
    'Caimmeje',
    'Canolinga',
    'Douatouri',
    'Noro',
    'Rafabari',
    'Geto',
    'Balatembo',
    'Moane',
    'Ndjokou',
    'Impfonda',
    'Lekaka',
    'Katewambwa',
    'Siavonbe',
    'Loroye',
    'Gossouri',
    'Gbahe',
    'Maridua',
    'Yanfra',
    'Danorhoga',
    'Wara',
    'Gabnou',
    'Wurri',
    'Sohia',
    'Pougui',
    'Dakarine',
    'Klaihull',
    'Yholcaster',
    'Srugate',
    'Truorough',
    'Phercester',
    'Tego',
    'Ublerton',
    'Shaco',
    'Antaphia',
    'Isonham',
    'Kitale',
    'Mabayinga',
    'Kibobarangwe',
    'Zidele',
    'Sebebela',
    'Shimobu',
    'Naironet',
    'Koli',
    'Kirama',
    'Rigohanhumei',
    'Elgugudeey',
    'Kiogoro',
    'Mpanbi',
    'Buwerita',
    'Sembe',
    'Kajansindi',
    'Nebgiri',
    'Eshlatabad',
    'Gawrangi',
    'Kalabat',
    'Qaimmuqam',
    'Wanlagun',
    'Fatehgudi',
    'Hegapola',
    'Pahapitiya',
    'Ghodakot',
    'Kamakot',
    'Sandnirhat',
    'Khagrahet',
    'Hitharanfaru',
    'Farukoldhuffushi',
    'Barchap',
    'Maopang',
    'Raukakoula',
    'Lasosinu',
    'Manotongo',
    'Binoiniberu',
    'Schaffhauserrheinweg',
    'Annerveenschekanaal' ,
    'Cadibarrawirracanna', 
    'Newtownmountkennedy', 
    'Cottonshopeburnfoot' ,
    'Kirkjubæjarklaustur', 
    'Krammerjachtensluis' ,
    'Staromikhaylovskoye', 
    'Hrunamannahreppur', 
    'Kaldrananeshreppur', 
    'Kwigiumpainukamiut', 
    'Kristiinankaupunki', 
    'Oberschaeffolsheim', 
    'Obuladevaracheruvu', 
    'Pietramontecorvino', 
    'Thiruvananthapuram', 
    'Breuschwickersheim', 
    'Rhosllannerchrugog',
    'Prachaksinlapakhom', 
    'Tauberbischofsheim',
    'Kaldrananeshreppur', 
    'Blagoveshchenskoye', 
    'Andoharanomaintso', 
    'Civitacampomarano', 
    'Georgsmarienhütte' ,
    'Kleinfeltersville', 
    'Mooselookmeguntic', 
    'Hrunamannahreppur', 
    'Jazgarzewszczyzna', 
    'Kirchheimbolanden', 
    'Qeqertarsuatsiaat',
    'Eggewaartskapelle', 
    'Tytsjerksteradiel',
    'Starokostiantyniv',
]; 



function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    isSignedIn = true
    document.querySelector('#user-name').innerHTML = profile.getName()
}


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        document.querySelector('#user-name').innerHTML = ''
        window.location.reload()
        isSignedIn = false
    });
}


//Initialize Game
function init() {
    //focus cursor on input
    wordInput.focus()
    wordInput.select()
    
    //load word from array
    showWord(words);

    //Match on word input
    wordInput.addEventListener('input', startMatch);

    //countdown seconds
    setInterval(countdown, 1000);

    //check game status
    setInterval(checkStatus, 50);

}
document.addEventListener('keypress', function (e) {
    if (e.ctrlKey && e.key === 's') {
        init();
    }
});

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
        
        message.innerHTML = 'Game Over!'
        var maxScore = scoreDisplay.innerHTML;
        finalScore.innerHTML = 'Your final score is ' + maxScore
        document.querySelector('.alert').style.display = 'block';
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
    if (wordInput.value.toLowerCase() === currentWord.innerHTML.toLowerCase()) {

        message.innerHTML = 'You are correct boss';
        return true;
        
    } else {
        message.innerHTML = '';
        return false;
    }
}

//Fxn to save score
function saveScore(name, score){
    var newScoresRef = scoresRef.push();
    newScoresRef.set({
        name: name,
        score: score
    })
}
function submitMaxScore() {
    if (isSignedIn) {
        saveScore(user.innerHTML, scoreDisplay.innerHTML)
        document.querySelector('#submit-success').innerHTML = 'Score Submitted'
        window.location.reload();
    } else {
        confirm('Please Sign In')
    }
    
}