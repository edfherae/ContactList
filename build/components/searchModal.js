export class SearchModal {
    constructor(modalWindow, modalAction, modalNameInput, modalVacancyInput, modalNumberInput, modalSubmitButton, modalCloseButton, modalOutput, searchContacts, openChangeModal) {
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
    }
    open() {
        this.modalCloseButton.addEventListener("click", () => this.modalWindow.close());
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
            p_1.textContent = contact.name;
            const p_2 = document.createElement("p");
            p_2.textContent = contact.vacancy;
            const p_3 = document.createElement("p");
            p_2.textContent = contact.phoneNumber;
            const buttonChange = document.createElement("button");
            buttonChange.textContent = "Change";
            buttonChange.addEventListener("click", () => this.openChangeModal(contact.id));
            const buttonSearch = document.createElement("button");
            div.append(p_1, p_2, p_3, buttonChange, buttonSearch);
            this.modalOutput.append(div);
        });
    }
}
