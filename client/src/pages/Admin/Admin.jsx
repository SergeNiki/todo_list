import { Alert, Snackbar } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../..';
import FormContainer from '../../components/FormContainer';
import withAuthRouter from '../../hoc/withAuthRouter';
import FormAdmin from './FormAdmin';

const Admin = observer((props) => {
  const { authUserStore } = useContext(Context);

  if (authUserStore.userData.role !== 'админ') {
    return <Navigate to={'/todo'} />;
  }

  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState();
  const [alertMessage, setAlertMessage] = useState('');

  const submit = (e) => {
    e.preventDefault();
    authUserStore.registration(formData);
  };

  useEffect(() => {
    if (!!authUserStore.successMessage) {
      setOpenAlert(true);
      setIsSuccess(true);
      setAlertMessage(authUserStore.successMessage);
    }
    if (!!authUserStore.errorMessage) {
      setOpenAlert(true);
      setIsSuccess(false);
      setAlertMessage(authUserStore.errorMessage);
    }
  }, [authUserStore.successMessage, authUserStore.errorMessage]);

  useEffect(() => {
    return () => {
      authUserStore.clearMessages();
    };
  }, []);

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <>
      <FormContainer
        header='Добавление нового пользователя'
        buttonText='Добавить'
        isValid={isValid}
        submit={submit}>
        <FormAdmin
          isFetching={authUserStore.isFetching}
          setIsValid={setIsValid}
          setFormData={setFormData}
        />
      </FormContainer>
      <Snackbar
        open={openAlert}
        autoHideDuration={5000}
        onClose={handleCloseAlert}>
        <Alert
          onClose={handleCloseAlert}
          color={isSuccess ? 'info' : 'error'}
          severity={isSuccess ? 'success' : 'error'}
          sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
});

export default withAuthRouter(Admin);
