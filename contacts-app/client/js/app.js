var contactsApp = (function() {
    var contacts = [];

    function getContactById(id) {
        for (var i = contactsApp.contacts.length; i; i--) {
            if (contactsApp.contacts[i-1].id == id) {
                return {
                    object: contactsApp.contacts[i-1],
                    index: i-1
                }
            }
        }
        return null;
    }

    function loadContacts() {
        function dataLoaded(contacts) {
            contactsApp.contacts = contacts;
            document.dispatchEvent(new Event('dataLoaded'));
            document.dispatchEvent(new Event('dataChanged'));
        }
        contactsApp.server.getContacts(dataLoaded);
    }

    function addContact(contact) {
        if (contact) {
            function dataAdded(contact) {
                contactsApp.contacts.push(contact);
                document.dispatchEvent(new Event('dataChanged'));
            }
            contactsApp.server.addContact(contact, dataAdded);
        }
    }

    function editContact(target) {
        var index = _.findIndex(contactsApp.contacts, function (c) {
            return c.id == target.id;
        });
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
            function dataEdited(contact, index, isOnServer) {
                contactsApp.contacts[index] = contact;
                if (!isOnServer) {
                    document.dispatchEvent(new Event('synchronizeData'));
                }
                document.dispatchEvent(new Event('dataChanged'));
            }
            contactsApp.server.updateContact(editedContact, index, dataEdited);
        }
    }

    function deleteContact(target) {
        var index = _.findIndex(contactsApp.contacts, function (c) {
            return c.id == target.id;
        });
        if (index >= 0) {
            function dataDeleted(index) {
                contactsApp.contacts.splice(index, 1);
                document.dispatchEvent(new Event('dataChanged'));
            }
            contactsApp.server.deleteContact(target.id, index, dataDeleted);
        }
    }

    //

    function syncAdded(contact) {
        var exists = getContactById(contact.id);
        if (!exists) {
            contactsApp.contacts.push(contactsApp.contact(
                contact.firstName,
                contact.lastName,
                contact.phone,
                contact.streetAddress,
                contact.city,
                contact.id
            ));
            document.dispatchEvent(new Event('dataChanged'));
        }
    }

    function syncEdited(contact) {
        var matching = getContactById(contact.id);
        if (matching) {
            contactsApp.contacts[matching.index] = contact;
            document.dispatchEvent(new Event('dataChanged'));
        }
    }

    function syncDeleted(id) {
        var matching = getContactById(id);
        if (matching) {
            contactsApp.contacts.splice(matching.index, 1);
            document.dispatchEvent(new Event('dataChanged'));
        }
    }

    return {
        contacts: contacts,
        loadContacts: loadContacts,
        addContact: addContact,
        editContact: editContact,
        deleteContact: deleteContact,
        syncAdded: syncAdded,
        syncEdited: syncEdited,
        syncDeleted: syncDeleted
    };
})();
