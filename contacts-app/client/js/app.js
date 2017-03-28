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

contactsApp.editContact = function(target) {
    var index = _.findIndex(contactsApp.contacts, function(c) { return c.id == target.id; });
    var originalContact = JSON.stringify(contactsApp.contacts[index]),
        editedContact = JSON.parse(originalContact);
    if (target.field == 'address') {
        var values = target.newValue.split(',');
        editedContact.streetAddress = values[0].trim();
        editedContact.city = '';
        if (values.length > 1) {
            editedContact.city = values.slice(1).join('').trim();
        }
    }
    else {
        editedContact[target.field] = target.newValue;
    }
    if (originalContact != JSON.stringify(editedContact)) {
        function dataEdited(contact, index) {
            contactsApp.contacts[index] = contact;
            document.dispatchEvent(new Event('dataChanged'));
        }
        contactsApp.server.updateContact(editedContact, index, dataEdited);

    }
}

contactsApp.deleteContact = function(target) {
    var index = _.findIndex(contactsApp.contacts, function(c) { return c.id == target.id; });
    if (index >= 0) {
        function dataDeleted(index) {
            contactsApp.contacts.splice(index, 1);
            document.dispatchEvent(new Event('dataChanged'));
        }
        contactsApp.server.deleteContact(target.id, index, dataDeleted);
    }
}
