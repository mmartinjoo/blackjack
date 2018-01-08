const readline = require('readline-sync');

// const readline = require('readline');
// const rl = readline.createInterface(process.stdin, process.stdout);


const CARDS = [
    { name: 'deuce', value: 2, symbol: '2', },
    { name: 'three', value: 3, symbol: '3' },
    { name: 'four', value: 4, symbol: '4' },
    { name: 'five', value: 5, symbol: '5' },
    { name: 'six', value: 6, symbol: '6' },
    { name: 'seven', value: 7, symbol: '7' },
    { name: 'eight', value: 8, symbol: '8' },
    { name: 'nine', value: 9, symbol: '9' },
    { name: 'ten', value: 10, symbol: '10' },
    { name: 'jack', value: 10, symbol: 'J' },
    { name: 'queen', value: 10, symbol: 'Q' },
    { name: 'king', value: 10, symbol: 'K' },
    { name: 'ace', value: 11, symbol: 'A' }          // 1
];

let currentTurn = 'player';

class BasePlayer {
    constructor() {
        this.cards = [];
    }

    get points() {
        return this.cards
            .map(c => c.value)
            .reduce((sum, value) => sum + value, 0);
    }

    addCard(card)  {
        this.cards.push(card);
    }

    addCards(cards) {
        cards.forEach(c => this.addCard(c));
    }

    cardsForDisplay() {
        return [
            this.getFirstCardSymbol(),
            ...this.getOtherCardsForDisplay()
        ].join(' ');
    }

    getFirstCardSymbol() {
        return this.cards[0].symbol;
    }

    getOtherCardsForDisplay() {
        return this.cards.slice(1);
    }

    turn() {
        throw new Error('Unimplemented');
    }
}

class Player extends BasePlayer {
    getOtherCardsForDisplay() {
        return super.getOtherCardsForDisplay().map(c => c.symbol);
    }

    turn() {
        const answer = readline.question('Kérsz lapot? ');
        return answer.toLowerCase() === 'y';
    }
}

class Dealer extends BasePlayer {
    getOtherCardsForDisplay() {
        return super.getOtherCardsForDisplay().map(c => 'X')
    }

    turn() {
        let result = false;
        if (this.points === 20 ||  this.points === 21) result = false;

        if (this.points === 19) {
            result = Math.random() < 0.05 ? true : false;
        }

        if (this.points === 18) {
            result = Math.random() < 0.25 ? true : false;
        }

        if (this.points === 17) {
            result = Math.random() < 0.4 ? true : false;
        }

        if (this.points === 16) {
            result = Math.random() < 0.75 ? true : false;
        }

        if (this.points === 15) {
            result = Math.random() < 0.9 ? true : false;
        }

        if (this.points < 15) {
            result = true;
        }

        if (result) {
            console.log('Dealer requested a card');
        } else {
            console.log('Dealer NOT requested a card');            
        }

        return result;
    }
}

function getRandomCard() {
    const r = Math.floor(Math.random() * CARDS.length);
    return CARDS[r];
}

function getRandomCards(n) {
    return Array(n).fill(0).map(_ => getRandomCard());
}

function initialDeal() {
    PLAYER.addCards(getRandomCards(2));
    DEALER.addCards(getRandomCards(2));
}

function displayState() {
    console.log('\r\n');
    console.log('Player points: ' + PLAYER.points);
    console.log('----');
    console.log('Player: ', PLAYER.cardsForDisplay());
    console.log('Dealer: ', DEALER.cardsForDisplay());
}

function nextTurn() {
    let needCard = false;
    console.log(currentTurn + ' turns');
    if (currentTurn === 'player') {
        needCard = PLAYER.turn();
    } else {
        needCard = DEALER.turn();
    }

    return needCard;
}

function flipTurn() {
    if (currentTurn === 'player') {
        currentTurn = 'dealer';
    } else {
        currentTurn = 'player';
    }
}

function dealCard() {
    const pl = currentTurn === 'player' ? PLAYER : DEALER;
    pl.addCard(getRandomCard());
}

function isGameOver() {
    if (PLAYER.points > 21) {
        return true;
    }

    return false;
}

const PLAYER = new Player();
const DEALER = new Dealer();

initialDeal();

while (!isGameOver()) {
    displayState();

    let res = nextTurn();
    if (res) {
        dealCard();
    }

    flipTurn();    
}

if (isGameOver()) {
    console.log('GAME OVER');
    
    displayState();    
    process.exit(-1);
}







// displayState();
// let res = nextTurn();
// if (res) {
//     dealCard();
// }

// flipTurn();
// displayState();

// if (isGameOver()) {
//     console.log('GAME OVER');
//     process.exit(-1);
// }

// res = nextTurn();
// if (res) {
//     dealCard();
// }

// flipTurn();
// displayState();