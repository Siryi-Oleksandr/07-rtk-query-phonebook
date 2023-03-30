import { useState } from 'react';
import PropTypes from 'prop-types';
import { HiUser } from 'react-icons/hi';
import { ImPhone } from 'react-icons/im';
import {
  Item,
  ContactTel,
  ContactName,
  ContactInfo,
} from 'components/ContactItem/ContactItem.styled';
import { Controls, ControlsSave } from 'components/Control/Controls';
import EditForm from 'components/EditForm';
import { toast } from 'react-hot-toast';
import {
  useDeleteContactMutation,
  useEditContactMutation,
} from 'redux/apiSlice';

function ContactItem({ name, number, id }) {
  const [editName, setEditName] = useState(name);
  const [editNumber, setEditNumber] = useState(number);
  const [isEdit, setIsEdit] = useState(false);

  const [deleteContact] = useDeleteContactMutation();
  const [editContact] = useEditContactMutation();

  const handleDeleteContact = async id => {
    try {
      await deleteContact(id);
      toast.success(`Contact "${name} is successfully removed!"`);
    } catch (error) {
      toast.error(`Error ${error.message}"`);
      console.error(error);
    }
  };

  const handleEditContact = async (newName, newNumber) => {
    if (!isEdit) {
      setIsEdit(true);
    } else {
      setEditName(prevName => (newName ? newName : prevName));
      setEditNumber(prevNumber => (newNumber ? newNumber : prevNumber));
      setIsEdit(false);

      try {
        await editContact({
          id: id,
          name: newName ? newName : name,
          number: newNumber ? newNumber : number,
        });
        toast.success(`Contact "${name} is successfully edited!"`);
      } catch (error) {
        toast.error(`Error ${error.message}"`);
        console.error(error);
      }
    }
  };

  return (
    <Item>
      {/* if contact saved show contact info */}

      {!isEdit && (
        <>
          <ContactInfo>
            <ContactName>
              <HiUser />
              {name}:
            </ContactName>

            <ContactTel>
              <ImPhone />
              {number}
            </ContactTel>
          </ContactInfo>
          <Controls
            id={id}
            onDeleteContact={handleDeleteContact}
            onEditContact={handleEditContact}
          />
        </>
      )}

      {/* if contact is edit show edit form */}
      {isEdit && (
        <EditForm
          name={editName}
          number={editNumber}
          onEditContact={handleEditContact}
        >
          <ControlsSave id={id} onDeleteContact={handleDeleteContact} />
        </EditForm>
      )}
    </Item>
  );
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ContactItem;
