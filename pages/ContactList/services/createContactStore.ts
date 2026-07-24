import Contact from "../models/Contact.js"

export interface ContactStore {
    getAllContacts : (sorting? : "sortByName") => Contact[],
    addContact : (contact : Contact) => void,
    deleteContact : (id : number) => void,
    getContactById : (id : number) => Contact | undefined,
    getContactsByLetter : (letter : string) => Contact[],
    getLettersCount : () => Map<string, number>,
    clear : () => void,
    searchContacts : (name: string, vacancy: string, phoneNumber: string) => Contact[];
    changeContact : (newContact : Contact) => void;
}

export function createContactStore() : ContactStore;
export function createContactStore(contacts : Contact[]) : ContactStore;

export function createContactStore(contacts? : Contact[]) : ContactStore {
    let data : Contact[] = contacts ?? [];

    return {
        getAllContacts(sorting?) {
            switch (sorting) {
                case "sortByName":
                    return [...data].sort((a, b) => a.name.localeCompare(b.name, "en-US"));
                    break;
                default:
                    return data;
                    break;
            }
        },
        addContact(contact) {
            data.push(contact);
        },
        deleteContact(id) {
            data = data.filter(contact => contact.id !== id); 
        },
        getContactById(id) {
            return data.find(contact => contact.id === id);
        },
        getContactsByLetter(letter) {
            return data.filter(contact => contact.name[0].toUpperCase() === letter);
        },
        getLettersCount() {
            const result = new Map<string, number>();
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter => result.set(letter, 0));

            data.forEach((contact) => {
                const currentCount = result.get(contact.name[0].toUpperCase());
                if(currentCount !== undefined) result.set(contact.name[0].toUpperCase(), currentCount + 1);
            });

            return result;
        },
        clear() {
            data = [];
        },
        searchContacts(name, vacancy, phoneNumber) {
            return data.filter(contact => {
                return (name === "" ? false : contact.name.toLowerCase().trim().includes(name.toLowerCase().trim())) || 
                (vacancy === "" ? false : contact.vacancy.toLowerCase().trim().includes(vacancy.toLowerCase().trim())) ||
                (phoneNumber === "" ? false : contact.phoneNumber.toLowerCase().trim().includes(phoneNumber.toLowerCase().trim()));
            });
        },
        changeContact (newContact : Contact) {
            let contact = data.find(contact => contact.id === newContact.id);
            if(contact) {
                contact.name = newContact.name;
                contact.phoneNumber = newContact.phoneNumber;
                contact.vacancy = newContact.vacancy;
            }
        }
    }
}