import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  handleFormSubmit = newContact => {
    const { contacts } = this.state;

    if (contacts.find(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already in contact`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleDelete = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onFormSubmit={this.handleFormSubmit} />

        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.handleChange} />
        <ContactList
          contacts={this.filterContacts()}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}
export default App;
