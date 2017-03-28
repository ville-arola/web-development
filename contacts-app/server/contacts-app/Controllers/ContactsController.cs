using System.Collections.Generic;
using contacts_app.Models;
using contacts_app.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace contacts_app.Controllers
{
    [Route("api/contacts")]
    [EnableCors("MyPolicy")]
    public class ContactsController : Controller
    {
        private readonly IContactService _contactService;

        public ContactsController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        public List<Contact> GetAll()
        {
            return _contactService.FindAllContacts();
        }

        [HttpGet("{id}", Name = "GetContact")]
        public Contact GetById(int id)
        {
            return _contactService.FindContactById(id);
        }

        [HttpPost]
        public int Post([FromBody] Contact contact)
        {
            return _contactService.SaveContact(contact);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Contact contact)
        {
            if (contact == null)
            {
                return BadRequest();
            }
            var contactToUpdate = _contactService.FindContactById(id);
            if (contactToUpdate == null)
            {
                return NotFound();
            }
            contactToUpdate.FirstName = contact.FirstName;
            contactToUpdate.LastName = contact.LastName;
            contactToUpdate.Phone = contact.Phone;
            contactToUpdate.StreetAddress = contact.StreetAddress;
            contactToUpdate.City = contact.City;
            _contactService.Update(contactToUpdate);
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var contact = _contactService.FindContactById(id);
            if (contact == null)
            {
                return NotFound();
            }

            _contactService.Remove(id);
            return new NoContentResult();
        }
    }
}
