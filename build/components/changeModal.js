export class ChangeModal {
    constructor(onContactChange) {
        this.container = document.createElement("dialog");
        this.container.classList.add("modal-window");
        this.form = document.createElement("form");
        // this.form.addEventListener("submit", () => this.onSubmit())
        const header = document.createElement("div");
        const div = document.createElement("div");
        div.classList.add("d-flex", "justify-content-between");
        this.modalOption = document.createElement("p");
        this.modalOption.textContent = "Change";
        this.buttonClose = document.createElement("p");
        this.buttonClose.textContent = "X";
        this.buttonClose.classList.add("modal-close");
        this.buttonClose.addEventListener("click", () => this.close());
        div.append(this.modalOption, this.buttonClose);
        header.append(div);
        this.nameField = document.createElement("input");
        this.nameField.required = true;
        this.nameField.minLength = 2;
        this.vacancyField = document.createElement("input");
        this.vacancyField.required = true;
        this.vacancyField.minLength = 2;
        this.phoneNumberField = document.createElement("input");
        this.phoneNumberField.required = true;
        this.phoneNumberField.pattern = "[0-9]{11}";
        this.buttonSubmit = document.createElement("button");
        this.buttonSubmit.textContent = "Submit";
        this.buttonSubmit.type = "submit";
        this.buttonSubmit.addEventListener("click", () => this.onSubmit());
        this.form.append(this.nameField, this.vacancyField, this.phoneNumberField);
        this.container.append(header, this.form, this.buttonSubmit);
        document.body.append(this.container);
        this.onContactChange = onContactChange;
        this.currentContact = null;
    }
    open(contact) {
        this.currentContact = contact;
        this.nameField.value = contact.name;
        this.vacancyField.value = contact.vacancy;
        this.phoneNumberField.value = contact.phoneNumber;
        this.container.showModal();
    }
    onSubmit() {
        if (this.currentContact)
            this.onContactChange({ id: this.currentContact.id, name: this.nameField.value, vacancy: this.vacancyField.value, phoneNumber: this.phoneNumberField.value });
        this.close();
    }
    close() {
        this.container.close();
    }
}
