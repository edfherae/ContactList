import { createContactStore } from "./services/createContactStore.js";
import { Alphabet } from "./components/Alphabet.js";
import { ContactList } from "./components/ContactList.js";
import { AddNumberForm } from "./components/AddNumberForm.js";
import { SearchModal } from "./components/searchModal.js";
import { ChangeModal } from "./components/changeModal.js";
const localStorageData = localStorage.getItem("data");
const contactStore = createContactStore(localStorageData ? JSON.parse(localStorageData) : []);
const addNumberForm = new AddNumberForm(document.querySelector(".add-number-form"), document.querySelector(".name-input"), document.querySelector(".vacancy-input"), document.querySelector(".number-input"), document.querySelector(".add-number-button"), onFormSubmit);
const clearListButton = document.getElementById("clearListButton");
clearListButton.addEventListener("click", () => {
    contactStore.clear();
    contactList.clear();
    alphabet.render(contactStore.getLettersCount(), onLetterSelect);
});
const searchButton = document.getElementById("searchNumberButton");
searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener("click", () => searchModal.open());
const alphabet = new Alphabet(document.querySelector(".alphabet"));
const contactList = new ContactList(document.querySelector(".numbers-output-container"), openChangeModal, deleteContact, (letter) => contactStore.getContactsByLetter(letter));
const searchModal = new SearchModal(document.querySelector(".modal-window"), document.querySelector(".modal-action"), document.querySelector(".modal-name"), document.querySelector(".modal-vacancy"), document.querySelector(".modal-number"), document.querySelector(".modal-submit"), document.querySelector(".modal-close"), document.querySelector(".modal-output"), contactStore.searchContacts, openChangeModal, deleteContact);
const changeModal = new ChangeModal(changeContact);
function changeContact(contact) {
    contactStore.changeContact(contact);
    // if is active
    //contactList.render(contactList.currentLetter, contactStore.getContactsByLetter(letter));
    alphabet.render(contactStore.getLettersCount(), onLetterSelect);
}
// поиск контакта по айди от searchModal и передача его в changeModal
function openChangeModal(id, rerenderComponent) {
    const contact = contactStore.getContactById(id);
    if (contact)
        changeModal.open(contact, () => rerenderComponent());
    else
        alert("не найден такой контакт в базе");
}
function deleteContact(id) {
    contactStore.deleteContact(id);
    // if is active
    //contactList.render(contactList.currentLetter, contactStore.getContactsByLetter(letter));
    alphabet.render(contactStore.getLettersCount(), onLetterSelect);
}
function onLetterSelect(letter) {
    contactList.render(letter, contactStore.getContactsByLetter(letter));
}
function onFormSubmit(contact) {
    contactStore.addContact(contact);
    alphabet.render(contactStore.getLettersCount(), onLetterSelect);
    const firstLetter = contact.name[0].toUpperCase();
    if (firstLetter === contactList.currentLetter)
        contactList.render(firstLetter, contactStore.getContactsByLetter(firstLetter));
}
alphabet.render(contactStore.getLettersCount(), onLetterSelect);
window.addEventListener("pagehide", () => {
    localStorage.setItem("data", JSON.stringify(contactStore.getAllContacts()));
});
