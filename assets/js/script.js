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
let restartButton = document.getElementById('restart-button');
let timerElement = document.getElementById('timer');
let wpmElement = document.getElementById('wpm');
let accuracyElement = document.getElementById('accuracy');

let startTime, timerInterval;

inputArea.addEventListener('input', updateStatistics);
restartButton.addEventListener('click',restartTest);
document.addEventListener('keydown',(e) => {
    if (e.key === 'Enter') {
        restartTest();
    }
})

function updateStatistics() {
    let elapsedTime = (Date.now() - startTime) / 1000;
    let typedText = inputArea.value;
    let wordsTyped = typedText.trim().split(/\s+/).length;
    let correctChars = countCorrectCharacters (typedText,textToTypeElement.innerText);
    let accuracy = (correctChars / textToTypeElement.innerText.length) * 100;

    timerElement.innerText = `Time: ${Math.floor(elapsedTime)}s`;
    wpmElement.innerText = `Words per Minute: ${Math.floor((wordsTyped / elapsedTime) * 60)}`;
    accuracyElement.innerText = `Accuracy: ${Math.floor(accuracy)}%`;

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

function checkTextCompleted() {
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
    timerInterval = setInterval(updateStatistics,1000);
}

function restartTest() {
    clearInterval(timerInterval);
    startTime = Date.now();
    startTest();
    inputArea.focus();
}

restartTest();