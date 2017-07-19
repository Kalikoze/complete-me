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
    const traverseTheTrie = (word, currNode) => {
      let keys = Object.keys(currNode.children);
      for (let k = 0; k < keys.length; k++) {
        const child = currNode.children[keys[k]];
        var newString = word + child.letter;
        if (child.isWord) {
          suggestionsArray.push({name: newString,
                                frequency: child.frequency,
                                date: child.date});
        }
        traverseTheTrie(newString, child);
      }
    }

    if (currNode && currNode.isWord) {
      suggestionsArray.push({name: word,
                            frequency: currNode.frequency,
                            date: currNode.date});
    }

    if (currNode) {
      traverseTheTrie(word, currNode);
    }

    suggestionsArray.sort((a, b) => {
      return b.frequency - a.frequency || b.date - a.date;
    })

    return suggestionsArray.map(object => {
      return object.name;
    });
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }

  select(word) {
    let lettersArray = [...word];
    let currentNode = this.root;

    lettersArray.forEach(letter => {
      currentNode = currentNode.children[letter];
    })
    currentNode.frequency++
    currentNode.date = Date.now();
  }
}
