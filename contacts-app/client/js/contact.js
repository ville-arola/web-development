contactsApp.contact = function(firstName, lastName, phone, streetAddress, city) {
    if (!(firstName + lastName + phone + streetAddress + city).length) {
        return null;
    }
    return {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        streetAddress: streetAddress,
        city: city
    };
}