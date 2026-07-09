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
    Object.entries(numbersDictionary).forEach(([key]) => {
        const letter = document.createElement("div");
        letter.classList.add("letter");
        letter.textContent = key;
        // letter.addEventListener("click", () => alert(key))
        alphabet.append(letter);
    });
}
else
    console.log("alphabet is null");
const nameInput = document.getElementById("nameInput");
const vacancyInput = document.getElementById("vacancyInput");
const numberInput = document.getElementById("numberInput");
const addNumberButton = document.getElementById("addNumberButton");
addNumberButton?.addEventListener("click", () => {
    alert([nameInput.value, vacancyInput.value, numberInput.value]);
});
