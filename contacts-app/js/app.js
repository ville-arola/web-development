var contactsApp = {};

contactsApp.contacts = [];

contactsApp.contact = function(firstName, lastName, phone, address, city) {
    if (!(firstName + lastName + phone + address + city).length) {
        return null;
    }
    return {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        address: address,
        city: city
    };
}

contactsApp.addContact = function(contact) {
    if (contact) {
        contactsApp.contacts.push(contact);
        document.dispatchEvent(new Event('dataChanged'));
    }
}

contactsApp.editContact = function(editedData) {
    var c = JSON.stringify(contactsApp.contacts[editedData.rowIndex]);
    if (editedData.colIndex == 3) {
        var values = editedData.newValue.split(',');
        contactsApp.contacts[editedData.rowIndex][Object.keys(contactsApp.contacts[editedData.rowIndex])[3]] = values[0].trim();
        contactsApp.contacts[editedData.rowIndex][Object.keys(contactsApp.contacts[editedData.rowIndex])[4]] = '';
        if (values.length > 1) {
            contactsApp.contacts[editedData.rowIndex][Object.keys(contactsApp.contacts[editedData.rowIndex])[4]] = values.slice(1).join('').trim();
        }
    }
    else {
        contactsApp.contacts[editedData.rowIndex][Object.keys(contactsApp.contacts[editedData.rowIndex])[editedData.colIndex]] = editedData.newValue;
    }
    if (c != JSON.stringify(contactsApp.contacts[editedData.rowIndex])) {
        document.dispatchEvent(new Event('dataChanged'));
    }
}

contactsApp.deleteContact = function(index) {
    if (index >= 0 && index < contactsApp.contacts.length) {
        contactsApp.contacts.splice(index, 1);
        document.dispatchEvent(new Event('dataChanged'));
    }
}
