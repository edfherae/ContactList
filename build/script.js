import { createContactStore } from "./services/createContactStore.js";
import { Alphabet } from "./components/Alphabet.js";
import { ContactList } from "./components/ContactList.js";
import { AddNumberForm } from "./components/AddNumberForm.js";
import { SearchModal } from "./components/searchModal.js";
const contactStore = createContactStore([
    { id: 3, name: "bob", vacancy: "DevOps", phoneNumber: "01023336667" },
    { id: 1, name: "a", vacancy: "SEO", phoneNumber: "88005553535" },
    { id: 2, name: "aaron", vacancy: "Developer", phoneNumber: "87021114455" },
]);
const alphabet = new Alphabet(document.querySelector(".alphabet"));
const contactList = new ContactList(document.querySelector(".numbers-output-container"));
const addNumberForm = new AddNumberForm(document.querySelector(".add-number-form"), document.querySelector(".name-input"), document.querySelector(".vacancy-input"), document.querySelector(".number-input"), document.querySelector(".add-number-button"), onFormSubmit);
const clearListButton = document.getElementById("clearListButton");
const searchButton = document.getElementById("searchNumberButton");
const searchModal = new SearchModal(document.querySelector(".modal-window"), document.querySelector(".modal-action"), document.querySelector(".modal-name"), document.querySelector(".modal-vacancy"), document.querySelector(".modal-number"), document.querySelector(".modal-submit"), document.querySelector(".modal-close"), document.querySelector(".modal-output"), contactStore.searchContacts);
searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener("click", () => searchModal.open());
// (document.querySelector(".modal-window") as HTMLDialogElement).showModal()
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
clearListButton.addEventListener("click", () => {
    contactStore.clear();
    contactList.clear();
    alphabet.render(contactStore.getLettersCount(), onLetterSelect);
});
alphabet.render(contactStore.getLettersCount(), onLetterSelect);
/////////////////////////////////////
// const numbersOutputContainer = document.querySelector(".numbers-output-container") as HTMLDivElement;
// const numbersOutputHeader = document.querySelector(".numbers-output-header") as HTMLHeadingElement;
// const numbersOutputGrid = document.querySelector(".numbers-output-grid") as HTMLDivElement;
// function openChangeModal(id: string) {
// }
// // Validation
// // nameInput.addEventListener("keyup")
