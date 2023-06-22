/*----- constants -----*/
const FRUITS = {
    'seven' : 'images/Seven.png',
    'cherries': 'images/Cherries.png',
    'watermelon' : 'images/Watermelon.png'
}

const winningCOMBOS = [
    ['seven', 'seven', 'seven'],
    ['cherries', 'cherries', 'cherries'],
    ['watermelon', 'watermelon', 'watermelon']
]


/*----- state variables -----*/
let bank;
let bet;
let win;
let slotMachine;


/*----- cached elements  -----*/
//Game Play
const bankAmount = document.getElementById('bank-amount');
const betAmount = document.getElementById('bet-amount');
const messageEl = document.querySelector('h1');
const placeBet = document.getElementById('place-bet');
const coinButton = document.getElementById('coin-button');
const hiddenButton = document.getElementById('play-again');
//Audio
const backgroundMusic = document.getElementById('audio-button');
const audioPlayer = document.getElementById('audio-player');

/*----- event listeners -----*/
//Game Play
coinButton.addEventListener('click', renderBet)
placeBet.addEventListener('click', startPlay);
hiddenButton.addEventListener('click', resetGame);
//Audio    
placeBet.addEventListener('click', buttonSound); 
hiddenButton.addEventListener('click', buttonSound);
backgroundMusic.addEventListener('click', buttonSound);
backgroundMusic.addEventListener('click', handleBackgroundAudio);
coinButton.addEventListener('click', coinSound);

/*----- functions -----*/
init();

function init() {
    slotMachine = [];
    bank = 100;
    bet = 0; 
    win = null;
}


//Adds bet to the bet container
function renderBet() {
    if (bet < bank) {
    bet += 10;
    betAmount.innerText = '$' + bet;
    } else {
        coinButton.disabled = true;
        return bet;
    }
}


//Start the game by clicking the 'Place Bet' Button
function startPlay() {
    renderResults();
    getWinner();
    renderMessage();
    renderBank();
    handleEmptyBank()
}


//Display random fruit in each slot of the slot machine
function renderResults() {
    // Get the keys of the FRUITS object and store them in an array.
    //Support from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    const keys = Object.keys(FRUITS);
    // Generate a random index for each slot's index
    //Support from https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
    let slot1Index = Math.floor(Math.random() * keys.length);
    let slot2Index = Math.floor(Math.random() * keys.length);
    let slot3Index = Math.floor(Math.random() * keys.length);
    // Get the key from the keys array using the index for each slot
    const slot1Key = keys[slot1Index];
    const slot2Key = keys[slot2Index];
    const slot3Key = keys[slot3Index];
    // Get the DOM elements for each slot using their IDs
    const slot1 = document.getElementById('slot1');
    const slot2 = document.getElementById('slot2');
    const slot3 = document.getElementById('slot3');
   // Set the source src attribute of each slot's image to the corresponding fruit image
   //Support from https://www.w3schools.com/jsref/prop_img_src.asp 
    slot1.src = FRUITS[slot1Key];
    slot2.src = FRUITS[slot2Key];
    slot3.src = FRUITS[slot3Key];

    //Update the slot machine's array to the names of the keys:
    slotMachine = [slot1Key, slot2Key, slot3Key];
}

//Display message for winning and losing
function renderMessage() {
    if (win === null) {
        return null;
    } else if (win === true) {
        messageEl.innerHTML = 'YOU WIN!'
        playSound('sounds/jackpot.mp3');
    } else {
        messageEl.innerHTML = 'YOU LOSE!'
        playSound('sounds/lose.mp3');
    }
}


//Determines if "place bet" was a win or not
//Inspired by https://stackoverflow.com/questions/55663642/slot-machine-code-not-working-yet-has-no-error-message
function getWinner() {
    win = null;
    for (combo of winningCOMBOS) {
      const [slot1, slot2, slot3] = combo;
      if (
        slotMachine[0] === slot1 &&
        slotMachine[1] === slot2 &&
        slotMachine[2] === slot3
      ) {
        win = true;
        break;
      }
    } 
    if (!win) {
      win = false; 
    }
    return win;
}


//Adds double the bet or takes away bet from bank
function renderBank() {
    if (win === true) {
        bet *= 2;
        bank += bet;
        coinButton.disabled = false;
    } else if (win === false) {
        bank -= bet;
    } else {
        return bank;
    }
    bankAmount.innerText = '$' + bank;
    bet = 10;
    betAmount.innerText = '$' + bet;
}


//Handles if the bank is empty and forces user to start over.
function handleEmptyBank() {
    if (bank <= 0) {
        messageEl.innerHTML = 'GAME OVER! PLAY AGAIN?';
        hiddenButton.style.visibility = 'visible';
        placeBet.disabled = true;
        playSound('sounds/gameover.mp3');
    }
}


//Resets game when bank is empty
function resetGame() {
    init();
    messageEl.innerHTML = 'PLACE YOUR BET!';
    hiddenButton.style.visibility = 'hidden';
    placeBet.disabled = false;
    coinButton.disabled = false;
    bankAmount.innerText = '$' + bank;
    render();
}

//Sound Functions:
function playSound(sound) {
    const newAudio = new Audio(sound);
    newAudio.play();
}

function coinSound() {
    const coinAudio = new Audio('sounds/coin.mp3'); 
    coinAudio.play();
}

function buttonSound() {
    const buttonAudio = new Audio('sounds/plasticbutton.mp3');
    buttonAudio.play();
}

function handleBackgroundAudio() {
    const audioIcon = document.getElementById('audio-icon')
    if (audioPlayer.paused) {
        playAudio();
        audioIcon.src = 'images/sound-on.png';
    } else {
        pauseAudio();
        audioIcon.src = 'images/no-sound.png';
    }
  }

function playAudio() {
    audioPlayer.play();
    audioPlayer.volume = 0.1;
    }

function pauseAudio() {
    audioPlayer.pause();
  }

function render() {
    renderBet();
}

render();