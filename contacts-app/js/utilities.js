contactsApp.utilities = (function() {
    function buildAddressLink(address, city) {
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
    return {
        buildAddressLink: buildAddressLink
    };
})();