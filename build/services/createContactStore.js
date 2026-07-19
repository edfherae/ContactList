export function createContactStore(contacts) {
    let data = contacts !== null && contacts !== void 0 ? contacts : [];
    return {
        getAllContacts(sorting) {
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
            const result = new Map();
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter => result.set(letter, 0));
            data.forEach((contact) => {
                const currentCount = result.get(contact.name[0].toUpperCase());
                if (currentCount !== undefined)
                    result.set(contact.name[0].toUpperCase(), currentCount + 1);
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
    };
}
