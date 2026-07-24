export class SearchModal {
    constructor(modalWindow, modalAction, modalNameInput, modalVacancyInput, modalNumberInput, modalSubmitButton, modalCloseButton, modalOutput, searchContacts, openChangeModal, deleteContact) {
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
            buttonChange.addEventListener("click", () => this.onContactChange(contact.id));
            const buttonDelete = document.createElement("button");
            buttonDelete.textContent = "Delete";
            buttonDelete.addEventListener("click", () => this.onContactDelete(contact.id));
            div.append(p_1, p_2, p_3, buttonChange, buttonDelete);
            this.modalOutput.append(div);
        });
    }
    onContactChange(id) {
        this.openChangeModal(id, () => {
            this.render();
        });
    }
    onContactDelete(id) {
        this.deleteContact(id);
        this.render();
    }
}
