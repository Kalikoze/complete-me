import Node from './Node'

export default class Trie {
  constructor() {
    this.root = null;
    this.wordCount = 0;
  }

  insert(word) {
    if (!this.root) {
      this.root = new Node();
    }

    let letters = [...word.toLowerCase()];
    let currentNode = this.root;

    letters.forEach(letter => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];
    })

    if (!currentNode.isWord) {
      currentNode.isWord = true;
      currentNode.value = word;
      this.wordCount++
    }

    // console.log(JSON.stringify(this.root, null, 4))
  }

  count() {
    return this.wordCount
  }

  suggest(word) {
    let letters = [...word]
    let currNode = this.root;
    let suggestionsArray = [];

    for (let i = 0; i < letters.length; i++) {
      currNode = currNode.children[letters[i]]
    }

    //currNode now refers to the last letter in our word

    var traverseTheTrie = (word, currNode) => {
      let keys = Object.keys(currNode.children);
      for (let k = 0; k < keys.length; k++) {
        const child = currNode.children[keys[k]];
        var newString = word + child.letter;
        if (child.isWord) {
          suggestionsArray.push(newString);
        }
        traverseTheTrie(newString, child);
      }
    }

    if (currNode && currNode.isWord) {
      suggestionsArray.push(word);
    }

    if (currNode) {
      traverseTheTrie(word, currNode);
    }
    return suggestionsArray;
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }

  select() {

  }
}
