import Contact from "../models/Contact";

export class ContactList {
    private container : HTMLElement;
    currentLetter : string | null = null;
    openChangeContactModal: (id : number, rerenderComponent : () => void) => void;
    deleteContact : (id: number) => void;
    getContactsByLetter : (letter : string) => Contact[];

    constructor(container : HTMLElement, openChangeContactModal: (id : number, rerenderComponent : () => void) => void, deleteContact : (id: number) => void, getContactsByLetter : (letter : string) => Contact[]) {
        this.container = container;
        this.openChangeContactModal = openChangeContactModal;
        this.deleteContact = deleteContact;
        this.getContactsByLetter = getContactsByLetter;
    }

    render(letter : string, contacts : Contact[]) {
        this.container.innerHTML = "";

        if(contacts.length > 0) {
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
                <div class="border-b-1 border-l-1"></div>
            `;
    
            contacts.forEach((contact, i, arr)  => {
                // const numberCard : HTMLDivElement = document.createElement("div");
                // numberCard.classList.add("number-card");
    
                const [index, name, vacancy, number, div, buttonChange, buttonDelete] = [document.createElement("p"), document.createElement("p"), document.createElement("p"), document.createElement("p"), document.createElement("div"), document.createElement("button"), document.createElement("button")];
                index.textContent = `${i + 1}.`; 
                name.textContent = contact.name; 
                vacancy.textContent = contact.vacancy; 
                number.textContent = contact.phoneNumber;
    
                buttonChange.textContent = "Change";
                buttonChange.addEventListener("click", () => this.onContactChange(letter, contact.id));
                buttonDelete.textContent = "Delete";
                buttonDelete.addEventListener("click", () => this.onContactDelete(letter, contact.id));
    
                div.classList.add("d-flex", "items-center", "border-l-1");
                div.append(buttonChange, buttonDelete);
    
                if(!((i + 1) === arr.length)) {
                    index.classList.add("p-1", "border-b-1");
                    name.classList.add("p-1", "border-b-1", "border-l-1");
                    vacancy.classList.add("p-1", "border-b-1", "border-l-1");
                    number.classList.add("p-1", "border-b-1" ,"border-l-1");
                    div.classList.add("border-b-1");
                } else {
                    index.classList.add("p-1");
                    name.classList.add("p-1", "border-l-1");
                    vacancy.classList.add("p-1", "border-l-1");
                    number.classList.add("p-1", "border-l-1");
                }
    
                // numberCard.append(index, name, vacancy, number);
                // numbersOutput.append(numberCard);
    
                numbersOutputGrid.append(index, name, vacancy, number, div);
            });
    
            this.container.append(numbersOutputHeader, numbersOutputGrid);
            this.container.style.display = "flex";
        }

    }
    onContactDelete(letter: string, id: number) {
        this.deleteContact(id);
        this.render(letter, this.getContactsByLetter(letter));
    }
    onContactChange(letter: string, id : number) {
        this.openChangeContactModal(id, () => {
            this.render(letter, this.getContactsByLetter(letter))
        });
    }
    clear() {
        this.container.style.display = "none";
        this.container.innerHTML = "";
        this.currentLetter = null;
    }
}