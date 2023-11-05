import {describe, expect, test} from '@jest/globals';

import {analyzeHand, cardToString, generateRandomHand, HandClass, stringToHand} from '../handService'
import suits from '../../domain/suits'
import values from '../../domain/values'

describe('cardToString', () => {
    test('returns correct name', () => {
        expect(cardToString({suit: suits.diamonds, value: values['2']})).toBe('d2');
        expect(cardToString({suit: suits.clubs, value: values['a']})).toBe('ca');
    });
});

describe('stringToHand', () => {
    test('returns hand of correct cards', () => {
        const hand = stringToHand('dahjhqstc2')
        expect(hand.length).toBe(5)
        expect(hand[0]).toEqual({suit: suits.diamonds, value: values['a']})
        expect(hand[1]).toEqual({suit: suits.hearts, value: values['j']})
        expect(hand[2]).toEqual({suit: suits.hearts, value: values['q']})
        expect(hand[3]).toEqual({suit: suits.spades, value: values['t']})
        expect(hand[4]).toEqual({suit: suits.clubs, value: values['2']})
    });
});

describe('generateRandomHand', () => {
    test('returns a full hand', () => {
        const hand = generateRandomHand();
        expect(hand.length).toBe(5);
        const firstCard = hand[0]
        expect(typeof firstCard.value.name).toBe('string')
        expect(typeof firstCard.value.rank).toBe('number')
        expect(typeof firstCard.suit.name).toBe('string')
        expect(typeof firstCard.suit.short).toBe('string')
    });
});


describe('analyzeHand', () => {
    test('throws on wrong hand size', () => {
        expect(() => {
            analyzeHand([
                {suit: suits.diamonds, value: values['3']},
                {suit: suits.diamonds, value: values['4']}
            ]);
        }).toThrow('Invalid hand size - 2, expected 5')
    });

    test('identifies a straight flush', () => {
        const hand = [
            {suit: suits.diamonds, value: values['3']},
            {suit: suits.diamonds, value: values['4']},
            {suit: suits.diamonds, value: values['2']},
            {suit: suits.diamonds, value: values['6']},
            {suit: suits.diamonds, value: values['5']},
        ]
        expect(HandClass[analyzeHand(hand)]).toBe('StraightFlush')
    })

    test('identifies a normal straight', () => {
        const hand = [
            {suit: suits.diamonds, value: values['3']},
            {suit: suits.clubs, value: values['4']},
            {suit: suits.diamonds, value: values['2']},
            {suit: suits.diamonds, value: values['6']},
            {suit: suits.diamonds, value: values['5']},
        ]
        expect(HandClass[analyzeHand(hand)]).toBe('Straight')
    })

    test('identifies a wheel straight', () => {
        const hand = [
            {suit: suits.diamonds, value: values['3']},
            {suit: suits.clubs, value: values['4']},
            {suit: suits.diamonds, value: values['2']},
            {suit: suits.diamonds, value: values['a']},
            {suit: suits.diamonds, value: values['5']},
        ]
        expect(HandClass[analyzeHand(hand)]).toBe('Straight')
    })

    test('identifies four of a kind', () => {
        const hand = [
            {suit: suits.diamonds, value: values['3']},
            {suit: suits.diamonds, value: values['4']},
            {suit: suits.spades, value: values['3']},
            {suit: suits.clubs, value: values['3']},
            {suit: suits.hearts, value: values['3']},
        ]
        expect(HandClass[analyzeHand(hand)]).toBe('FourOfAKind')
    })

    test('identifies a full house', () => {
        const hand = [
            {suit: suits.diamonds, value: values['3']},
            {suit: suits.diamonds, value: values['4']},
            {suit: suits.spades, value: values['3']},
            {suit: suits.clubs, value: values['3']},
            {suit: suits.hearts, value: values['4']},
        ]
        expect(HandClass[analyzeHand(hand)]).toBe('FullHouse')
    })

    test('identifies three of a kind', () => {
        const hand = [
            {suit: suits.diamonds, value: values['3']},
            {suit: suits.diamonds, value: values['5']},
            {suit: suits.spades, value: values['3']},
            {suit: suits.clubs, value: values['3']},
            {suit: suits.hearts, value: values['4']},
        ]
        expect(HandClass[analyzeHand(hand)]).toBe('ThreeOfAKind')
    })

    test('identifies a pair', () => {
        const hand = [
            {suit: suits.diamonds, value: values['3']},
            {suit: suits.diamonds, value: values['5']},
            {suit: suits.spades, value: values['3']},
            {suit: suits.clubs, value: values['t']},
            {suit: suits.hearts, value: values['4']},
        ]
        expect(HandClass[analyzeHand(hand)]).toBe('OnePair')
    })

    test('identifies two pairs', () => {
        const hand = [
            {suit: suits.diamonds, value: values['3']},
            {suit: suits.diamonds, value: values['5']},
            {suit: suits.spades, value: values['5']},
            {suit: suits.clubs, value: values['3']},
            {suit: suits.hearts, value: values['4']},
        ]
        expect(HandClass[analyzeHand(hand)]).toBe('TwoPair')
    })

    test('identifies high card', () => {
        const hand = [
            {suit: suits.diamonds, value: values['3']},
            {suit: suits.diamonds, value: values['6']},
            {suit: suits.spades, value: values['5']},
            {suit: suits.clubs, value: values['8']},
            {suit: suits.hearts, value: values['4']},
        ]
        expect(HandClass[analyzeHand(hand)]).toBe('HighCard')
    })
});

