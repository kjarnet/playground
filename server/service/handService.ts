import suits, {Suit} from '../domain/suits'
import values, {Value} from '../domain/values'

const HAND_SIZE = 5;

export enum HandClass {
    HighCard,
    OnePair,
    TwoPair,
    ThreeOfAKind,
    Straight,
    Flush,
    FullHouse,
    FourOfAKind,
    StraightFlush
}

interface Card {
    suit: Suit
    value: Value
}

function cardToString(card: Card) {
    return card.suit.short + card.value.name
}

function stringToCard(cardString: string): Card {
    const suitString = cardString.charAt(0);
    const valueString = cardString.charAt(1);
    const suit = Object.values(suits).find(s => {
        return s.short === suitString;
    })
    if (!suit) {
        throw new Error(`Invalid suit ${suitString}`)
    }
    const value = values[valueString];
    if (!value) {
        throw new Error(`Invalid value ${valueString}`)
    }
    return { suit, value};
}

function stringToHand(handString: string): Card[] {
    if (handString.length !== (HAND_SIZE * 2)) {
        throw new Error('Invalid hand size')
    }
    const cardStrings = handString.match(/.{1,2}/g) as string[]
    return cardStrings.map(stringToCard)
}

function generateDeck(): Card[] {
    return Object.values(suits).flatMap((suit: Suit) => Object.values(values).map((value: Value) => ({suit: suit, value: value})))
}


function generateRandomHand() {
    const shuffled = generateDeck().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, HAND_SIZE);
}

// https://nsayer.blogspot.com/2007/07/algorithm-for-evaluating-poker-hands.html
function analyzeHand(hand: Card[]): HandClass {
    if (hand.length !== HAND_SIZE) {
        throw new Error(`Invalid hand size - ${hand.length}, expected ${HAND_SIZE}`)
    }
    const counts = countGroups(hand)
    if (counts.length === 4) {
        return HandClass.OnePair
    }
    if (counts[0][1] === 4) {
        return HandClass.FourOfAKind
    }
    if (counts[0][1] === 2 && counts[1][1] === 2) {
        return HandClass.TwoPair
    }
    if (counts[0][1] === 3) {
        if (counts[1][1] === 2) {
            return HandClass.FullHouse
        }
        if (counts[1][1] === 1) {
            return HandClass.ThreeOfAKind
        }
    }
    const handIsFlush = isFlush(hand)
    const handIsStraight = isStraight(hand)
    if (handIsFlush) {
        if (handIsStraight) {
            return HandClass.StraightFlush
        }
        return HandClass.Flush
    }
    if (handIsStraight) {
        return HandClass.Straight
    }
    return HandClass.HighCard
}

function countGroups(hand: Card[]): Array<[Value, number]> {
    const groups = hand
        .reduce(function (acc, curr) {
            acc.get(curr.value) ? acc.set(curr.value, acc.get(curr.value) + 1) : acc.set(curr.value, 1)
            return acc
        }, new Map())
        .entries()
    return Array.from(groups)
        .sort((a: [Value, number], b: [Value, number]) => b[1] - a[1]);
}


function isFlush(hand: Card[]): boolean {
    return new Set(hand.map(c => c.suit)).size === 1
}

function isStraight(hand: Card[]): boolean {
    const sortedHandValues = hand.map(c => c.value.rank).sort((a, b) => b - a)
    return isNormalStraight(sortedHandValues) || isWheelStraight(sortedHandValues)
}

function isNormalStraight(sortedHandValues: number[]): boolean {
    return (sortedHandValues[0] - sortedHandValues[sortedHandValues.length - 1]) === 4
}

function isWheelStraight(sortedHandValues: number[]): boolean {
    return sortedHandValues[0] === values['a'].rank && sortedHandValues[1] === 5
}

export {
    cardToString,
    stringToHand,
    generateRandomHand,
    analyzeHand
}
