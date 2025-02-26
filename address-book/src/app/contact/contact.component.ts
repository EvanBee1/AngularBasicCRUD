import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  newContact = { id: 0, name: '', email: '', phone: '' };
  currentContact: any = null;
  contacts: any[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contacts = this.contactService.getContacts();
  }

  addContact(): void {
    if (this.newContact.name && this.newContact.email && this.newContact.phone) {
      this.newContact.id = this.contacts.length + 1;
      this.contactService.addContact({ ...this.newContact });
      this.loadContacts();
      this.resetForm();
    }
  }

  updateContact(): void {
    if (this.newContact) {
      this.contactService.updateContact({ ...this.newContact });
      this.currentContact = null;
      this.loadContacts();
    }
  }

  editContact(contact: any): void {
    this.currentContact = { ...contact };
    this.newContact = { ...contact };
  }

  cancelEdit(): void {
    this.currentContact = null;
    this.resetForm();
  }

  deleteContact(id: number): void {
    this.contactService.deleteContact(id);
    this.loadContacts();
  }

  resetForm(): void {
    this.newContact = { id: 0, name: '', email: '', phone: '' };
  }
}
