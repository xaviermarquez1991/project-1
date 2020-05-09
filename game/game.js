// =================================CONSTANTS====================================================//

class Card {
    constructor(cardValue, cardImage) {
        this.value = cardValue;
        this.image = cardImage;
    }
}

class Hand {
    constructor(cardsInHand) {
        this.cards = cardsInHand;
        this.value = function () {
            let sum = 0;
            this.cards.forEach((curCard) => {
                sum = sum + curCard.value;
            });
            return sum;
        }
        this.hit = function (hitCard) {
            this.cards.push(hitCard);
        }
    }
}


const SUITS = ['clubs', 'spades', 'diamonds', 'hearts'];

const dealerImage = document.getElementById('dealerCard1');
const dealerImage2 = document.getElementById('dealerCard2');
const playerImage = document.getElementById('playerCard1');
const playerImage2 = document.getElementById('playerCard2');

const dealerScore = document.getElementById('dealerScore');
const playerScore = document.getElementById('playerScore');


console.log(dealerImage);

//==================================STATE ELEMENTS=============================================//





//===============================CACHED ITEMS==========================================================//

let deck = [];
let userHand = new Hand([]);
let dealerHand = new Hand([]);



//======================================EVENT LISTERNERS=====================================//







//========================================FUNCTION==============================================//

init();

function init() {

    genDeck();
    dealCards();
    render();
}


function render() {
    dealerImage.src = dealerHand.cards[0].image;
    dealerImage2.src = dealerHand.cards[1].image;
    playerImage.src = userHand.cards[0].image;
    playerImage2.src = userHand.cards[1].image;

    dealerScore.innerHTML = dealerHand.value();
    playerScore.innerHTML = userHand.value();

    

}

function genDeck() {
    const tempDeck = [];
    SUITS.forEach(function (suit) {
        for (card = 1; card <= 13; card++) {
            let curCardValue = (card > 10) ?
                10 :
                card;
            const curCard = new Card(curCardValue, `../card-deck-css/images/${suit}/${suit}-${card}.svg`);
            tempDeck.push(curCard);
        }
    });
    randomizeDeck(tempDeck);
}

function randomizeDeck(startDeck) {
    while (startDeck.length) {
        const randomIdx = Math.floor(Math.random() * startDeck.length);
        deck.push(startDeck.splice(randomIdx, 1)[0]);
    }
}

function dealCards() {
    userHand.cards.push(deck.shift());
    dealerHand.cards.push(deck.shift());
    userHand.cards.push(deck.shift());
    dealerHand.cards.push(deck.shift());
}