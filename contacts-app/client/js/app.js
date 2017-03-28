var contactsApp = {};

contactsApp.contacts = [];

contactsApp.loadContacts = function() {
    function dataLoaded(contacts){
        contactsApp.contacts = contacts;
        document.dispatchEvent(new Event('dataChanged'));
    }
    contactsApp.server.getContacts(dataLoaded);

}

contactsApp.addContact = function(contact) {
    if (contact) {
        function dataAdded(contact) {
            contactsApp.contacts.push(contact);
            document.dispatchEvent(new Event('dataChanged'));
        }
        contactsApp.server.addContact(contact, dataAdded);
    }
}

contactsApp.editContact = function(editedData) {
    var originalContact = JSON.stringify(contactsApp.contacts[editedData.rowIndex]),
        editedContact = JSON.parse(originalContact);
    if (editedData.colIndex == 3) {
        var values = editedData.newValue.split(',');
        editedContact[Object.keys(editedContact)[3]] = values[0].trim();
        editedContact[Object.keys(editedContact)[4]] = '';
        if (values.length > 1) {
            editedContact[Object.keys(editedContact)[4]] = values.slice(1).join('').trim();
        }
    }
    else {
        editedContact[Object.keys(editedContact)[editedData.colIndex]] = editedData.newValue;
    }
    if (originalContact != JSON.stringify(editedContact)) {
        function dataEdited(index, contact) {
            contactsApp[index] = contact;
            document.dispatchEvent(new Event('dataChanged'));
        }
        contactsApp.server.updateContact(editedContact, editedData.rowIndex, dataEdited);

    }
}

contactsApp.deleteContact = function(deletedData) {
    if (deletedData.rowIndex >= 0 && deletedData.rowIndex < contactsApp.contacts.length) {
        function dataDeleted(rowIndex) {
            contactsApp.contacts.splice(rowIndex, 1);
            document.dispatchEvent(new Event('dataChanged'));
        }
        contactsApp.server.deleteContact(indexData, dataDeleted);
    }
}
