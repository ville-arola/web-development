/*
contactsApp.dataStorage = (function() {
    if (typeof(Storage) !== 'undefined') {

        function loadContacts() {
            if (typeof(localStorage.getItem('contacts')) === 'undefined') {
                localStorage.contacts = JSON.stringify([]);
            }
            else {
                contactsApp.contacts = _.union(contactsApp.contacts, JSON.parse(localStorage.contacts || null ));
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
*/


// http://www.lm-tech.it/Blog/post/2013/05/08/How-to-consume-a-RESTful-service-using-jQuery.aspx

contactsApp.server = (function() {
    var apiBaseUrl = 'http://localhost:50854/api/contacts/';
    function getContacts(callback) {
        jQuery.ajax({
            type: "GET",
            url: apiBaseUrl,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status, jqXHR) {
                callback(data);
            },
            error: function (jqXHR, status) {
                // error handler
            }
        });
    }

    function addContact(contact, callback) {
        jQuery.ajax({
            type: "POST",
            url: apiBaseUrl,
            data: JSON.stringify(contact),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status, jqXHR) {
                callback(contact);
            },
            error: function (jqXHR, status) {
                // error handler
            }
        });
    }

    function updateContact(contact, contactId, callback) {
        jQuery.ajax({
            type: "PUT",
            url: apiBaseUrl + contactId,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(contact),
            dataType: "json",
            success: function (data, status, jqXHR) {
                callback(contactId, contact);
            },
            error: function (jqXHR, status) {
                // error handler
            }
        });
    }

    function deleteContact(contactId, callback) {
        $.ajax({
            type: "DELETE",
            url: apiBaseUrl + contactId,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status, jqXHR) {
                callback(contactId);
            },
            error: function (jqXHR, status) {
                // error handler
            }
        });
    }

    return {
        getContacts: getContacts,
        addContact: addContact,
        updateContact: updateContact,
        deleteContact: deleteContact
    };
})();