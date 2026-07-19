export class ContactList {
    constructor(container) {
        this.currentLetter = null;
        this.container = container;
    }
    render(letter, contacts) {
        this.container.innerHTML = "";
        this.currentLetter = letter;
        // <h1 class="numbers-output-header"></h1>
        // <div class="numbers-output-grid">
        //     <!-- Выгрузка номеров по нажатию -->
        // </div>
        // const letter : HTMLDivElement = document.createElement("div");
        // letter.textContent = key;
        // letter.classList.add("alphabet-card")
        // numbersOutput.append(letter); 
        const numbersOutputHeader = document.createElement("h1");
        numbersOutputHeader.classList.add("numbers-output-header");
        numbersOutputHeader.textContent = letter;
        const numbersOutputGrid = document.createElement("div");
        numbersOutputGrid.classList.add("numbers-output-grid");
        numbersOutputGrid.innerHTML = `
            <div class="border-b-1"></div>
            <h4 class="p-1 border-l-1 border-b-1">Имя</h4>
            <h4 class="p-1 border-l-1 border-b-1">Должность</h4>
            <h4 class="p-1 border-l-1 border-b-1">Номер телефона</h4>
        `;
        contacts.forEach((contact, i, arr) => {
            const numberCard = document.createElement("div");
            numberCard.classList.add("number-card");
            const [index, name, vacancy, number] = [document.createElement("p"), document.createElement("p"), document.createElement("p"), document.createElement("p")];
            index.textContent = `${i + 1}.`;
            name.textContent = contact.name;
            vacancy.textContent = contact.vacancy;
            number.textContent = contact.phoneNumber;
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
        this.container.append(numbersOutputHeader, numbersOutputGrid);
        this.container.style.display = "flex";
    }
    clear() {
        this.container.style.display = "none";
        this.container.innerHTML = "";
        this.currentLetter = null;
    }
}
