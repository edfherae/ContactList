interface numbersDictionary {
    [letter: string]: phoneNumber[]
}

interface phoneNumber {
    id: number;
    name: string;
    vacancy: string;
    number: string
}

const numbersDictionary: numbersDictionary = {
    // Английский алфавит
    "A": [{id: 1, name: "a", vacancy: "SEO", number: "88555553535"}, {id: 1, name: "aa", vacancy: "SEOo", number: "80555553535"}],
    "B": [], "C": [], "D": [], "E": [], "F": [], "G": [], "H": [], "I": [], "J": [], "K": [], "L": [], "M": [], 
    "N": [], "O": [], "P": [], "Q": [], "R": [], "S": [], "T": [], "U": [], "V": [], "W": [], "X": [], "Y": [], "Z": [],

    // Русский алфавит
    "А": [], "Б": [], "В": [], "Г": [], "Д": [], "Е": [], "Ё": [], "Ж": [], "З": [], "И": [], "Й": [], "К": [], 
    "Л": [], "М": [], "Н": [], "О": [], "П": [], "Р": [], "С": [], "Т": [], "У": [], "Ф": [], "Х": [], "Ц": [], 
    "Ч": [], "Ш": [], "Щ": [], "Ъ": [], "Ы": [], "Ь": [], "Э": [], "Ю": [], "Я": []
};

const addNumberForm = document.getElementById("addNumberForm") as HTMLFormElement;

const nameInput = document.getElementById("nameInput") as HTMLInputElement;
const vacancyInput = document.getElementById("vacancyInput") as HTMLInputElement;
const numberInput = document.getElementById("numberInput") as HTMLInputElement;

const addNumberButton = document.getElementById("addNumberButton") as HTMLButtonElement;
const clearListButton = document.getElementById("clearListButton") as HTMLButtonElement;

const alphabet = document.querySelector(".alphabet") as HTMLDivElement;

const numbersOutputContainer = document.querySelector(".numbers-output-container") as HTMLDivElement;
const numbersOutputHeader = document.querySelector(".numbers-output-header") as HTMLHeadingElement;
const numbersOutputGrid = document.querySelector(".numbers-output-grid") as HTMLDivElement;

//Разграничить русский и английский алфавиты
Object.entries(numbersDictionary).forEach(([key, value]) => {
    const alphabetCard : HTMLDivElement = document.createElement("div");
    alphabetCard.classList.add("alphabet-card");
    alphabetCard.id = key;

    const letter : HTMLDivElement = document.createElement("div");
    letter.textContent = key;
    alphabetCard.append(letter);

    const count : HTMLDivElement = document.createElement("div");
    count.classList.add("count");
    count.textContent = `${value.length}`;
    alphabetCard.append(count);

    alphabetCard.addEventListener("click", (e) => {
        // const letter : HTMLDivElement = document.createElement("div");
        // letter.textContent = key;
        // letter.classList.add("alphabet-card")
        // numbersOutput.append(letter); 
        if((e.currentTarget as HTMLDivElement).lastChild?.textContent !== "0") {
            numbersOutputHeader.textContent = key;

            numbersOutputGrid.innerHTML = `
                <h2 class="p-1 border-b-1"></h2>
                <h4 class="p-1 border-l-1 border-b-1">Имя</h4>
                <h4 class="p-1 border-l-1 border-b-1">Должность</h4>
                <h4 class="p-1 border-l-1 border-b-1">Номер телефона</h4>
            `;

            Object.values(numbersDictionary[key]).forEach((el, i, arr)  => {
                const numberCard : HTMLDivElement = document.createElement("div");
                numberCard.classList.add("number-card");

                const [index, name, vacancy, number] = [document.createElement("p"), document.createElement("p"), document.createElement("p"), document.createElement("p")];
                index.textContent = `${i + 1}.`; 
                name.textContent = el.name; 
                vacancy.textContent = el.vacancy; 
                number.textContent = el.number;

                if(!((i + 1) === arr.length)) {
                    index.classList.add("p-1", "border-b-1");
                    name.classList.add("p-1", "border-b-1", "border-l-1");
                    vacancy.classList.add("p-1", "border-b-1", "border-l-1");
                    number.classList.add("p-1", "border-b-1" ,"border-l-1");
                } else {
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
})


function clearInputs() {
    nameInput.value = "";
    vacancyInput.value = "";
    numberInput.value = "";
}

// Validation
// nameInput.addEventListener("keyup")

addNumberForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if(addNumberForm.reportValidity()) {
        const currentLetter : string = nameInput.value[0].toUpperCase();
        numbersDictionary[currentLetter].push({id: Date.now(), name: nameInput.value, vacancy: vacancyInput.value, number: numberInput.value});

        console.log(numbersDictionary[currentLetter]);

        (document.getElementById(currentLetter)?.lastChild as HTMLDivElement).textContent = `${numbersDictionary[currentLetter].length}`
        
        clearInputs();
    }
});

clearListButton.addEventListener("click", () => {
    Object.keys(numbersDictionary).forEach((letter) => {
        numbersDictionary[letter] = [];
        (document.getElementById(letter)?.lastChild as HTMLDivElement).textContent = "0";
    })
    numbersOutputContainer.style.display = "none";
});