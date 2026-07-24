import Contact from "../models/Contact";

export class SearchModal {
    private modalWindow : HTMLDialogElement;
    private modalAction : HTMLHeadingElement;
    private modalNameInput : HTMLInputElement;
    private modalVacancyInput : HTMLInputElement;
    private modalPhoneNumberInput : HTMLInputElement;
    private modalSubmitButton : HTMLButtonElement;
    private modalCloseButton : HTMLParagraphElement;
    private modalOutput : HTMLDivElement;
    searchContacts : (name: string, vacancy: string, phoneNumber: string) => Contact[];
    openChangeModal : (id: number, rerenderComponent : () => void) => void;
    deleteContact : (id: number) => void;

    constructor(
        modalWindow : HTMLDialogElement,
        modalAction : HTMLHeadingElement, 
        modalNameInput : HTMLInputElement, 
        modalVacancyInput : HTMLInputElement, 
        modalNumberInput : HTMLInputElement, 
        modalSubmitButton : HTMLButtonElement, 
        modalCloseButton : HTMLParagraphElement, 
        modalOutput : HTMLDivElement,
        searchContacts : (name: string, vacancy: string, phoneNumber: string) => Contact[],
        openChangeModal : (id: number, rerenderComponent : () => void) => void,
        deleteContact : (id: number) => void,
    ) {
        this.modalWindow = modalWindow;
        this.modalAction = modalAction;
        this.modalNameInput = modalNameInput;
        this.modalVacancyInput = modalVacancyInput;
        this.modalPhoneNumberInput = modalNumberInput;
        this.modalSubmitButton = modalSubmitButton;
        this.modalCloseButton = modalCloseButton;
        this.modalOutput = modalOutput;
        this.searchContacts = searchContacts;
        this.openChangeModal = openChangeModal;
        this.deleteContact = deleteContact;
    }

    open() {
    
        this.modalCloseButton.addEventListener("click", () => this.modalWindow.close())
        
        this.modalAction.textContent = "Search";
        this.modalNameInput.placeholder = "Name";
        this.modalVacancyInput.placeholder = "Vacancy";
        this.modalPhoneNumberInput.placeholder = "Number";

        this.modalSubmitButton.addEventListener("click", () => {
            this.render();
                // `<div>
                //     <p>${contact.name}</p><p>${contact.vacancy}</p><p>${contact.phoneNumber}</p>
                //     <button onclick="openChangeModal(${contact.id})">Change</button>
                //     <button onclick="deleteContact(${contact.id}, ${contact.name[0]})">Delete</button>
                // </div>`)
            
            
            //добавить кнопки изменения и удаления
            //контакты хранить в массиве, перерисовывать при изменении
            //выводить их в инпутах, разблокировать при изменении, кнопку менять на submit
            //менять в основном списке по id
        });
        
        this.modalWindow.showModal();
    }
    render() {
        this.modalOutput.innerHTML = "";

        this.searchContacts(this.modalNameInput.value, this.modalVacancyInput.value, this.modalPhoneNumberInput.value)
        .map(contact => {
            const div = document.createElement("div");

            const p_1 = document.createElement("p");
            p_1.textContent = contact.name
            const p_2 = document.createElement("p");
            p_2.textContent = contact.vacancy;
            const p_3 = document.createElement("p");
            p_2.textContent = contact.phoneNumber
            const buttonChange = document.createElement("button");
            buttonChange.textContent = "Change";
            buttonChange.addEventListener("click", () => this.onContactChange(contact.id));
            const buttonDelete = document.createElement("button");
            buttonDelete.textContent = "Delete";
            buttonDelete.addEventListener("click", () => this.onContactDelete(contact.id))

            div.append(p_1, p_2, p_3, buttonChange, buttonDelete);
            this.modalOutput.append(div);
        });
    }
    onContactChange(id: number) {
        this.openChangeModal(id, () => {
            this.render();
        });
    }
    onContactDelete(id: number) {
        this.deleteContact(id);
        this.render()
    }
}