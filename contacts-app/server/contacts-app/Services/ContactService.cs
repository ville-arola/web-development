using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using contacts_app.Models;
using System.Xml.Linq;

namespace contacts_app.Services
{
    public class ContactService : IContactService
    {
        private List<Event> _eventQueue = new List<Event>();

        public List<Contact> FindAllContacts()
        {
            return LoadContacts();
        }

        public Contact FindContactById(string id)
        {
            List<Contact> contacts = LoadContacts();
            return contacts.FirstOrDefault(c => c.Id == id);
        }

        public void SaveContact(Contact contact)
        {
            List<Contact> contacts = LoadContacts();
            if (contacts.FirstOrDefault(c => c.Id == contact.Id) == null && Regex.IsMatch(contact.Id, @"^\d+$"))
            {
                contacts.Add(new Contact(
                    contact.Id,
                    contact.FirstName,
                    contact.LastName,
                    contact.Phone,
                    contact.StreetAddress,
                    contact.City
                ));
                _eventQueue.Add(new Event("contactAdded", contact.Id));
                SaveContacts(contacts);
            }
        }

        public void Remove(string id)
        {
            List<Contact> contacts = LoadContacts();
            if (contacts.Remove(contacts.First(c => c.Id == id)))
            {
                _eventQueue.Add(new Event("contactDeleted", id));
                SaveContacts(contacts);
            }
        }

        public void Update(Contact updatedContact)
        {
            List<Contact> contacts = LoadContacts();
            var contact = contacts.First(c => c.Id == updatedContact.Id);
            int i = contacts.IndexOf(contact);
            if (i != -1)
            {
                contacts[i] = updatedContact;
                _eventQueue.Add(new Event("contactEdited", updatedContact.Id));
                SaveContacts(contacts);
            }
        }

        public string GetTimeLastAltered()
        {
            try
            {
                string t = File.ReadAllText("time_last_altered.txt");
                return t;
            }
            catch
            {
                return Math.Round(DateTime.Now.Subtract(DateTime.MinValue.AddYears(1969)).TotalMilliseconds).ToString();
            }
        }

        public bool GetNextEvent(out Event e)
        {
            e = new Event();
            if (_eventQueue.Count > 0)
            {
                e = _eventQueue[0];
                _eventQueue.RemoveAt(0);
                return true;
            }
            return false;
        }

        private void SaveTimeLastAltered()
        {
            string createText = Math.Round(DateTime.Now.Subtract(DateTime.MinValue.AddYears(1969)).TotalMilliseconds).ToString();
            File.WriteAllText("time_last_altered.txt", createText);
        }

        private void SaveContacts(List<Contact> contacts)
        {
            var xml = new XElement("contacts",
                contacts.Select(c => new XElement("contact",
                    new XElement("id", c.Id),
                    new XElement("firstName", c.FirstName),
                    new XElement("lastName", c.LastName),
                    new XElement("phone", c.Phone),
                    new XElement("streetAddress", c.StreetAddress),
                    new XElement("city", c.City))
                )
            );
            File.WriteAllText("contacts.xml", xml.ToString());
            SaveTimeLastAltered();
        }

        private List<Contact> LoadContacts()
        {
            List<Contact> res = new List<Contact>();
            try
            {
                XDocument doc = XDocument.Load("contacts.xml");
                var contacts = doc.Element("contacts").Elements("contact");
                foreach (var c in contacts)
                {
                    res.Add(new Contact(
                        c.Element("id").Value,
                        c.Element("firstName").Value,
                        c.Element("lastName").Value,
                        c.Element("phone").Value,
                        c.Element("streetAddress").Value,
                        c.Element("city").Value
                    ));
                }
            } catch {}
            return res;
        }
    }
}
