import Node from './Node'

export default class Trie {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const node = new Node()

    if (!this.root) {
      this.root = node;
    }

    let letters = [...data];
    let currentNode = this.root;

    for(let i = 0; i < letters.length; i++) {
      currentNode.children[letters[i]] = new Node();
      currentNode.children[letters[i]].letter = letters[i];
      currentNode = currentNode.children[letters[i]];
    }
    console.log(JSON.stringify(this.root, null, 4));
  }

  count() {

  }

  suggest() {

  }

  select() {

  }
}
