import React from 'react';
import { FormStyled, FormLabel, Input, Button } from './ContactForm.styled';
import { toast } from 'react-hot-toast';
import { useAddContactMutation, useGetContactsQuery } from 'redux/apiSlice';

const nameRegExp = "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";
const phoneRegExp =
  '+?d{1,4}?[-.s]?(?d{1,3}?)?[-.s]?d{1,4}[-.s]?d{1,4}[-.s]?d{1,9}';

export const ContactForm = () => {
  const { data: contacts = [] } = useGetContactsQuery();
  const [addContact, { isLoading }] = useAddContactMutation();

  const handleSubmit = async evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    const isNotUnique = contacts.some(contact => contact.name === name);
    if (isNotUnique) {
      return toast.success(`"${name}" is already in contacts.`);
    }

    try {
      await addContact({
        name,
        number,
      });

      toast.success(`Contact "${name} is successfully added!"`);
    } catch (error) {
      toast.error(`Error ${error.message}"`);
      console.error(error);
    }

    form.reset();
  };

  return (
    <FormStyled onSubmit={handleSubmit} autoComplete="off">
      <FormLabel>
        Name
        <Input
          type="text"
          name="name"
          pattern={nameRegExp}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        />
      </FormLabel>
      <FormLabel>
        Number
        <Input
          type="tel"
          name="number"
          pattern={phoneRegExp}
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        />
      </FormLabel>

      <Button disabled={isLoading} type="submit">
        Add contact
      </Button>
    </FormStyled>
  );
};

export default ContactForm;
