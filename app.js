/*----- constants -----*/
const FRUITS = {
    seven : {img: 'images/Seven.png', value: '0'},
    cherries : {img: 'images/Cherries.png', value: '1'},
    lemon : {img: 'images/Lemon.png', value: '2'},
    watermelon : {img: 'images/Watermelon.png', value: '3'},
}

const winningCOMBOS = [
    [0, 0, 0],
    [1, 1, 1],
    [2, 2, 2],
    [3, 3, 3]
]

/*----- state variables -----*/
let slotMachine; //array for each slot result
let bank;
let bet;

/*----- cached elements  -----*/
const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');

bank = document.getElementById('bank-amount');
bet = document.getElementById('bet-amount');

/*----- event listeners -----*/


/*----- functions -----*/
init();

function init() {
    slotMachine = {
        slot1: 0,
        slot2: 1,
        slot3: 2
    };
    bank = '$100';
    bet = '$0';
    render();
}

function render() {
    
}
