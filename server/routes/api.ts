import express from 'express'
import { cardToString, generateRandomHand } from '../service/handService'

const router = express.Router();

router.get('/hand', function(req, res, next) {
  res.send('hand: ' + generateRandomHand().map(cardToString).join());
});

router.get('/analysis', function(req, res, next) {
  res.send('respond with a resource');
});

export default router
