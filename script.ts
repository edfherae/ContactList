import Contact from "./models/Contact.js";

import { createContactStore } from "./services/createContactStore.js";
import { Alphabet } from "./components/Alphabet.js";
import { ContactList } from "./components/ContactList.js";
import { AddNumberForm } from "./components/AddNumberForm.js";
import { SearchModal } from "./components/searchModal.js";

const contactStore = createContactStore(
    [
        {id: 3, name: "bob", vacancy: "DevOps", phoneNumber: "01023336667"},
        {id: 1, name: "a", vacancy: "SEO", phoneNumber: "88005553535"},
        {id: 2, name: "aaron", vacancy: "Developer", phoneNumber: "87021114455"},
    ]
);

const alphabet = new Alphabet(document.querySelector(".alphabet") as HTMLDivElement);
const contactList = new ContactList(document.querySelector(".numbers-output-container") as HTMLDivElement);
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
const searchModal = new SearchModal(
    document.querySelector(".modal-window") as HTMLDialogElement,
    document.querySelector(".modal-action") as HTMLHeadingElement, 
    document.querySelector(".modal-name") as HTMLInputElement, 
    document.querySelector(".modal-vacancy") as HTMLInputElement, 
    document.querySelector(".modal-number") as HTMLInputElement, 
    document.querySelector(".modal-submit") as HTMLButtonElement,
    document.querySelector(".modal-close") as HTMLParagraphElement,
    document.querySelector(".modal-output") as HTMLDivElement,
    contactStore.searchContacts
);
searchButton?.addEventListener("click", () => searchModal.open());
// (document.querySelector(".modal-window") as HTMLDialogElement).showModal()

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





/////////////////////////////////////




// const numbersOutputContainer = document.querySelector(".numbers-output-container") as HTMLDivElement;
// const numbersOutputHeader = document.querySelector(".numbers-output-header") as HTMLHeadingElement;
// const numbersOutputGrid = document.querySelector(".numbers-output-grid") as HTMLDivElement;





// function openChangeModal(id: string) {

// }
            
// // Validation
// // nameInput.addEventListener("keyup")