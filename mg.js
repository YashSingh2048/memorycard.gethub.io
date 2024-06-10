const cards = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

let firstCard = null;
let secondCard = null;
let matches = 0;
let timer = null;
let time = 0;

function startGame() {
    firstCard = null;
    secondCard = null;
    matches = 0;
    time = 0;
    clearInterval(timer);
    timer = setInterval(() => {
        time++;
        document.getElementById('time').innerText = time;
    }, 1000);

    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    const shuffledCards = shuffle(cards);

    shuffledCards.forEach(cardValue => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="front">${cardValue}</div>
            <div class="back">?</div>
        `;
        card.addEventListener('click', () => flipCard(card, cardValue));
        gameBoard.appendChild(card);
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function flipCard(card, cardValue) {
    if (card.classList.contains('flipped')) return;
    card.classList.add('flipped');

    if (!firstCard) {
        firstCard = { card, cardValue };
    } else {
        secondCard = { card, cardValue };
        checkMatch();
    }
}

function checkMatch() {
    if (firstCard.cardValue === secondCard.cardValue) {
        matches++;
        if (matches === cards.length / 2) {
            clearInterval(timer);
            alert(`You won! Time: ${time} seconds`);
        }
        resetCards();
    } else {
        setTimeout(() => {
            firstCard.card.classList.remove('flipped');
            secondCard.card.classList.remove('flipped');
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
}
