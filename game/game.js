
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
            let numAces = 0;
            for (let i = 0; i < this.cards.length; i++) {
                if (this.cards[i].value === 11) {
                    numAces++;
                }
            }
            if (sum > 21 && numAces > 0) {
                sum = sum - 10;
            }

            if (sum > 21 && numAces > 1) {
                sum = sum - 10;
            }

            if (sum > 21 && numAces > 2) {
                sum = sum - 10;
            }

            if (sum > 21 && numAces > 3) {
                sum = sum - 10;
            }

            return sum;
        }
        this.hit = function (hitCard) {
            this.cards.push(hitCard);
        }
    }
}

const SUITS = ['clubs', 'spades', 'diamonds', 'hearts'];
const dealerScore = document.getElementById('dealerScore');
const playerScore = document.getElementById('playerScore');
const playerZone = document.getElementById('playerZone');
const dealerZone = document.getElementById('dealerZone');
const headline = document.getElementById('headline');


let deck = [];
let playerHand = new Hand([]);
let dealerHand = new Hand([]);
let dealerHasBJ = false;
let playerHasBJ = false;
let isWon = false;


document.getElementById('hitButton').addEventListener('click', clickHit);
document.getElementById('stayButton').addEventListener('click', clickStay);
document.getElementById('resetButton').addEventListener('click', reset);


init();

function init() {
    genDeck();
    dealCards();
    dealerHasBJ = chkBJ(dealerHand.cards);
    playerHasBJ = chkBJ(playerHand.cards);
    render();
}


function render() {
    if (playerHasBJ && !dealerHasBJ) {
        isWon = true;
        toggleHeadline("YOU GOT BLACKJACK!!!");
    } else if (dealerHasBJ && !playerHasBJ) {
        isWon = true;
        toggleHeadline("DEALER GOT BLACKJACK. BETTER LUCK NEXT TIME");
    } else if (playerHasBJ && dealerHasBJ) {
        isWon = true;
        toggleHeadline("Y'ALL PUSHED");
    }

    renderPlayerCards();
    renderDealerCards();
    dealerScore.innerHTML = (isWon) ? dealerHand.value() : "?";
    playerScore.innerHTML = playerHand.value();
}

function genDeck() {
    const tempDeck = [];
    SUITS.forEach(function (suit) {
        for (card = 1; card <= 13; card++) {
            let curCardValue = card;
            if (card === 1) {
                curCardValue = 11;
            } else if (card > 10) {
                curCardValue = 10
            }
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
    if (!isWon) {
        playerHand.hit(deck.shift());
    }
    if (playerHand.value() > 21) {
        isWon = true;
        toggleHeadline("YOU BUSTED!");
    }
    render();
}

function clickStay(evt) {
    playDealer();

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
    dealerHand.cards.forEach(function (card, idx) {
        let newImage = document.createElement('img');
        newImage.src = (idx === 0) ? "../card-deck-css/images/backs/red.svg" : card.image;
        dealerZone.appendChild(newImage);
    });
    if (isWon) {
        dealerZone.firstChild.src = dealerHand.cards[0].image;
    }
}

function playDealer() {
    while (dealerHand.value() <= 16) {
        dealerHand.hit(deck.shift());
    }
    checkWinner();
}

function checkWinner() {
    isWon = true;
    render();
    if (dealerHand.value() > 21) {
        toggleHeadline('YOU WIN!');
    } else if (dealerHand.value() === playerHand.value()) {
        toggleHeadline('Round Pushed');
    } else if (dealerHand.value() > playerHand.value()) {
        toggleHeadline('Dealer WINS!');
    } else {
        toggleHeadline('YOU WIN!');
    }
}

function chkBJ(cardsToChk) {
    const hasAce = cardsToChk.map(function (card) {
        return card.value;
    }).includes(11);
    const hasTen = cardsToChk.map(function (card) {
        return card.value;
    }).includes(10);
    return (hasAce && hasTen);
}

function toggleHeadline(headlineText) {
    headline.innerHTML = headlineText;
    headline.style.display = 'grid';
}

function reset() {
    deck = [];
    dealerHand.cards = [];
    playerHand.cards = [];
    isWon = false;
    headline.style.display = 'none';
    init();
}