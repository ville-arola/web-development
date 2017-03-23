contactsApp.eventBindins = (function() {
    // local storage (load on page load, store on data change)
    if (contactsApp.dataStorage) {
        window.addEventListener('load', function () {
            contactsApp.dataStorage.loadContacts();
        });
        document.addEventListener('dataChanged', contactsApp.dataStorage.storeContacts);
    }

    // responding to UI interaction
    document.addEventListener('interactionComplete', function () {
        contactsApp.UI.removeControls();
    });
    document.addEventListener('interactionRequest', function (event) {
        contactsApp.UI.addControls(event.detail);
    });

    // responding to commands
    document.addEventListener('addContact', function (event) {
        contactsApp.addContact(event.detail);
    });
    document.addEventListener('editContact', function (event) {
        contactsApp.editContact(event.detail);
    });
    document.addEventListener('deleteContact', function (event) {
        contactsApp.deleteContact(event.detail);
    });

    // responding to changed data
    document.addEventListener('dataChanged', function () {
        contactsApp.UI.drawContacts();
    });
})();