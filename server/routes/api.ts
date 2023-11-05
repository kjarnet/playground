import express from 'express'
import {analyzeHand, cardToString, generateRandomHand, HandClass, stringToHand} from '../service/handService'

const router = express.Router();

router.get('/hand', function (req, res, next) {
    const hand = generateRandomHand();
    res.send({data: {hand: hand.map(cardToString), analysis: HandClass[analyzeHand(hand)]}});
});

router.get('/analysis', function (req, res, next) {
    const handString = req.query.hand as string
    const hand = stringToHand(handString)
    res.send({data: {hand: hand.map(cardToString), analysis: HandClass[analyzeHand(hand)]}});
});

export default router
