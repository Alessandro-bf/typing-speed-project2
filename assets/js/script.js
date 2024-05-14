let texts = [
    "A journey of a thousand miles begins with a single step.",
    "Curiosity killed the cat, but satisfaction brought it back.",
    "Every man is the architect of his own fortune.",
    "You can lead a horse to water, but you can not make it drink.",
    "A bird in the hand is worth two in the bush.",
    "When the going gets tough, the tough get going.",
    "Do not count your chickens before they are hatched."
];

let textToTypeElement = document.getElementById('text-to-type');
let inputArea = document.getElementById('input-area');
let timerElement = document.getElementById('timer');
let wpmElement = document.getElementById('wpm');
let accuracyElement = document.getElementById('accuracy');
let restartButton = document.getElementById('restart-button');

let startTime, timerInterval;

inputArea.addEventListener('input', updateStatistics);
restartButton.addEventListener('click',restartTest);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        restartTest();
    }
});

function updateStatistics() {
    let elapsedTime = (Date.now() - startTime) / 1000;
    let typedText = inputArea.value;
    let wordsTyped = typedText.split(/\s+/).filter(word => word.length > 0).length;
    let correctChars = countCorrectCharacters(typedText, textToTypeElement.innerText);
    let accuracy = (correctChars / textToTypeElement.innerText.length) * 100;

    timerElement.innerText = `Time: ${Math.floor(elapsedTime)}s`;
    wpmElement.innerText = `WPM: ${Math.floor((wordsTyped / elapsedTime) * 60)}`;
    accuracyElement.innerText = `Accuracy: ${Math.floor(accuracy)}%`;

    highlightText(typedText);
    checkTextCompleted(typedText);
}

function countCorrectCharacters(typed, original) {
    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === original[i]) {
            correct++;
        }
    }
    return correct;
}

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

function checkTextCompleted(typed) {
    if (typed === textToTypeElement.innerText) {
        clearInterval(timerInterval);
        alert("Well done! You've completed the typing test.");
    }
}

function getRandomText() {
    let randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
}

function startTest() {
    startTime = Date.now();
    timerInterval = setInterval(updateStatistics, 1000);
}

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

restartTest();