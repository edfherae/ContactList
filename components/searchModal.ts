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
    }

    open() {
    
        this.modalCloseButton.addEventListener("click", () => this.modalWindow.close())
        
        this.modalAction.textContent = "Search";
        this.modalNameInput.placeholder = "Name";
        this.modalVacancyInput.placeholder = "Vacancy";
        this.modalPhoneNumberInput.placeholder = "Number";

        this.modalSubmitButton.addEventListener("click", () => {
            

            let HTML = this.searchContacts(this.modalNameInput.value, this.modalVacancyInput.value, this.modalPhoneNumberInput.value).map(contact => `
                <div>
                    <p>${contact.name}</p><p>${contact.vacancy}</p><p>${contact.phoneNumber}</p>
                    <button onclick="openChangeModal(${contact.id})">Change</button>
                    <button onclick="deleteContact(${contact.id}, ${contact.name[0]})">Delete</button>
                </div>`)
            this.modalOutput.innerHTML = HTML.join("");
            
            
            //добавить кнопки изменения и удаления
            //контакты хранить в массиве, перерисовывать при изменении
            //выводить их в инпутах, разблокировать при изменении, кнопку менять на submit
            //менять в основном списке по id
        });
        
        this.modalWindow.showModal();
    }
}