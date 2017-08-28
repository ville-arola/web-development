/*
contactsApp.localStorage = (function() {
    if (typeof(Storage) !== 'undefined') {
        var added = [],
            edited = [],
            deleted = [],
            loaded = [];

        function loadStorage(key) {
            var res = [];
            if (typeof(localStorage.getItem(key)) === 'undefined') {
                localStorage[key] = JSON.stringify([]);
            }
            else {
                res = JSON.parse(localStorage[key]);
            }
            return res;
        }

        function clearStorage(key) {
            localStorage[key] = JSON.stringify([]);
        }

        (function init() {
            added = loadStorage('added');
            edited = loadStorage('edited');
            deleted = loadStorage('deleted');
            loaded = loadStorage('loaded');

            contactsApp.server.batchDeleteContacts(deleted);
            contactsApp.server.batchEditContacts(edited);
            contactsApp.server.batchAddContacts(added);
        })();

        // contacts from server to local storage
        document.addEventListener('dataLoaded', function() {
            loaded = contactsApp.contacts;
            localStorage.loaded = JSON.stringify(loaded);
        });

        document.addEventListener('loadFailed', function() {
            contactsApp.contacts = loaded; // ehkä loadContacts();
        });

        document.addEventListener('batchAddDone', function() {
            added = [];
            clearStorage('added');
        });
        document.addEventListener('batchEditDone', function() {
            edited = [];
            clearStorage('edited');
        });
        document.addEventListener('batchDeleteDone', function() {
            deleted = [];
            clearStorage('deleted');
        });



        document.addEventListener('addFailed', function() {
            storeAdded();
            contactsApp.contacts.push();
        });

        document.addEventListener('editFailed', function() {
            storeEdited();

        });

        document.addEventListener('deleteFailed', function() {
            storeDeleted();
        });




        function storeAdded(contact) {
            added.push(contact);
            localStorage.added = JSON.stringify(added);
        }

        function storeEdited(contact) {
            edited.push(contact);
            localStorage.edited = JSON.stringify(edited);
        }

        function storeDeleted(id) {
            deleted.push(id);
            localStorage.deleted = JSON.stringify(deleted);
        }

        // return all contacts currently stored on client
        // (combine loaded and added, remove deleted, replace edited)
        function loadContacts() {
            var contacts = _.union(loaded, added);
            // Toimiiko??
            contacts = _.differenceBy(contacts, deleted, function() {});
            for (var i = 0; i < deleted.length; i++) {
                for (var j = contacts.length; j && contacts[j-1].id != deleted[i]; j--) {}
                contacts.splice(j-1, 1);
            }
            for (var i = edited.length; i; i--) {
                for (var j = contacts.length; j && contacts[j-1].id != edited[i-1]; j--) {}
                contacts.splice(j-1, 1, edited[i-1]);
            }
            return contacts;
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

    // Event listeners for responding to server-sent events
    // Nearly real-time client updates in supported browsers

    var source = new EventSource(apiBaseUrl + 'sse');
    source.addEventListener("contactAdded", function(event) {
        //console.log(event.data);
        contactsApp.syncAdded(JSON.parse(event.data));
    }, false);
    source.addEventListener("contactEdited", function(event) {
        //console.log(event.data);
        contactsApp.syncEdited(JSON.parse(event.data));
    }, false);
    source.addEventListener("contactDeleted", function(event) {
        //console.log(event.data);
        contactsApp.syncDeleted(JSON.parse(event.data));
    }, false);


    // Ajax functions for regular server interaction

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
                document.dispatchEvent(new Event('loadFailed'));
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
                document.dispatchEvent(new Event('addFailed'));
            }
        });
    }

    function updateContact(contact, index, callback) {
        jQuery.ajax({
            type: "PUT",
            url: apiBaseUrl + contact.id,
            data: JSON.stringify(contact),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                var result = JSON.parse(data);
                if (result >= 0) {
                    callback(contact, index, result == 1);
                }
            },
            error: function (jqXHR, status) {
                // error handler
                document.dispatchEvent(new Event('editFailed'));
            }
        });
    }

    function deleteContact(id, index, callback) {
        $.ajax({
            type: "DELETE",
            url: apiBaseUrl + id,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                // data is false if delete failed (contact was not found)
                // -> run callback anyway.
                callback(index);
            },
            error: function (jqXHR, status) {
                // error handler
                document.dispatchEvent(new Event('deleteFailed'));
            }
        });
    }

    function batchAddContacts(contacts) {
        jQuery.ajax({
            type: "POST",
            url: apiBaseUrl + 'batch-add',
            data: JSON.stringify(contacts),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status, jqXHR) {
                document.dispatchEvent(new Event('batchAddDone'));
            }
        });
    }

    function batchEditContacts(contacts) {
        jQuery.ajax({
            type: "PUT",
            url: apiBaseUrl + 'batch-edit',
            data: JSON.stringify(contacts),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status, jqXHR) {
                document.dispatchEvent(new Event('batchEditDone'));
            }
        });
    }

    function batchDeleteContacts(ids) {
        jQuery.ajax({
            type: "DELETE",
            url: apiBaseUrl + 'batch-delete',
            data: JSON.stringify(ids),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status, jqXHR) {
                document.dispatchEvent(new Event('batchDeleteDone'));
            }
        });
    }

    return {
        getContacts: getContacts,
        addContact: addContact,
        updateContact: updateContact,
        deleteContact: deleteContact,
        batchAddContacts: batchAddContacts,
        batchEditContacts: batchEditContacts,
        batchDeleteContacts: batchDeleteContacts
    };
})();
