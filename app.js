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
const bankAmount = document.getElementById('bank-amount');
const betAmount = document.getElementById('bet-amount');
const messageEl = document.querySelector('h1');
const placeBet = document.getElementById('place-bet');
const coinButton = document.getElementById('coin-button');
const hiddenButton = document.getElementById('play-again');

const coinAudio = new Audio('sounds/coin.mp3'); 
const buttonAudio = new Audio('sounds/plasticbutton.mp3');
    // jackpot: 'sounds/jackpot.mp3',
    // spin: 'sounds/spin.mp3'

/*----- event listeners -----*/
coinButton.addEventListener('click', renderBet)
placeBet.addEventListener('click', startPlay);
hiddenButton.addEventListener('click', resetGame);
    //Sound event listeners
coinButton.addEventListener('click', function() {
    coinAudio.play();
});
placeBet.addEventListener('click', function() {
    buttonAudio.play();
});
hiddenButton.addEventListener('click', function() {
    buttonAudio.play();
});
/*----- functions -----*/
init();

function init() {
    slotMachine = [];
    bank = 100;
    bet = 0; //temporary fix. Can't figure out why bet was starting at $20
    win = null;
}

//WHY IS THIS STARTING AT $20?
//Adds bet to the bet container
function renderBet() {
    bet += 10;
    betAmount.innerText = '$' + bet;
}

//Start the game by clicking the 'Place Bet' Button
function startPlay() {
    renderResults();
    getWinner();
    renderMessage();
    renderBank();
    handleEmptyBank()
}

//When someone clicks the "place bet button"....
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
        playWinSound();
    } else {
        messageEl.innerHTML = 'YOU LOSE!'
        playLoseSound();
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
    } else if (win === false) {
        bank -= bet;
    } else {
        return bank;
    }
    bankAmount.innerText = '$' + bank;
    console.log(bank)
}

//Handles if the bank is empty and forces user to start over.
function handleEmptyBank() {
    if (bank <= 0) {
        messageEl.innerHTML = 'GAME OVER! PLAY AGAIN?';
        hiddenButton.style.visibility = 'visible';
        gameOverSound();
    }
}

//Resets game when bank is empty
function resetGame() {
    init();
    messageEl.innerHTML = 'PLACE YOUR BET!';
    hiddenButton.style.visibility = 'hidden';
    bankAmount.innerText = '$' + bank;
    render();
}

function playWinSound() {
    const audio = new Audio('sounds/jackpot.mp3');
    audio.play();
}

function playLoseSound() {
    const audio = new Audio('sounds/lose.mp3');
    audio.play();
}

function gameOverSound() {
    const audio = new Audio('sounds/gameover.mp3');
    audio.play();
}

function render() {
    renderBet();
}

render();