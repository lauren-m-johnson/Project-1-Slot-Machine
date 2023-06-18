/*----- constants -----*/
const FRUITS = {
    'seven' : 'images/Seven.png',
    'cherries': 'images/Cherries.png',
    'lemon' : 'images/Lemon.png'
}

const winningCOMBOS = [
    ['seven', 'seven', 'seven'],
    ['cherries', 'cherries', 'cherries'],
    ['lemon', 'lemon', 'lemon']
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


/*----- event listeners -----*/
coinButton.addEventListener('click', renderBet)
placeBet.addEventListener('click', startPlay);

/*----- functions -----*/
init();

function init() {
    slotMachine = [];
    bank = 0;
    bet = 0;
    win = null;
    render();
}

//Display random fruit in each slot of the slot machine
function renderResults() {
    // Get the keys of the FRUITS object and store them in an array
    const keys = Object.keys(FRUITS);
    // Generate a random index for each slot's index
    const slot1Index = Math.floor(Math.random() * keys.length);
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
    slot1.src = FRUITS[slot1Key];
    slot2.src = FRUITS[slot2Key];
    slot3.src = FRUITS[slot3Key];

    //Update the slot machine's array to the names of the keys:
    slotMachine = [slot1Key, slot2Key, slot3Key];
    console.log(slotMachine);
  }


//PRETTY SURE THIS IS WORKING AND ISSUE IS IN getWinner();
//Display message for winning and losing
function renderMessage() {
    if (win === null) {
        return null;
    } else if (win === true) {
        messageEl.innerHTML = 'YOU WIN!'
    } else {
        messageEl.innerHTML = 'YOU LOSE!'
    }
}

//Adds bet to the bet container
function renderBet() {
    bet += 10;
    betAmount.textContent = '$' + bet;
}

//Adds or takes away bet from bank
function renderBank() {
    if (win === true) {
        bank += bet;
        bankAmount.textContent = '$' + bank;
    }
}

//Determines if "place bet" was a win or not
function getWinner() {
    for (combo of winningCOMBOS) {
      const [slot1, slot2, slot3] = combo;
      if (
        slotMachine[0] === slot1 &&
        slotMachine[1] === slot2 &&
        slotMachine[2] === slot3
      ) {
        win = true;
    }
  }
  if (!win) {
    win = false; 
  }
  return win;
}

//Start the game by clicking the 'Place Bet' Button
function startPlay() {
    renderResults();
    getWinner();
    renderMessage();
}

function render() {
    renderBet();
    renderBank();
}

render();