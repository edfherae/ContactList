interface numbersDictionary1 {
    [letter: string]: phoneNumber[]
}

interface phoneNumber {
    name: string;
    vacancy: string;
    number: string
}

const numbersDictionary: numbersDictionary1 = {
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
    Object.entries(numbersDictionary).forEach(([key]) => {
        const letter : HTMLDivElement = document.createElement("div");
        letter.classList.add("letter");
        letter.textContent = key;
        // letter.addEventListener("click", () => alert(key))
        alphabet.append(letter);
    })
} else console.log("alphabet is null");

const nameInput = document.getElementById("nameInput") as HTMLInputElement;
const vacancyInput = document.getElementById("vacancyInput") as HTMLInputElement;
const numberInput = document.getElementById("numberInput") as HTMLInputElement;
const addNumberButton = document.getElementById("addNumberButton") as HTMLInputElement;

addNumberButton?.addEventListener("click", () => {
    alert([nameInput.value, vacancyInput.value, numberInput.value]);
});