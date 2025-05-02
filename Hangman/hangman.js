let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
let hint = '';

function setWord() {
  let userWord = prompt("Enter a word for Hangman:").toLowerCase();
  
  while (!userWord || !/^[a-z]+$/.test(userWord)) {
    userWord = prompt("Invalid input. Please enter a valid word (letters only):").toLowerCase();
  }
  
  answer = userWord;

  // Now ask if they want to add a hint
  if (confirm("Would you like to add a hint?")) {
    hint = prompt("Enter your hint:");
    if (!hint) hint = "None";  // If they hit OK without typing anything
  } else {
    hint = "None";
  }
  
  document.getElementById('hint').innerHTML = 'Hint: ' + hint;
}

function generateButtons() {
  const rows = [
    'qwertyuiop',
    'asdfghjkl',
    'zxcvbnm'
  ];

  let keyboardHTML = '';

  rows.forEach(row => {
    keyboardHTML += '<div class="keyboard-row">';
    keyboardHTML += row.split('').map(letter =>
      `
        <button
          class="btn btn-lg btn-primary m-1"
          id='${letter}'
          onClick="handleGuess('${letter}')"
        >
          ${letter.toUpperCase()}
        </button>
      `
    ).join('');
    keyboardHTML += '</div>';
  });

  document.getElementById('keyboard').innerHTML = keyboardHTML;
}

function handleGuess(chosenLetter) {
  if (guessed.indexOf(chosenLetter) === -1) {
    guessed.push(chosenLetter);
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if (answer.indexOf(chosenLetter) >= 0) {
      guessedWord();
      checkIfGameWon();
    } else {
      mistakes++;
      updateMistakes();
      checkIfGameLost();
      updateHangmanPicture();
    }
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';

  setWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

// Initialize game
document.getElementById('maxWrong').innerHTML = maxWrong;

setWord();
generateButtons();
guessedWord();