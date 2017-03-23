contactsApp.dataStorage = (function() {
    if (typeof(Storage) !== 'undefined') {

        function loadContacts() {
            if (typeof(localStorage.getItem('contacts')) === 'undefined') {
                localStorage.contacts = JSON.stringify([]);
            }
            else {
                contactsApp.contacts = _.union(contactsApp.contacts, JSON.parse(localStorage.contacts));
            }
            document.dispatchEvent(new Event('dataChanged'));
        }

        function storeContacts() {
            localStorage.contacts = JSON.stringify(contactsApp.contacts);
        }

        function clearContactsData() {
            localStorage.clear();
            loadContacts();
        }

        return {
            loadContacts: loadContacts,
            storeContacts: storeContacts,
            clearContactsData: clearContactsData
        }
    }
    return null;
})();