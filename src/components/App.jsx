import {
  ContactListWraper,
  GlobalStyle,
  MainTitle,
  PageWrapper,
  Title,
} from './GlobalStyle';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/contactsSlice';

export const App = () => {
  const contacts = useSelector(getContacts);

  return (
    <PageWrapper>
      <GlobalStyle />
      <MainTitle>Phonebook</MainTitle>
      <ContactForm />
      <ContactListWraper>
        <Title>Contacts</Title>
        {contacts.length > 0 && (
          <>
            <Filter />
            <ContactList />
          </>
        )}
      </ContactListWraper>
    </PageWrapper>
  );
};
