using System.Collections.Generic;
using contacts_app.Models;

namespace contacts_app.Services
{
    public interface IContactService
    {
        List<Contact> FindAllContacts();
        Contact FindContactById(string id);
        void SaveContact(Contact contact);
        void Remove(string id);
        void Update(Contact updatedContact);
        string GetTimeLastAltered();
        bool GetNextEvent(out Event e);
    }
}
