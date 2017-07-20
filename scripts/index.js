import Trie from './Trie';
import words from './words'

const searchTrie = new Trie()

$(document).ready(populateDictionary)
$('#suggested-word').on('input', () => {
  if ($('#suggested-word').val() === '') {
    $('button').remove();
  } else {
    filterList();
  }
})

function populateDictionary () {
  searchTrie.populate(words)
}

function filterList() {
  let string = $('#suggested-word').val().toLowerCase();
  let suggestions = searchTrie.suggest(string);
  $('button').remove();

  for(let i = 0; i < 10; i++) {
    if (suggestions[i] !== undefined) {
      $('aside').append(`<button class="suggestions">${suggestions[i]}</button>`)
    }
  }
}

function selectWord(e) {
  let selected = e.target.innerHTML;
  searchTrie.select(selected);
  filterList();
}

$('aside').on('click', '.suggestions', selectWord);
