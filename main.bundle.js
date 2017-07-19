/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Node {
  constructor(letter = null) {
    this.letter = letter;
    this.isWord = false;
    this.frequency = 0;
    this.date = 0;
    this.children = {};
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Node;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Node__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Trie__ = __webpack_require__(2);



const suggested = document.querySelector('#suggested-word');
const button = document.querySelector('.submit');

console.log('stuff');

button.addEventListener('click', insertWord);

function insertWord() {
console.log('stuff')
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Node__ = __webpack_require__(0);


class Trie {
  constructor() {
    this.root = null;
    this.wordCount = 0;
  }

  insert(word) {
    if (!this.root) {
      this.root = new __WEBPACK_IMPORTED_MODULE_0__Node__["a" /* default */]();
    }

    let letters = [...word.toLowerCase()];
    let currentNode = this.root;

    letters.forEach(letter => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new __WEBPACK_IMPORTED_MODULE_0__Node__["a" /* default */](letter);
      }
      currentNode = currentNode.children[letter];
    })

    if (!currentNode.isWord) {
      currentNode.isWord = true;
      this.wordCount++
    }
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
/* unused harmony export default */



/***/ })
/******/ ]);