import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contacts: Contact[] = [];
  currentContact: Contact | null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contacts = this.contactService.getContacts();
  }

  addContact(name: string, email: string, phone: string): void {
    const newContact: Contact = { id: 0, name, email, phone };
    this.contactService.addContact(newContact);
    this.loadContacts();
  }

  editContact(contact: Contact): void {
    this.currentContact = { ...contact };
  }

  updateContact(): void {
    if (this.currentContact) {
      this.contactService.updateContact(this.currentContact);
      this.currentContact = null;
      this.loadContacts();
    }
  }

  deleteContact(id: number): void {
    this.contactService.deleteContact(id);
    this.loadContacts();
  }

  cancelEdit(): void {
    this.currentContact = null;
  }
}