import { Box, Button, Typography } from '@mui/material';

const FormContainer = ({ children, header, isValid, buttonText, submit }) => {
  return (
    <Box
      component='form'
      noValidate
      autoComplete='off'
      height='calc(100vh - 64px)'
      display={'flex'}
      flexDirection={'column'}
      justifyContent='center'
      alignItems='center'
      textAlign={'center'}
      onSubmit={submit}>
      <Typography variant='h5' mb={'10px'} color={'primary'}>
        {header}
      </Typography>
      {children}
      <Box maxWidth={'400px'} width={'100%'} margin='20px auto'>
        <Button
          size='large'
          variant='contained'
          sx={{ width: '100%', maxWidth: '200px' }}
          disabled={!isValid}
          type='submit'>
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
};

export default FormContainer;
