export default class Node {
  constructor(letter = null) {
    this.letter = letter;
    this.isWord = false;
    this.frequency = 0;
    this.date = 0;
    this.children = {};
  }
}
