//Array of sentences for the typing test.
let texts = [
    "A journey of a thousand miles begins with a single step.",
    "Curiosity killed the cat, but satisfaction brought it back.",
    "Every man is the architect of his own fortune.",
    "You can lead a horse to water, but you can not make it drink.",
    "A bird in the hand is worth two in the bush.",
    "When the going gets tough, the tough get going.",
    "Do not count your chickens before they are hatched."
];

// DOM element references
const textToTypeElement = document.getElementById('text-to-type');
const inputArea = document.getElementById('input-area');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const restartButton = document.getElementById('restart-button');

//Variables for tracking test start time and interval.
let startTime, timerInterval;

//Adds event listeners for typing input, restart button, and Enter keypress.
inputArea.addEventListener('input', updateStatistics);
restartButton.addEventListener('click',restartTest);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        restartTest();
    }
});

/**
 * Updates typing statistics such as time elapsed, words per minute, and accuracy.
 */
function updateStatistics() {
    let elapsedTime = (Date.now() - startTime) / 1000;
    let typedText = inputArea.value;
    let wordsTyped = typedText.split(/\s+/).filter(word => word.length > 0).length;
    let correctChars = countCorrectCharacters(typedText, textToTypeElement.innerText);
    let accuracy = (correctChars / textToTypeElement.innerText.length) * 100;

    timerElement.innerText = `Time: ${Math.floor(elapsedTime)}s`;
    wpmElement.innerText = `Words per Minute: ${Math.floor((wordsTyped / elapsedTime) * 60)}`;
    accuracyElement.innerText = `Accuracy: ${Math.floor(accuracy)}%`;

    highlightText(typedText);
    checkTextCompleted(typedText);
}

/**
 * Counts the number of correctly typed characters in the input area compared to the displayed text.
 */
function countCorrectCharacters(typed, original) {
    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === original[i]) {
            correct++;
        }
    }
    return correct;
}

/**
 * Highlights correctly and incorrectly typed characters in the displayed text.
 */
function highlightText(typed) {
    let highlightedText = '';
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === textToTypeElement.innerText[i]) {
            highlightedText += `<span class="correct">${typed[i]}</span>`;
        } else {
            highlightedText += `<span class="incorrect">${typed[i]}</span>`;
        }
    }
    textToTypeElement.innerHTML = highlightedText + textToTypeElement.innerText.substring(typed.length);
}

/**
 * Checks if the entire text has been correctly typed and stops the timer if completed.
 */
function checkTextCompleted(typed) {
    if (typed === textToTypeElement.innerText) {
        clearInterval(timerInterval);
        alert("Well done! You've completed the typing test.");
    }
}

/**
 * Selects a random text from the 'texts' array to be typed.
 */
function getRandomText() {
    let randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
}

/**
 * Initializes the timer and statistics for the typing test.
 */
function startTest() {
    startTime = Date.now();
    timerInterval = setInterval(updateStatistics, 1000);
}

/**
 * Resets the test, clearing statistics and setting a new random text.
 */
function restartTest() {
    clearInterval(timerInterval);
    inputArea.value = '';
    timerElement.innerText = 'Timer: 0s';
    wpmElement.innerText = 'Words per Minute: 0';
    accuracyElement.innerText = 'Accuracy: 0%';
    textToTypeElement.innerText = getRandomText();
    startTime = Date.now();
    startTest();
    inputArea.focus();
}

// Automatically restarts the test when the script is first loaded
restartTest();