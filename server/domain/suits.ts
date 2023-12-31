export interface Suit {
  name: string
  short: string
}

const suits: {[name: string]: Suit} = {
  diamonds: {name: 'diamonds', short: 'd'},
  clubs: {name: 'clubs', short: 'c'},
  spades: {name: 'spades', short: 's'},
  hearts: {name: 'hearts', short: 'h'}
}

export default suits
