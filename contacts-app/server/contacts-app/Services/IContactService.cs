using System.Collections.Generic;
using contacts_app.Models;

namespace contacts_app.Services
{
    public interface IContactService
    {
        List<Contact> FindAllContacts();
        Contact FindContactById(int id);
        void SaveContact(Contact contact);
        void Remove(int id);
        void Update(Contact updatedContact);
    }
}
