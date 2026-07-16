import Contact from "../models/Contact.ts"

export interface ContactStore {
    getAllContacts : () => Contact[],
    addContact : (contact : Contact) => void,
    deleteContact : (id : number) => void,
    getContactById : (id : number) => Contact | undefined,
}

export function createContactStore() : ContactStore {
    let data : Contact[] = [];

    return {
        getAllContacts() {
            return data;
        },
        addContact(contact : Contact) {
            data.push(contact);
        },
        deleteContact(id : number) {
            data = data.filter(contact => contact.id !== id); 
        },
        getContactById(id : number) {
            return data.find(contact => contact.id === id);
        },
    }
}