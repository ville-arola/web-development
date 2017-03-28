using System.Collections.Generic;
using System.Linq;
using contacts_app.Models;

namespace contacts_app.Services
{
    public class ContactService : IContactService
    {
        private List<Contact> _contacts;

        public ContactService()
        {
            _contacts = new List<Contact>();
            /*
            _contacts.Add(new Contact(1, "Erkki", "Esimerkki", "1234567890", "Jokukatu 5", "Jokukaupunki"));
            _contacts.Add(new Contact(2, "Toinen", "Esimerkki", "237774757", "Jokutoinenkatu 7", "Jokumuukaupunki"));
            */
        }

        public List<Contact> FindAllContacts()
        {
            return _contacts;
        }

        public Contact FindContactById(int id)
        {
            return _contacts.FirstOrDefault(contact => contact.Id == id);
        }

        public List<Contact> FindContactsByFirstName(string firstName)
        {
            return _contacts.FindAll(contact => contact.FirstName.Equals(firstName));
        }

        public int SaveContact(Contact contact)
        {
            int id = GetId();
            _contacts.Add(new Contact(id, contact.FirstName, contact.LastName, contact.Phone, contact.StreetAddress, contact.City));
            return id;
        }

        public void Remove(int id)
        {
            _contacts.Remove(_contacts.First(t => t.Id == id));
        }

        public void Update(Contact updatedContact)
        {
            var contact = _contacts.First(c => c.Id == updatedContact.Id);
            int i = _contacts.IndexOf(contact);
            if (i != -1)
                _contacts[i] = updatedContact;
        }


        private int GetId()
        {
            var lastSaved = _contacts.OrderByDescending(contact => contact.Id).FirstOrDefault();
            //return lastSaved?.Id + 1 ?? 1;
            if (lastSaved != null)
            {
                return lastSaved.Id + 1;
            }
            return 1;
        }

    }
}
