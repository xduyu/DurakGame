// Card deck
const deck = [];
for (let suit of ['Hearts', 'Diamonds', 'Clubs', 'Spades']) {
  for (let rank of ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']) {
    deck.push({ suit, rank });
  }
}

// Shuffle deck
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Deal cards
function dealCards() {
  shuffleDeck();
  const playerHand = deck.slice(0, 6);
  const botHand = deck.slice(6, 12);
  const table = deck.slice(12, 18);
  return { playerHand, botHand, table };
}

// Game logic
let game = dealCards();
let currentPlayer = 'player';

// Update game state
function updateGameState() {
  const playerHandElement = document.getElementById('player-hand');
  const botHandElement = document.getElementById('bot-hand');
  const tableElement = document.getElementById('table');

  playerHandElement.innerHTML = '';
  botHandElement.innerHTML = '';
  tableElement.innerHTML = '';

  game.playerHand.forEach((card) => {
    const cardElement = document.createElement('li');
    cardElement.textContent = `${card.rank} of ${card.suit}`;
    cardElement.addEventListener('click', () => {
      playCard(card);
    });
    playerHandElement.appendChild(cardElement);
  });

  game.botHand.forEach((card) => {
    const cardElement = document.createElement('li');
    cardElement.textContent = `${card.rank} of ${card.suit}`;
    botHandElement.appendChild(cardElement);
  });

  game.table.forEach((card) => {
    const cardElement = document.createElement('li');
    cardElement.textContent = `${card.rank} of ${card.suit}`;
    tableElement.appendChild(cardElement);
  });
}

// Play card
function playCard(card) {
  if (currentPlayer === 'player') {
    game.table.push(card);
    const index = game.playerHand.indexOf(card);
    game.playerHand.splice(index, 1);
    currentPlayer = 'bot';
  } else {
    // Bot plays a card
    const botCard = getBotCard();
    game.table.push(botCard);
    const index = game.botHand.indexOf(botCard);
    game.botHand.splice(index, 1);
    currentPlayer = 'player';
  }
  updateGameState();
}

// Draw card
function drawCard() {
  if (game.playerHand.length < 6) {
    const drawnCard = deck.pop();
    game.playerHand.push(drawnCard);
    updateGameState();
  }
}

// Get bot card
function getBotCard() {
  // Simple AI: play a random card from bot's hand
  const randomIndex = Math.floor(Math.random() * game.botHand.length);
  return game.botHand[randomIndex];
}

// Event listeners
document.getElementById('draw-button').addEventListener('click', drawCard);

updateGameState();