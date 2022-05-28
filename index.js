/* 
In Blackjack, it is favorable to the player when there are more Aces and 10 Value Cards (10’s, Jacks, Queens, and Kings) 
remaining in the shoe. So card counting is simply using a system to keep track of the ratio of low cards to high cards.
*/

let currentCount = 0

function genOneDeck(){
    const oneDeckOfCards = []
    for (let i = 1; i <= 13; i++) {
        for (let j = 0; j < 4; j++) {
            oneDeckOfCards.push(i);
        }
    }
    return oneDeckOfCards
}

/* Fisher-Yates shuffle */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function draw(CARDS){
    const drawnCard = CARDS.shift();
    console.log(`drawn card: ${drawnCard}`)
    console.log('deck after drawing: ', CARDS.length)
    
    /* UPDATE COUNT */
    currentCount += count(drawnCard)
    return drawnCard
}

function stats(CARDS){
    const stats = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
    };
    const cardsLeft = CARDS.length
    for (let card of CARDS) {
        stats[card] += 1/cardsLeft*100
    }
    return stats
}

/* 
If card is between 2 and 6 --> +1
If card is between 7 and 9 --> 0
If card is between 10 and Ace --> -1
*/


function count(card){
    if (card <= 1 || card >= 10) {
        return -1
    } else if (card <= 9 && card >= 7) {
        return 0
    } else {
        return 1
    }
}

const countValue = document.querySelector('#count')
countValue.textContent = currentCount
const allButtons = document.querySelectorAll('button')
allButtons.forEach(button => button.addEventListener('click', ()=> {
    const value = +button.parentNode.parentNode.firstElementChild.textContent
    let currentCount = +countValue.textContent
    currentCount += value
    countValue.textContent = currentCount
}))
