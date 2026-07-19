import Contact from "../models/Contact";

export class AddNumberForm {
    private formElement : HTMLFormElement;
    private nameInput : HTMLInputElement;
    private vacancyInput : HTMLInputElement;
    private phoneNumberInput : HTMLInputElement;
    private submitButton : HTMLButtonElement;

    constructor(formElement : HTMLFormElement, nameInput : HTMLInputElement, vacancyInput : HTMLInputElement, phoneNumberInput : HTMLInputElement, submitButton : HTMLButtonElement, onFormSubmit : (contact : Contact) => void) {
        this.formElement = formElement;
        this.nameInput = nameInput;
        this.vacancyInput = vacancyInput;
        this.phoneNumberInput = phoneNumberInput;
        this.submitButton = submitButton;
        formElement.onsubmit = (e) => {
            e.preventDefault();
            if(formElement.reportValidity()) {
                onFormSubmit({id: Date.now(), name: nameInput.value, vacancy: vacancyInput.value, phoneNumber: phoneNumberInput.value})

                // const currentLetter : string = nameInput.value[0].toUpperCase();
                // numbersDictionary.data[currentLetter].push({id: Date.now(), name: nameInput.value, vacancy: vacancyInput.value, number: numberInput.value});
    
                // console.log(numbersDictionary.data[currentLetter]);
    
                // (document.getElementById(currentLetter)?.lastChild as HTMLDivElement).textContent = `${numbersDictionary.data[currentLetter].length}`

                this.clearInputs();
            }
        };
    }

    clearInputs() {
        this.nameInput.value = "";
        this.vacancyInput.value = "";
        this.phoneNumberInput.value = "";
    }
}

// const addNumberForm = 

// const nameInput = ;
// const vacancyInput = ;
// const numberInput = ;

// const addNumberButton = ;

