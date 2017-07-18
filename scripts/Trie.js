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

    console.log(JSON.stringify(this.root, null, 4))
  }

  count() {
    return this.wordCount
  }

  suggest(data) {
    let letters = [...data.toLowerCase()];
    let currentNode = this.root;
    const suggestions = [];

    letters.forEach(letter => {
      currentNode = currentNode.children[letter];
    })

    if (!currentNode.children) {
      suggestions.push(currentNode.value);
    }

    while(currentNode.children) {
      if (currentNode.isWord) {
        suggestions.push(currentNode.value);
        currentNode = currentNode.children;
      }
    }

    if(currentNode.isWord) {
      suggestions.push(currentNode.value)
    }
    return suggestions;
  }

  select() {

  }
}
