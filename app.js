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
let slotMachine; //array for each slot result
let bank;
let bet;

/*----- cached elements  -----*/
bank = document.getElementById('bank-amount');
bet = document.getElementById('bet-amount');

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

}

function renderBet () {

}

function renderBank() {

}

function render() {
    renderResults();
    renderMessage();
    renderBet();
    renderBank();
}
