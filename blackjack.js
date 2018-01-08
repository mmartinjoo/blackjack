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
    { name: 'deuce', value: 2 },
    { name: 'three', value: 3 },
    { name: 'four', value: 4 },
    { name: 'five', value: 5 },
    { name: 'six', value: 6 },
    { name: 'seven', value: 7 },
    { name: 'eight', value: 8 },
    { name: 'nine', value: 9 },
    { name: 'ten', value: 10 },
    { name: 'jack', value: 10 },
    { name: 'queen', value: 10 },
    { name: 'king', value: 10 },    
    { name: 'ace', value: 11 }          // 1
];

let currentTurn = 'player';

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

    getFirstCard() {
        return this.cards[0];
    }
}

class Player extends BasePlayer {

}

class Dealer extends BasePlayer {

}

function getRandomCard() {
    const r = Math.floor(Math.random() * CARDS.length);
    return CARDS[r];
}

function getRandomCards(n) {
    return Array(n).fill(0).map(_ => getRandomCard());
}

function initialDeal(player, dealer) {
    player.addCards(getRandomCards(2));
    dealer.addCards(getRandomCards(2));
}

const player = new Player();
const dealer = new Dealer();

initialDeal(player, dealer);
console.log(player.getFirstCard());