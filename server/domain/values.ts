export interface Value {
  name: string
  ranks: Array<number>
}

const values: Map<string, Value> = new  Map([
  ['2', {name: '2', ranks: [2]}],
  ['3', {name: '3', ranks: [3]}],
  ['4', {name: '4', ranks: [4]}],
  ['5', {name: '5', ranks: [5]}],
  ['6', {name: '6', ranks: [6]}],
  ['7', {name: '7', ranks: [7]}],
  ['8', {name: '8', ranks: [8]}],
  ['9', {name: '9', ranks: [9]}],
  ['t', {name: 't', ranks: [10]}],
  ['j', {name: 'j', ranks: [11]}],
  ['q', {name: 'q', ranks: [12]}],
  ['k', {name: 'k', ranks: [13]}],
  ['a', {name: 'a', ranks: [1, 14]}],
])

export default values
