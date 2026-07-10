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

const alphabet : Element | null = document.querySelector(".alphabet");

if(alphabet) {
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
        // letter.addEventListener("click", () => alert(key))
        alphabet.append(alphabetCard);
    })
} else console.log("alphabet is null");

const nameInput = document.getElementById("nameInput") as HTMLInputElement;
const vacancyInput = document.getElementById("vacancyInput") as HTMLInputElement;
const numberInput = document.getElementById("numberInput") as HTMLInputElement;
const addNumberButton = document.getElementById("addNumberButton") as HTMLInputElement;

// Validation
// nameInput.addEventListener("keyup")

addNumberButton?.addEventListener("click", () => {
    const currentLetter : string = nameInput.value[0].toUpperCase();
    numbersDictionary[currentLetter].push({id: Date.now(), name: nameInput.value, vacancy: vacancyInput.value, number: numberInput.value});
    console.log(numbersDictionary[currentLetter]);
    (document.getElementById(currentLetter)?.lastChild as HTMLDivElement).textContent = `${numbersDictionary[currentLetter].length}`
});