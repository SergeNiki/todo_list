import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import RadioButtonsGroup from '../../components/RadioButtonsGroup';
import UsersComboBox from '../../components/UsersComboBox';

const FormAdmin = ({ isFetching, setIsValid, setFormData }) => {
  const [isComboBox, setIsComboBox] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [firstNameTextError, setFirstNameTextError] = useState('');
  const [lastNameTextError, setLastNameTextError] = useState('');
  const [patronymicTextError, setPatronymicTextError] = useState('');

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginTextError, setLoginTextError] = useState('');
  const [passwordTextError, setPasswordTextError] = useState('');

  const [role, setRole] = useState('');
  const [supervisor, setSupervisor] = useState(null);

  useEffect(() => {
    if (
      !!login &&
      !!password &&
      !!firstName &&
      !!lastName &&
      !firstNameTextError &&
      !lastNameTextError &&
      !patronymicTextError &&
      !loginTextError &&
      !passwordTextError &&
      !!role &&
      !isFetching
    ) {
      if ((role === 'подчинённый' && !!supervisor) || role !== 'подчинённый') {
        setFormData({
          first_name: firstName,
          last_name: lastName,
          patronymic: patronymic ? patronymic : null,
          login,
          password,
          role,
          supervisor_id: supervisor,
        });
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      setIsValid(false);
    }
  }, [
    login,
    password,
    firstName,
    lastName,
    firstNameTextError,
    lastNameTextError,
    patronymicTextError,
    loginTextError,
    passwordTextError,
    role,
    supervisor,
    isFetching,
  ]);

  const textFieldsValue = [
    {
      id: 'firstName',
      label: 'Имя*',
      error: !!firstNameTextError,
      helperText: firstNameTextError,
      changeHandler: (e) => {
        setFirstName(e.target.value);
        if (e.target.value.length > 50) {
          setFirstNameTextError('Максимальный размер поля 50 символов');
        } else if (e.target.value.length === 0) {
          setFirstNameTextError('Поле не может быть пустым');
        } else {
          setFirstNameTextError('');
        }
      },
    },
    {
      id: 'lastName',
      label: 'Фамилия*',
      error: !!lastNameTextError,
      helperText: lastNameTextError,
      changeHandler: (e) => {
        setLastName(e.target.value);
        if (e.target.value.length > 50) {
          setLastNameTextError('Максимальный размер поля 50 символов');
        } else if (e.target.value.length === 0) {
          setLastNameTextError('Поле не может быть пустым');
        } else {
          setLastNameTextError('');
        }
      },
    },
    {
      id: 'patronymic',
      label: 'Отчество',
      error: !!patronymicTextError,
      helperText: patronymicTextError,
      changeHandler: (e) => {
        setPatronymic(e.target.value);
        if (e.target.value.length > 50) {
          setPatronymicTextError('Максимальный размер поля 50 символов');
        } else {
          setPatronymicTextError('');
        }
      },
    },
    {
      id: 'login',
      label: 'Логин*',
      error: !!loginTextError,
      helperText: loginTextError,
      changeHandler: (e) => {
        setLogin(e.target.value);
        if (e.target.value.length < 4 || e.target.value.length > 20) {
          setLoginTextError('Логин должен содержать от 4 до 20 символов');
        } else {
          setLoginTextError('');
        }
      },
    },
    {
      id: 'password',
      label: 'Пароль*',
      error: !!passwordTextError,
      helperText: passwordTextError,
      changeHandler: (e) => {
        setPassword(e.target.value);
        if (e.target.value.length < 4 || e.target.value.length > 20) {
          setPasswordTextError('Пароль должен содержать от 4 до 20 символов');
        } else {
          setPasswordTextError('');
        }
      },
    },
  ];

  const textFields = textFieldsValue.map((value) => (
    <TextField
      key={value.id}
      id={value.id}
      label={value.label}
      variant='outlined'
      margin='dense'
      error={value.error}
      helperText={value.helperText}
      onChange={value.changeHandler}
      sx={{ width: '100%', maxWidth: '400px' }}
    />
  ));

  return (
    <>
      {textFields}
      <RadioButtonsGroup
        setIsComboBox={setIsComboBox}
        radioValues={['подчинённый', 'руководитель', 'админ']}
        setRole={setRole}
      />
      {isComboBox && (
        <UsersComboBox
          setComboBox={setSupervisor}
          usersRole={'руководитель'}
          labelComboBox='Руководитель пользователя'
        />
      )}
    </>
  );
};

export default FormAdmin;
