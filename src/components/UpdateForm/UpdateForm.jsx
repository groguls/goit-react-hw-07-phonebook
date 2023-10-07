import { Formik, Field } from 'formik';
import { StyledForm, ErrorMsg, InputWrap } from './UpdateForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectIsLoading } from 'redux/contactsSlice';
import { editContact } from 'redux/operations';
import { Spinner } from 'components/Spinner';
import { ContactButton } from 'components/Contact/Contact.styled';
import { ButtonsWrap } from 'components/ContactForm/ContactForm.styled';
import toast from 'react-hot-toast';
import { SignupSchema } from 'components/ContactForm/ContactForm';

export const UpdateForm = ({ id, name, phone, handleEdit }) => {
  const contacts = useSelector(selectContacts);
  const isLoad = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const onFormSubmit = values => {
    const { name } = values;
    const currentIndex = contacts.findIndex(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (currentIndex !== -1 && contacts[currentIndex].id !== id) {
      toast.error(`${name} is alredy in contacts`);
      return;
    }
    dispatch(editContact({ id, values }));
    handleEdit(false);
  };

  return (
    <Formik
      initialValues={{ name, phone }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        onFormSubmit(values);
      }}
    >
      <StyledForm>
        <InputWrap>
          <Field name="name" type="text" placeholder="Jacob Mercer" />
          <Field name="phone" type="tel" placeholder="067 123 45 67" />
          <ErrorMsg component="div" name="name" />
          <ErrorMsg component="div" name="phone" />
        </InputWrap>
        <ButtonsWrap>
          <ContactButton type="submit">
            Update {isLoad && <Spinner />}
          </ContactButton>
          <ContactButton
            type="button"
            onClick={() => {
              handleEdit(false);
            }}
          >
            Cancel
          </ContactButton>
        </ButtonsWrap>
      </StyledForm>
    </Formik>
  );
};
