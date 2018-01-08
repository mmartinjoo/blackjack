// const readline = require('readline');
// const rl = readline.createInterface(process.stdin, process.stdout);

// rl.setPrompt('Kérsz lapot?');
// rl.prompt();

// rl.on('line', function(line) {
//     if (line === "right") rl.close();
//     rl.prompt();
// }).on('close',function(){
//     process.exit(0);
// });

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

let currentTurn = 'dealer';

class BasePlayer {
    constructor () {
        this.cards = [];
    }

    get points() {
        return this.cards
            .map(c => c.value)
            .reduce((sum, value) => sum + value, 0);
    }

    addCard(card) {
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

    }
}

class Dealer extends BasePlayer {
    getOtherCardsForDisplay() {
        return super.getOtherCardsForDisplay().map(c => 'X')
    }

    turn() {
        if (this.points === 20 || this.points === 21) return false;

        if (this.points === 19) {
            return Math.random() < 0.05 ? true : false;            
        }

        if (this.points === 18) {
            return Math.random() < 0.25 ? true : false;
        }

        if (this.points === 17) {
            return Math.random() < 0.4 ? true : false;            
        }

        if (this.points === 16) {
            return Math.random() < 0.75 ? true : false;
        }

        if (this.points === 15) {
            return Math.random() < 0.9 ? true : false;               
        }

        if (this.points < 15) {
            return true;
        }
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
    console.log('Player points: ' + PLAYER.points);
    console.log('----');
    console.log('Player: ', PLAYER.cardsForDisplay());
    console.log('Dealer: ', DEALER.cardsForDisplay());
}

function nextTurn() {
    let needCard = false;
    if (currentTurn === 'player') {
        needCard = PLAYER.turn();
        currentTurn = 'dealer';
    } else {
        needCard = DEALER.turn();
        currentTurn = 'player';
    }

    return needCard;
}

const PLAYER = new Player();
const DEALER = new Dealer();

initialDeal();
displayState();
console.log('Dealer points: ', DEALER.points);
const res = nextTurn();
console.log(res);