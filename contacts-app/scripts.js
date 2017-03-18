"use strict";
(function() {
    var contacts = [];
    document.getElementById('add_contact_form').addEventListener('submit', addContact);

    (function () {
        var contactsRootElement = document.getElementById('contacts_list'),
            deleteBtn = document.createElement('button'),
            editField = document.createElement('input'),
            rowIndex = -1,
            colIndex = -1,
            rowElement = null,
            currentCell = null,
            justDeleted = false;
        deleteBtn.className = 'delete';
        deleteBtn.innerHTML = 'Delete row';
        editField.setAttribute('type', 'text');


        deleteBtn.addEventListener('mousedown', function() {
            justDeleted = true;
            contacts.splice(rowIndex, 1);
            removeControls();
            drawContacts();
        });


        editField.addEventListener('change', function() {
            if (justDeleted) {
                return;
            }
            if (colIndex == 3) {
                var values = editField.value.split(',');
                contacts[rowIndex][Object.keys(contacts[rowIndex])[3]] = values[0].trim();
                contacts[rowIndex][Object.keys(contacts[rowIndex])[4]] = '';
                if (values.length > 1) {
                    contacts[rowIndex][Object.keys(contacts[rowIndex])[4]] = values.slice(1).join('').trim();
                }
            }
            else {
                contacts[rowIndex][Object.keys(contacts[rowIndex])[colIndex]] = editField.value;
            }
            removeControls();
            drawContacts();
        });


        editField.addEventListener('blur', function() {
            removeControls();
        });

        document.addEventListener('click', function (event) {
            var target = /touch/.test(event.type) ? event.targetTouches[0] : event.target;
            if (target.nodeName == 'TD') {
                rowIndex = target.parentNode.rowIndex - 1;
                colIndex = target.cellIndex;
                editCell();
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
                    rowIndex = target.parentNode.parentNode.rowIndex - 1;
                    colIndex = target.parentNode.cellIndex;
                    editCell();
                }
            }
        });

        function removeControls() {
            try {
                editField.parentNode.removeChild(editField);
                deleteBtn.parentNode.removeChild(deleteBtn);
            } catch (error) {}
        }

        function editCell() {
            justDeleted = false;
            rowElement = contactsRootElement.childNodes[rowIndex];
            currentCell = rowElement.childNodes[colIndex];
            editField.setAttribute('type','text');
            editField.value = currentCell.firstChild ? currentCell.firstChild.textContent : '';
            currentCell.appendChild(editField);
            currentCell.parentNode.lastChild.appendChild(deleteBtn);
            editField.focus();
        }

        contactsRootElement.addEventListener('mouseover', function (event) {
            if (event.target.nodeName == 'TD') {
                rowElement = event.target.parentNode;
                rowElement.className = 'highlight';
                if (event.type == 'mouseover') {
                    rowElement.addEventListener('mouseleave', blurRow);
                }
            }
        });

        function blurRow() {
            this.className = /selected/.test(this.className) ? 'selected' : '';
            this.removeEventListener('mouseleave', blurRow);
        }
    })();

    if (typeof(Storage) !== 'undefined') {
        window.addEventListener('load', function() {
            if (typeof(localStorage.getItem('contacts')) === 'undefined') {
                localStorage.contacts = [];
            }
            else {
                contacts = JSON.parse(localStorage.contacts);
                drawContacts();
            }
        });
        window.addEventListener('unload', function() {
            localStorage.contacts = JSON.stringify(contacts);
        });
        document.getElementById('firstName').addEventListener('keyup', function() {
            if (this.value == 'clear') {
                localStorage.clear();
                contacts = [];
                this.value = '';
                drawContacts();
            }
        });
    }

    function addContact(event) {
        event.preventDefault();
        // resetting MDL field labels
        var inputFields =  document.getElementsByTagName('input');
        inputFields[0].focus();
        for (var i = 0; i < inputFields.length; i++) {
            inputFields[i].parentNode.classList.remove('is-dirty');
        }
        var firstName = document.getElementById('firstName').value,
            lastName = document.getElementById('lastName').value,
            phone = document.getElementById('phone').value,
            address = document.getElementById('address').value,
            city = document.getElementById('city').value;
        if (!(firstName + lastName + phone + address + city).length) {
            return;
        }
        contacts.push({
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            address: address,
            city: city
        });
        drawContacts();
        this.reset();
    }

    function makeAddressLink(address, city) {
        var tmp = document.createElement('div'),
            link = document.createElement('a'),
            addressString = /\w+/.test(address) ? address.trim() : '';
        addressString += (addressString.length && city.trim().length) ? ', ' : '';
        addressString += /\w+/.test(city) ? city.trim() : '';
        if (addressString.length) {
            link.setAttribute('title', 'Hold CTRL-key to open link');
            link.setAttribute('href', encodeURI('https://maps.google.com?q=' + addressString.replace(/ +/g, '+')));
            link.innerHTML = addressString;
            tmp.appendChild(link);
            return tmp.innerHTML;
        }
        return '';
    }

    function drawContacts() {
        var rows = '';
        for (var i = 0; i < contacts.length; i++) {
            rows += '<tr><td class="mdl-data-table__cell--non-numeric">' + contacts[i].firstName + '</td>' +
                        '<td class="mdl-data-table__cell--non-numeric">' + contacts[i].lastName + '</td>' +
                        '<td class="mdl-data-table__cell--non-numeric">' + contacts[i].phone + '</td>' +
                        '<td class="mdl-data-table__cell--non-numeric">' + makeAddressLink(contacts[i].address, contacts[i].city) + '</td></tr>';
        }
        document.getElementById('contacts_list').innerHTML = rows;
    }




    /**
     * The makeshift style toggle functionality
     * */
    (function() {

        var switchStyleBtn = document.createElement('button'),
            basicStyle = document.getElementById('basicStyle'),
            mdlStyle = document.getElementById('mdlStyle'),
            overrides = document.getElementById('overrides'),
            mdlJS = document.getElementById('mdlJS'),
            head = basicStyle.parentNode,
            flag = false;

        switchStyleBtn.innerHTML = 'Toggle MDL style';

        head.removeChild(mdlStyle);
        head.removeChild(overrides);
        document.body.removeChild(mdlJS);

        switchStyleBtn.style.position = 'fixed';
        switchStyleBtn.style.top = '0';
        switchStyleBtn.style.right = '0';
        switchStyleBtn.style.backgroundColor = '#ff4477';
        switchStyleBtn.style.padding = '2em 3em';
        document.getElementById('app').appendChild(switchStyleBtn);
        switchStyleBtn.addEventListener('click', function () {
            if (!flag) {
                head.removeChild(basicStyle);
                head.appendChild(mdlStyle);
                head.appendChild(overrides);
                document.body.appendChild(mdlJS);
            }
            else {
                head.removeChild(mdlStyle);
                head.removeChild(overrides);
                document.body.removeChild(mdlJS);
                head.appendChild(basicStyle);
            }
            flag = !flag;
        });
    })();
})();