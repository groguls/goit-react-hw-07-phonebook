import { useDispatch, useSelector } from 'react-redux';
import { ContactButton, ContactItem, ContactWrap } from './Contact.styled';
import { deleteContact } from 'redux/operations';
import { useState } from 'react';
import { UpdateForm } from 'components/UpdateForm/UpdateForm';
import { selectIsLoading } from 'redux/contactsSlice';
import { ButtonsWrap } from 'components/ContactForm/ContactForm.styled';
import { Spinner } from 'components/Spinner';

export const Contact = ({ id, name, phone }) => {
  const [isEdit, setIsEdit] = useState(false);
  const isLoad = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  return (
    <>
      {!isEdit ? (
        <ContactItem>
          <ContactWrap>
            <p>{name}</p>
            <p>{phone}</p>
          </ContactWrap>
          <ButtonsWrap>
            <ContactButton
              type="button"
              onClick={() => {
                setIsEdit(true);
              }}
            >
              Edit
            </ContactButton>
            <ContactButton
              type="button"
              onClick={() => {
                dispatch(deleteContact(id));
              }}
              disabled={isLoad}
            >
              Delete {isLoad && <Spinner />}
            </ContactButton>
          </ButtonsWrap>
        </ContactItem>
      ) : (
        <UpdateForm id={id} name={name} phone={phone} handleEdit={setIsEdit} />
      )}
    </>
  );
};
