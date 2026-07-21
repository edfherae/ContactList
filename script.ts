import Contact from "./models/Contact.js";

import { createContactStore } from "./services/createContactStore.js";
import { Alphabet } from "./components/Alphabet.js";
import { ContactList } from "./components/ContactList.js";
import { AddNumberForm } from "./components/AddNumberForm.js";
import { SearchModal } from "./components/searchModal.js";
import { ChangeModal } from "./components/changeModal.js";

const contactStore = createContactStore(
    [
        {id: 3, name: "bob", vacancy: "DevOps", phoneNumber: "01023336667"},
        {id: 1, name: "a", vacancy: "SEO", phoneNumber: "88005553535"},
        {id: 2, name: "aaron", vacancy: "Developer", phoneNumber: "87021114455"},
    ]
);

const alphabet = new Alphabet(document.querySelector(".alphabet") as HTMLDivElement);
const contactList = new ContactList(document.querySelector(".numbers-output-container") as HTMLDivElement, openChangeModal, onContactDelete, (letter) => contactStore.getContactsByLetter(letter));
const addNumberForm = new AddNumberForm(
    document.querySelector(".add-number-form") as HTMLFormElement, 
    document.querySelector(".name-input") as HTMLInputElement, 
    document.querySelector(".vacancy-input") as HTMLInputElement, 
    document.querySelector(".number-input") as HTMLInputElement,
    document.querySelector(".add-number-button") as HTMLButtonElement, 
    onFormSubmit
);
const clearListButton = document.getElementById("clearListButton") as HTMLButtonElement;
const searchButton = document.getElementById("searchNumberButton");

const changeModal = new ChangeModal(changeContact);
function changeContact(contact : Contact) {
    contactStore.changeContact(contact);
    // if is active
    //contactList.render(contactList.currentLetter, contactStore.getContactsByLetter(letter));
    alphabet.render(contactStore.getLettersCount(), onLetterSelect);
}

// поиск по айди от searchModal контакта и передача его в changeModal
function openChangeModal(id: number, rerenderComponent: () => void) {
    const contact = contactStore.getContactById(id);
    if(contact) changeModal.open(contact, () => rerenderComponent());
    else alert("не найден такой контакт в базе")
}

const searchModal = new SearchModal(
    document.querySelector(".modal-window") as HTMLDialogElement,
    document.querySelector(".modal-action") as HTMLHeadingElement, 
    document.querySelector(".modal-name") as HTMLInputElement, 
    document.querySelector(".modal-vacancy") as HTMLInputElement, 
    document.querySelector(".modal-number") as HTMLInputElement, 
    document.querySelector(".modal-submit") as HTMLButtonElement,
    document.querySelector(".modal-close") as HTMLParagraphElement,
    document.querySelector(".modal-output") as HTMLDivElement,
    contactStore.searchContacts,
    openChangeModal,
    onContactDelete
);
searchButton?.addEventListener("click", () => searchModal.open());
// (document.querySelector(".modal-window") as HTMLDialogElement).showModal()

function onContactDelete(id: number) {
    contactStore.deleteContact(id);

    // if is active
    //contactList.render(contactList.currentLetter, contactStore.getContactsByLetter(letter));
    alphabet.render(contactStore.getLettersCount(), onLetterSelect);
}

function onLetterSelect(letter : string) {
    contactList.render(letter, contactStore.getContactsByLetter(letter));
}

function onFormSubmit(contact : Contact) {
    contactStore.addContact(contact);
    alphabet.render(contactStore.getLettersCount(), onLetterSelect);

    const firstLetter = contact.name[0].toUpperCase();
    if(firstLetter === contactList.currentLetter) contactList.render(firstLetter, contactStore.getContactsByLetter(firstLetter))
}

clearListButton.addEventListener("click", () => {
    contactStore.clear();
    contactList.clear();
    alphabet.render(contactStore.getLettersCount(), onLetterSelect);
});

alphabet.render(contactStore.getLettersCount(), onLetterSelect);