import Contact from "../models/Contact";

export class Alphabet {
    private container : HTMLElement;

    constructor(container : HTMLElement) {
        this.container = container;
    }

    render(letterCountList : Map<string, number>, onLetterSelect : (letter : string) => void) {
        this.container.innerHTML = "";

        letterCountList.forEach((value, key) => {
            const alphabetCard : HTMLDivElement = document.createElement("div");
            alphabetCard.classList.add("alphabet-card");
            // alphabetCard.id = key;
        
            const letter : HTMLDivElement = document.createElement("div");
            letter.textContent = key;
            alphabetCard.append(letter);
        
            const count : HTMLDivElement = document.createElement("div");
            count.classList.add("count");
            count.textContent = `${value}`;
            alphabetCard.append(count);
        
            if(value !== 0) {
                alphabetCard.addEventListener("click", () => onLetterSelect(key));
            }
            // else gray text color
        
            this.container.append(alphabetCard);
        })
    }
}