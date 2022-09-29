import { TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import FormContainer from '../../components/FormContainer';
import { Container } from '@mui/system';
import { roles } from './../../data';
import { Navigate } from 'react-router-dom';

const Login = observer((props) => {
  const { authUserStore } = useContext(Context);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!!login && !!password && !authUserStore.isFetching) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [login, password, authUserStore.isFetching]);

  const loginHandler = (e) => {
    setLogin(e.target.value);
    authUserStore.clearMessages();
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    authUserStore.clearMessages();
  };

  const submit = (e) => {
    e.preventDefault();
    authUserStore.login(login, password);
  };

  if (authUserStore.isAuth) {
    if (authUserStore.userData.role === roles.ADMIN) {
      return <Navigate to={'/admin'} />;
    } else return <Navigate to={'/todo'} />;
  }

  return (
    <Container>
      <FormContainer
        header='Авторизация'
        isValid={isValid}
        buttonText='ВОЙТИ'
        submit={submit}>
        <TextField
          id='login'
          label='Логин'
          variant='outlined'
          margin='dense'
          sx={{ width: '100%', maxWidth: '400px' }}
          helperText={authUserStore.errorMessage}
          error={!!authUserStore.errorMessage}
          onChange={loginHandler}
        />
        <TextField
          id='Password'
          label='Пароль'
          variant='outlined'
          margin='dense'
          sx={{ width: '100%', maxWidth: '400px' }}
          helperText={authUserStore.errorMessage}
          error={!!authUserStore.errorMessage}
          onChange={passwordHandler}
        />
      </FormContainer>
    </Container>
  );
});

export default Login;
