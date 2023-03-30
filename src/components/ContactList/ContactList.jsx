import ContactItem from 'components/ContactItem';
import { useSelector } from 'react-redux';
import { useGetContactsQuery } from '../../redux/apiSlice';

function ContactList() {
  const { data: contacts = [] } = useGetContactsQuery();
  const filterValue = useSelector(state => state.filter);

  const normalizedFilter = filterValue.toLocaleLowerCase().trim();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLocaleLowerCase().includes(normalizedFilter)
  );

  return (
    <ul>
      {visibleContacts.map(({ id, name, number }) => (
        <ContactItem key={id} name={name} number={number} id={id} />
      ))}
    </ul>
  );
}

export default ContactList;
