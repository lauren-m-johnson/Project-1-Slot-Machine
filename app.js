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

/*----- event listeners -----*/


/*----- functions -----*/
init();

function init() {
    slotMachine = {
        slot1: 'seven',
        slot2: 'cherries',
        slot3: 'lemon'
    };
    bank = '$100';
    bet = '$0';
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

function renderMessage() {
    if (win === null) {
        return null;
    } else if (win === true) {
        messageEl.innerHTML = 'YOU WIN!'
    } else {
        messageEl.innerHTML = 'YOU LOSE!'
    }
}

function renderBet() {

}

function renderBank() {

}

function getWinner() {
    if (slotMachine === winningCOMBOS[0] || slotMachine === winningCOMBOS[1] || slotMachine === winningCOMBOS[2] || slotMachine === winningCOMBOS[3]) {
        win = true;
    } else {
        win = false;
    }
    renderMessage();
}

function render() {
    renderResults();
    renderMessage();
    renderBet();
    renderBank();
}

render();