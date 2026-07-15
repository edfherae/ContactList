"use strict";
const numbersDictionary = {
    // Английский алфавит
    "A": [{ id: 1, name: "a", vacancy: "SEO", number: "88555553535" }, { id: 2, name: "aa", vacancy: "SEOo", number: "80555553535" }, { id: 3, name: "aaron", vacancy: "SEOo", number: "80555553535" }, { id: 4, name: "aronium", vacancy: "SEOo", number: "80555553535" }, { id: 5, name: "arondy", vacancy: "SEOo", number: "80555553535" }, { id: 2, name: "aa", vacancy: "SEOo", number: "80555553535" }, { id: 2, name: "aa", vacancy: "SEOo", number: "80555553535" }, { id: 2, name: "aa", vacancy: "SEOo", number: "80555553535" }, { id: 2, name: "aa", vacancy: "SEOo", number: "80555553535" }, { id: 2, name: "aa", vacancy: "SEOo", number: "80555553535" }],
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
const clearListButton = document.getElementById("clearListButton");
const searchButton = document.getElementById("searchNumberButton");
const alphabet = document.querySelector(".alphabet");
const numbersOutputContainer = document.querySelector(".numbers-output-container");
const numbersOutputHeader = document.querySelector(".numbers-output-header");
const numbersOutputGrid = document.querySelector(".numbers-output-grid");
function clearInputs() {
    nameInput.value = "";
    vacancyInput.value = "";
    numberInput.value = "";
}
function openModal(type) {
    const modalAction = document.querySelector(".modal-action");
    const modalNameInput = document.querySelector(".modal-name");
    const modalVacancyInput = document.querySelector(".modal-vacancy");
    const modalNumberInput = document.querySelector(".modal-number");
    const modalSubmitButton = document.querySelector(".modal-submit");
    const modalCloseButton = document.querySelector(".modal-close");
    const modalOutput = document.querySelector(".modal-output");
    modalCloseButton.addEventListener("click", () => {
        document.querySelector(".modal-window").close();
    });
    switch (type) {
        case "search":
            modalAction.textContent = "Search";
            modalNameInput.placeholder = "Name";
            modalVacancyInput.placeholder = "Vacancy";
            modalNumberInput.placeholder = "Number";
            modalSubmitButton.addEventListener("click", () => {
                let result = Object.values(numbersDictionary).flat().filter(contact => {
                    return (modalNameInput.value === "" ? false : contact.name.toLowerCase().trim().includes(modalNameInput.value.toLowerCase().trim())) ||
                        (modalVacancyInput.value === "" ? false : contact.vacancy.toLowerCase().trim().includes(modalVacancyInput.value.toLowerCase().trim())) ||
                        (modalNumberInput.value === "" ? false : contact.number.toLowerCase().trim().includes(modalNumberInput.value.toLowerCase().trim()));
                });
                let HTML = result.map(contact => `<div><p>${contact.name}</p><p>${contact.vacancy}</p><p>${contact.number}</p></div>`);
                modalOutput.innerHTML = HTML.join("");
            });
            break;
        case "change":
            break;
        default:
            let exhaustiveCheck = type;
            break;
    }
    document.querySelector(".modal-window").showModal();
}
//Разграничить русский и английский алфавиты
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
    alphabetCard.addEventListener("click", (e) => {
        // const letter : HTMLDivElement = document.createElement("div");
        // letter.textContent = key;
        // letter.classList.add("alphabet-card")
        // numbersOutput.append(letter); 
        if (e.currentTarget.lastChild?.textContent !== "0") {
            numbersOutputHeader.textContent = key;
            numbersOutputGrid.innerHTML = `
                <div></div>
                <h4 class="p-1 border-l-1 border-b-1">Имя</h4>
                <h4 class="p-1 border-l-1 border-b-1">Должность</h4>
                <h4 class="p-1 border-l-1 border-b-1">Номер телефона</h4>
            `;
            Object.values(numbersDictionary[key]).forEach((el, i, arr) => {
                const numberCard = document.createElement("div");
                numberCard.classList.add("number-card");
                const [index, name, vacancy, number] = [document.createElement("p"), document.createElement("p"), document.createElement("p"), document.createElement("p")];
                index.textContent = `${i + 1}.`;
                name.textContent = el.name;
                vacancy.textContent = el.vacancy;
                number.textContent = el.number;
                if (!((i + 1) === arr.length)) {
                    index.classList.add("p-1", "border-b-1");
                    name.classList.add("p-1", "border-b-1", "border-l-1");
                    vacancy.classList.add("p-1", "border-b-1", "border-l-1");
                    number.classList.add("p-1", "border-b-1", "border-l-1");
                }
                else {
                    index.classList.add("p-1");
                    name.classList.add("p-1", "border-l-1");
                    vacancy.classList.add("p-1", "border-l-1");
                    number.classList.add("p-1", "border-l-1");
                }
                // numberCard.append(name, vacancy, number);
                // numbersOutput.append(numberCard);
                numbersOutputGrid.append(index, name, vacancy, number);
            });
            console.log(numbersOutputContainer.style.display);
            numbersOutputContainer.style.display = "flex";
        }
    });
    // letter.addEventListener("click", () => alert(key))
    alphabet.append(alphabetCard);
});
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
clearListButton.addEventListener("click", () => {
    Object.keys(numbersDictionary).forEach((letter) => {
        numbersDictionary[letter] = [];
        (document.getElementById(letter)?.lastChild).textContent = "0";
    });
    numbersOutputContainer.style.display = "none";
});
searchButton?.addEventListener("click", () => openModal("search"));
