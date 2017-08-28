contactsApp.contact = function(firstName, lastName, phone, streetAddress, city, id) {
    if (!(firstName + lastName + phone + streetAddress + city).length) {
        return null;
    }
    var t = new Date().getTime();
    return {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        streetAddress: streetAddress,
        city: city,
        id: id ? id : t
    };
}