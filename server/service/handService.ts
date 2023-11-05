import suits, {Suit} from '../domain/suits'
import values, {Value} from '../domain/values'

const HAND_SIZE = 5;

interface Card {
  suit: Suit
  value: Value
}

function cardToString(card: Card) {
  return card.suit.short + card.value.name
}

function generateDeck(): Array<Card> {
  return Array.from(suits.values()).flatMap((suit: Suit) => Array.from(values.values()).map((value: Value) => ({suit: suit, value: value})))
}


function generateRandomHand() {
  const shuffled = generateDeck().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, HAND_SIZE);
}

export {
  cardToString,
  generateRandomHand
}
