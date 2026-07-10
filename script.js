"use strict";
const numbersDictionary = {
    // Английский алфавит
    "A": [{ id: 1, name: "a", vacancy: "SEO", number: "88555553535" }, { id: 1, name: "aa", vacancy: "SEOo", number: "80555553535" }],
    "B": [], "C": [], "D": [], "E": [], "F": [], "G": [], "H": [], "I": [], "J": [], "K": [], "L": [], "M": [],
    "N": [], "O": [], "P": [], "Q": [], "R": [], "S": [], "T": [], "U": [], "V": [], "W": [], "X": [], "Y": [], "Z": [],
    // Русский алфавит
    "А": [], "Б": [], "В": [], "Г": [], "Д": [], "Е": [], "Ё": [], "Ж": [], "З": [], "И": [], "Й": [], "К": [],
    "Л": [], "М": [], "Н": [], "О": [], "П": [], "Р": [], "С": [], "Т": [], "У": [], "Ф": [], "Х": [], "Ц": [],
    "Ч": [], "Ш": [], "Щ": [], "Ъ": [], "Ы": [], "Ь": [], "Э": [], "Ю": [], "Я": []
};
const addNumberForm = document.getElementById("addNumberForm");
const nameInput = document.getElementById("nameInput");
const vacancyInput = document.getElementById("vacancyInput");
const numberInput = document.getElementById("numberInput");
const addNumberButton = document.getElementById("addNumberButton");
const alphabet = document.querySelector(".alphabet");
const numbersOutput = document.getElementById("numbersOutput");
if (alphabet) {
    Object.entries(numbersDictionary).forEach(([key, value]) => {
        const alphabetCard = document.createElement("div");
        alphabetCard.classList.add("alphabet-card");
        alphabetCard.id = key;
        alphabetCard.addEventListener("click", () => {
            const letter = document.createElement("div");
            letter.textContent = key;
            numbersOutput.append(letter);
            Object.values(numbersDictionary[key]).forEach(el => {
                const numberCard = document.createElement("div");
                numberCard.classList.add("number-card");
                const [name, vacancy, number] = [document.createElement("p"), document.createElement("p"), document.createElement("p")];
                name.textContent = el.name;
                vacancy.textContent = el.vacancy;
                number.textContent = el.number;
                numberCard.append(name, vacancy, number);
                numbersOutput.append(numberCard);
            });
        });
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
function clearInputs() {
    nameInput.value = "";
    vacancyInput.value = "";
    numberInput.value = "";
}
// Validation
// nameInput.addEventListener("keyup")
addNumberForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (addNumberForm.reportValidity()) {
        const currentLetter = nameInput.value[0].toUpperCase();
        numbersDictionary[currentLetter].push({ id: Date.now(), name: nameInput.value, vacancy: vacancyInput.value, number: numberInput.value });
        console.log(numbersDictionary[currentLetter]);
        (document.getElementById(currentLetter)?.lastChild).textContent = `${numbersDictionary[currentLetter].length}`;
        clearInputs();
    }
});
