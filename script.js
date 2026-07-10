"use strict";
const numbersDictionary = {
    "A": [],
    "B": [],
    "C": [],
    "D": [],
    "E": [],
    "F": [],
    "G": [],
    "H": [],
    "I": [],
    "J": [],
    "K": [],
    "L": [],
    "M": [],
    "N": [],
    "O": [],
    "P": [],
    "Q": [],
    "R": [],
    "S": [],
    "T": [],
    "U": [],
    "V": [],
    "W": [],
    "X": [],
    "Y": [],
    "Z": []
};
const alphabet = document.querySelector(".alphabet");
if (alphabet) {
    Object.entries(numbersDictionary).forEach(([key, value]) => {
        const alphabetCard = document.createElement("div");
        alphabetCard.classList.add("alphabet-card");
        alphabetCard.id = key;
        const letter = document.createElement("div");
        letter.textContent = key;
        alphabetCard.append(letter);
        const count = document.createElement("div");
        count.classList.add("count");
        count.textContent = `${value.length}`;
        alphabetCard.append(count);
        // letter.addEventListener("click", () => alert(key))
        alphabet.append(alphabetCard);
    });
}
else
    console.log("alphabet is null");
const nameInput = document.getElementById("nameInput");
const vacancyInput = document.getElementById("vacancyInput");
const numberInput = document.getElementById("numberInput");
const addNumberButton = document.getElementById("addNumberButton");
// Validation
// nameInput.addEventListener("keyup")
addNumberButton?.addEventListener("click", () => {
    const currentLetter = nameInput.value[0].toUpperCase();
    numbersDictionary[currentLetter].push({ id: Date.now(), name: nameInput.value, vacancy: vacancyInput.value, number: numberInput.value });
    console.log(numbersDictionary[currentLetter]);
    (document.getElementById(currentLetter)?.lastChild).textContent = `${numbersDictionary[currentLetter].length}`;
});
