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

// const dealerImage = document.getElementById('dealerCard1');
// const dealerImage2 = document.getElementById('dealerCard2');
// const playerImage = document.getElementById('playerCard1');
// const playerImage2 = document.getElementById('playerCard2');

const dealerScore = document.getElementById('dealerScore');
const playerScore = document.getElementById('playerScore');
const playerZone = document.getElementById('playerZone');
const dealerZone = document.getElementById('dealerZone');




//==================================STATE ELEMENTS=============================================//





//===============================CACHED ITEMS==========================================================//

let deck = [];
let playerHand = new Hand([]);
let dealerHand = new Hand([]);
let pTurn = true;
let isWon = false;

//======================================EVENT LISTERNERS=====================================//

document.getElementById('hitButton').addEventListener('click', clickHit);





//========================================FUNCTION==============================================//

init();

function init() {

    genDeck();
    dealCards();
    render();
}


function render() {

    renderPlayerCards();
    renderDealerCards();
    dealerScore.innerHTML = dealerHand.value();
    playerScore.innerHTML = playerHand.value();

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
    playerHand.cards.push(deck.shift());
    dealerHand.cards.push(deck.shift());
    playerHand.cards.push(deck.shift());
    dealerHand.cards.push(deck.shift());
}


function clickHit(evt) {
    if (pTurn) {
        playerHand.hit(deck.shift());
    } else {
        dealerHand.hit(deck.shift());
    }
    render();
}

function renderPlayerCards() {
    while (playerZone.hasChildNodes()) {
        playerZone.removeChild(playerZone.firstChild);
    }
    playerHand.cards.forEach(function (card) {
        let newImage = document.createElement("img");
        newImage.src = card.image;
        playerZone.appendChild(newImage);
    });
}


function renderDealerCards() {
    while (dealerZone.hasChildNodes()) {
        dealerZone.removeChild(dealerZone.firstChild);
    }
    dealerHand.cards.forEach(function (card) {
        let newImage = document.createElement('img');
        newImage.src = card.image;
        dealerZone.appendChild(newImage);
    })
}