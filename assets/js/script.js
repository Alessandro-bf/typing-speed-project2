let texts = [
    "A journey of a thousand miles begins with a single step.",
    "Curiosity killed the cat, but satisfaction brought it back.",
    "Every man is the architect of his own fortune.",
    "You can lead a horse to water, but you can not make it drink.",
    "A bird in the hand is worth two in the bush.",
    "When the going gets tough, the tough get going.",
    "Do not count your chickens before they are hatched."
]

let textToTypeElement = document.getElementById('text-to-type');
let inputArea = document.getElementById('input-area')


function getRandomText () {
    let randomIndex = Math.floor(Math.random()*texts.length);
    return texts[randomIndex];    
}

function countCorrectCharacters (typed, original) { 
    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === original[i]) {
            correct++;
        }
    }
    return correct;
}

function checkTextFinish () {
    let timerInterval;
    if (typed === textToTypeElement.innerText) {
        clearInterval(timerInterval);
        alert("Well done! You've complited the typing test.");
    }
}

function startTest () {

}


function updateStatistics () {

}

function restartTest () {

}
