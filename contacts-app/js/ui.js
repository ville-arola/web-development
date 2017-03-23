contactsApp.UI = (function() {
    var contactsRootElement = document.getElementById('contacts_list'),
        contactForm = document.getElementById('add_contact_form'),
        deleteBtn = document.createElement('button'),
        editField = document.createElement('input'),
        editedRowIndex = -1,
        editedColIndex = -1,
        justDeleted = false;
    deleteBtn.className = 'delete';
    deleteBtn.innerHTML = 'Delete row';
    editField.setAttribute('type', 'text');

    // DOM events mapped to corresponding application events

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        document.dispatchEvent(new CustomEvent('addContact', {
            detail: contactsApp.contact(
                    document.getElementById('firstName').value,
                    document.getElementById('lastName').value,
                    document.getElementById('phone').value,
                    document.getElementById('address').value,
                    document.getElementById('city').value
                )
        }));
        resetForm();
    });

    contactsRootElement.addEventListener('click', function (event) {
        var target = /touch/.test(event.type) ? event.targetTouches[0] : event.target;
        if (target.nodeName == 'TD') {
            document.dispatchEvent(new CustomEvent('interactionRequest', {
                detail: {
                    rowIndex: target.parentNode.rowIndex - 1,
                    colIndex: target.cellIndex
                }
            }));
        }
    });

    contactsRootElement.addEventListener('click', function (event) {
        var target = /touch/.test(event.type) ? event.targetTouches[0] : event.target;
        if (target.nodeName == 'A') {
            if (event.ctrlKey) {
                return true;
            }
            else {
                event.preventDefault();
                document.dispatchEvent(new CustomEvent('interactionRequest', {
                    detail: {
                        rowIndex: target.parentNode.parentNode.rowIndex - 1,
                        colIndex: target.parentNode.cellIndex
                    }
                }));
            }
        }
    });

    editField.addEventListener('blur', function() {
        document.dispatchEvent(new Event('interactionComplete'));
    });

    editField.addEventListener('change', function() {
        if (justDeleted) {
            return;
        }
        document.dispatchEvent(new CustomEvent('editContact', {
            detail: {
                rowIndex: editedRowIndex,
                colIndex: editedColIndex,
                newValue: editField.value
            }
        }));
        document.dispatchEvent(new Event('interactionComplete'));
    });

    deleteBtn.addEventListener('mousedown', function() {
        justDeleted = true;
        document.dispatchEvent(new CustomEvent('deleteContact', {
            detail: editedRowIndex
        }));
        document.dispatchEvent(new Event('interactionComplete'));
    });

    // UI component management

    function resetForm() {
        // resetting MDL field labels
        var inputFields = document.getElementsByTagName('input');
        inputFields[0].focus();
        for (var i = 0; i < inputFields.length; i++) {
            inputFields[i].parentNode.classList.remove('is-dirty');
        }
        contactForm.reset();
    }

    function addControls(cellCoordinates) {
        justDeleted = false;
        editedRowIndex = cellCoordinates.rowIndex;
        editedColIndex = cellCoordinates.colIndex;
        var rowElement = contactsRootElement.childNodes[editedRowIndex],
            currentCell = rowElement.childNodes[editedColIndex];
        editField.setAttribute('type','text');
        editField.value = currentCell.firstChild ? currentCell.firstChild.textContent : '';
        currentCell.appendChild(editField);
        currentCell.parentNode.lastChild.appendChild(deleteBtn);
        editField.focus();
    }

    function removeControls() {
        try {
            editField.parentNode.removeChild(editField);
            deleteBtn.parentNode.removeChild(deleteBtn);
        } catch (error) {}
    }

    function drawContacts() {
        var rows = '';
        for (var i = 0; i < contactsApp.contacts.length; i++) {
            rows += '<tr><td class="mdl-data-table__cell--non-numeric">' + contactsApp.contacts[i].firstName + '</td>' +
                '<td class="mdl-data-table__cell--non-numeric">' + contactsApp.contacts[i].lastName + '</td>' +
                '<td class="mdl-data-table__cell--non-numeric">' + contactsApp.contacts[i].phone + '</td>' +
                '<td class="mdl-data-table__cell--non-numeric">' + contactsApp.utilities.buildAddressLink(contactsApp.contacts[i].address, contactsApp.contacts[i].city) + '</td></tr>';
        }
        contactsRootElement.innerHTML = rows;
    }

    return {
        addControls: addControls,
        removeControls: removeControls,
        drawContacts: drawContacts
    };
})();