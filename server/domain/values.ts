export interface Value {
  name: string
  rank: number
}

const values: {[name: string]: Value} = {
  '2': {name: '2', rank: 2},
  '3': {name: '3', rank: 3},
  '4': {name: '4', rank: 4},
  '5': {name: '5', rank: 5},
  '6': {name: '6', rank: 6},
  '7': {name: '7', rank: 7},
  '8': {name: '8', rank: 8},
  '9': {name: '9', rank: 9},
  't': {name: 't', rank: 10},
  'j': {name: 'j', rank: 11},
  'q': {name: 'q', rank: 12},
  'k': {name: 'k', rank: 13},
  'a': {name: 'a', rank: 14},
}

export default values
