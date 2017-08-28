import { Injectable } from '@angular/core';
import { Contact } from "../contact";

@Injectable()
export class ContactService {

  private contacts: Contact[];

  constructor() {
    this.contacts = [
      new Contact(1, 'Ville', 'Arola'),
      new Contact(2, 'Joku', 'Muu')
    ];
  }

  public findContacts(): Contact[] {
    return this.contacts;
  }
}
