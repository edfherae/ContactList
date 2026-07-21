import Contact from "./models/Contact.js";

import { createContactStore } from "./services/createContactStore.js";
import { Alphabet } from "./components/Alphabet.js";
import { ContactList } from "./components/ContactList.js";
import { AddNumberForm } from "./components/AddNumberForm.js";
import { SearchModal } from "./components/searchModal.js";
import { ChangeModal } from "./components/changeModal.js";

const localStorageData = localStorage.getItem("data");
const contactStore = createContactStore(localStorageData ? JSON.parse(localStorageData) : []);

const addNumberForm = new AddNumberForm(
    document.querySelector(".add-number-form") as HTMLFormElement, 
    document.querySelector(".name-input") as HTMLInputElement, 
    document.querySelector(".vacancy-input") as HTMLInputElement, 
    document.querySelector(".number-input") as HTMLInputElement,
    document.querySelector(".add-number-button") as HTMLButtonElement, 
    onFormSubmit
);
const clearListButton = document.getElementById("clearListButton") as HTMLButtonElement;
clearListButton.addEventListener("click", () => {
    contactStore.clear();
    contactList.clear();
    alphabet.render(contactStore.getLettersCount(), onLetterSelect);
});
const searchButton = document.getElementById("searchNumberButton");
searchButton?.addEventListener("click", () => searchModal.open());

const alphabet = new Alphabet(document.querySelector(".alphabet") as HTMLDivElement);
const contactList = new ContactList(document.querySelector(".numbers-output-container") as HTMLDivElement, openChangeModal, deleteContact, (letter) => contactStore.getContactsByLetter(letter));

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
    deleteContact
);

const changeModal = new ChangeModal(changeContact);
function changeContact(contact : Contact) {
    contactStore.changeContact(contact);
    // if is active
    //contactList.render(contactList.currentLetter, contactStore.getContactsByLetter(letter));
    alphabet.render(contactStore.getLettersCount(), onLetterSelect);
}

// поиск контакта по айди от searchModal и передача его в changeModal
function openChangeModal(id: number, rerenderComponent: () => void) {
    const contact = contactStore.getContactById(id);
    if(contact) changeModal.open(contact, () => rerenderComponent());
    else alert("не найден такой контакт в базе")
}

function deleteContact(id: number) {
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

alphabet.render(contactStore.getLettersCount(), onLetterSelect);

window.addEventListener("pagehide", () => {
    localStorage.setItem("data", JSON.stringify(contactStore.getAllContacts()));
})