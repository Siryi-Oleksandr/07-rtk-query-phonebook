import ContactItem from 'components/ContactItem';

// import { getFilteredContacts } from 'redux/selectors';
import { useGetContactsQuery } from '../../redux/apiSlice';

function ContactList() {
  const { data: contacts } = useGetContactsQuery();

  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <ContactItem key={id} name={name} number={number} id={id} />
      ))}
    </ul>
  );
}

export default ContactList;
