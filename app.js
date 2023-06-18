/*----- constants -----*/
const FRUITS = {
    seven : 'images/Seven.png',
    cherries: 'images/Cherries.png',
    lemon : 'images/Lemon.png',
    watermelon : 'images/Watermelon.png'
}

const winningCOMBOS = [
    ['seven', 'seven', 'seven'],
    ['cherries', 'cherries', 'cherries'],
    ['lemon', 'lemon', 'lemon'],
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

/*----- event listeners -----*/
coinButton.addEventListener('click', renderBet)
placeBet.addEventListener('click', startPlay);

/*----- functions -----*/
init();

function init() {
    slotMachine = {
        slot1: 'seven',
        slot2: 'cherries',
        slot3: 'lemon'
    };
    bank = 0;
    bet = 0;
    win = null;
    render();
}

//Display random fruit in each slot of the slot machine
function renderResults() {
    const keys = Object.keys(FRUITS);
    for (let i = 1; i <= 3; i++) {
        const randomIndex = Math.floor(Math.random() * keys.length);
        const randomKey = keys[randomIndex];
        const randomFruit= FRUITS[randomKey];
        const slot = document.getElementById(`slot${i}`);
        slot.src = randomFruit;
    }
}

//WHY IS THIS SHOWING YOU LOSE WHEN INITIALIZED AND NOT RECOGNIZING WINNER?
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
    
}

//NOT FULL WORKING, NEED TO MESS WITH
//Determines if "spin" was a win or not
function getWinner() {
    if (slotMachine === winningCOMBOS[0] || slotMachine === winningCOMBOS[1] || slotMachine === winningCOMBOS[2] || slotMachine === winningCOMBOS[3]) {
        win = true;
    } else {
        win = false;
    }
}

function startPlay() {
    getWinner();
    renderResults();
    renderMessage();
}

function render() {
    renderBet();
    renderBank();
}

render();