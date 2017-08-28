using System.Collections.Generic;
using System.Threading.Tasks;
using contacts_app.Models;
using contacts_app.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace contacts_app.Controllers
{
    [Route("api/contacts")]
    [EnableCors("MyPolicy")]
    public class ContactsController : Controller
    {
        private readonly IContactService _contactService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ContactsController(IContactService contactService, IHttpContextAccessor httpContextAccessor)
        {
            _contactService = contactService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        public List<Contact> GetAll()
        {
            return _contactService.FindAllContacts();
        }

        [HttpGet("{id}", Name = "GetContact")]
        public Contact GetById(string id)
        {
            return _contactService.FindContactById(id);
        }

        [HttpGet("time-altered", Name = "GetTimeLastAltered")]
        public string GetTimeLastAltered()
        {
            return _contactService.GetTimeLastAltered();
        }

        [HttpPost]
        public IActionResult Post([FromBody] Contact contact)
        {
            _contactService.SaveContact(contact);
            return NoContent();
        }

        [HttpPut("{id}")]
        public int Update(string id, [FromBody] Contact contact)
        {
            if (contact == null)
            {
                return -1;
            }
            var contactToUpdate = _contactService.FindContactById(id);
            if (contactToUpdate == null)
            {
                return 0;
            }
            contactToUpdate.FirstName = contact.FirstName;
            contactToUpdate.LastName = contact.LastName;
            contactToUpdate.Phone = contact.Phone;
            contactToUpdate.StreetAddress = contact.StreetAddress;
            contactToUpdate.City = contact.City;
            _contactService.Update(contactToUpdate);
            return 1;
        }

        [HttpDelete("{id}")]
        public bool Delete(string id)
        {
            var contact = _contactService.FindContactById(id);
            if (contact == null)
            {
                return false;
            }
            _contactService.Remove(id);
            return true;
        }

        [HttpGet("sse")]
        public async Task ServerSentEvents()
        {
            Event e;
            Response.ContentType = "text/event-stream";
            while (_contactService.GetNextEvent(out e))
            {
                string eventString = string.Format("event: {0}\ndata: ", e.Type);
                switch (e.Type)
                {
                    case "contactAdded":
                        eventString += JsonConvert.SerializeObject(
                            _contactService.FindContactById(e.TargetId),
                            Formatting.None,
                            new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() }
                        );
                        break;
                    case "contactEdited":
                        eventString += JsonConvert.SerializeObject(
                            _contactService.FindContactById(e.TargetId),
                            Formatting.None,
                            new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() }
                        );
                        break;
                    case "contactDeleted":
                        eventString += e.TargetId;
                        break;
                }
                await Response.WriteAsync(eventString + "\n\n");
                Response.Body.Flush();
            }
        }
    }
}
