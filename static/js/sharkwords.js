const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;

// Loop over the chars in `word` and create divs.
//
const createDivsForChars = (word) => {
  // for char in word
  // add another char of div_class to 
  // the allotted spot in the html, called word-container
  // The class of the div is both "letter-box" and "${char}" because 
  // it will need to be called to hide or reveal its char later
  for (const char of word) {
    $('#word-container').append(`<div class="letter-box ${char}"></div>`);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  // for letter in alphabet
  // create a button that uses that letter as its class
  // and add it to the section of html that is called 'letter-buttons'
  for (const char of ALPHABET) {
    $('#letter-buttons').append(`<button class="${char}">${char}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  // Take the button HTML element
  $(buttonEl).attr('disabled', true);
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => {
  // if a letter in the word is passed in 
  // update the corresponding div,
  // giving it a value of ${letter} instead of leaving it undefined
  return $(`div.${letter}`)[0] !== undefined;
};

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter) => {
  // update blank_div to show its letter
  $(`div.${letter}`).html(letter);
};

// Called when `letter` is not in word.
//
// If the shark gets the person, disable all buttons and show the "play again"
// message. Otherwise, increment `numWrong` and update the shark image.
//
const handleWrongGuess = () => {
  // increment the 'numWrong' var
  // find the image that shows the 'numWrong' and display it
  // on the fifth 'numWrong' display a play again block element
  numWrong += 1;

  $('#shark-img img').attr('src', `/static/images/guess${numWrong}.png`);

  if (numWrong === 5) {
    $('button').attr('disabled', true);
    $('#play-again').css({ display: 'block' });
  }
};

//  Reset game state. Called before restarting the game.
//
const resetGame = () => {
  window.location = '/sharkwords';
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = 'hello';

  createDivsForChars(word);
  generateLetterButtons();

  $('button').on('click', (evt) => {
    const clickedBtn = $(evt.target);
    disableLetterButton(clickedBtn);

    const letter = clickedBtn.html();

    if (isLetterInWord(letter)) {
      handleCorrectGuess(letter);
    } else {
      handleWrongGuess(letter);
    }
  });

  $('#play-again').on('click', () => {
    resetGame();
  });
})();
