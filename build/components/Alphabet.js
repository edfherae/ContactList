export class Alphabet {
    constructor(container) {
        this.container = container;
    }
    render(letterCountList, onLetterSelect) {
        this.container.innerHTML = "";
        letterCountList.forEach((value, key) => {
            const alphabetCard = document.createElement("div");
            alphabetCard.classList.add("alphabet-card");
            // alphabetCard.id = key;
            const letter = document.createElement("div");
            letter.textContent = key;
            alphabetCard.append(letter);
            const count = document.createElement("div");
            count.classList.add("count");
            count.textContent = `${value}`;
            alphabetCard.append(count);
            if (value !== 0) {
                alphabetCard.addEventListener("click", () => onLetterSelect(key));
            }
            // else gray text color
            this.container.append(alphabetCard);
        });
    }
}
