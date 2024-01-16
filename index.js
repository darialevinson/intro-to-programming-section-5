const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;



// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {


  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  if ( guess < 1 || guess > 99) {
    alert('Please enter a number between 1 and 99.');
    return;
  }
  attempts = attempts + 1;
  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  const remainingAttempts = maxNumberOfAttempts - attempts;
  if (guess !== targetNumber && remainingAttempts > 0) {
    if (guess < targetNumber) {
        tooLowMessage.style.display = ''; // Show the "too low" message
        tooLowMessage.textContent = 'You guessed too low. Try again.';
        tooHighMessage.style.display = 'none'; // Hide the "too high" message
    } else {
        tooHighMessage.style.display = ''; // Show the "too high" message
        tooHighMessage.textContent = 'You guessed too high. Try again.';
        tooLowMessage.style.display = 'none'; // Hide the "too low" message
    }
}
if (attempts < maxNumberOfAttempts && guess !== targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
} else if (attempts === maxNumberOfAttempts && guess !== targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.textContent = '0 guesses remaining';
}
  guessInput.value = '';

  resetButton.style.display = '';
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  
    // Hide reset button and messages
    resetButton.style.display = 'none';
    for (let message of messages) {
      message.style.display = 'none';
}
}
submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
