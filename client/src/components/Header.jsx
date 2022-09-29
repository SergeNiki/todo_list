import { Button, Container, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { Box } from '@mui/system';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '..';

const Header = observer(() => {
  const { authUserStore } = useContext(Context);

  const logout = (e) => {
    e.preventDefault();
    authUserStore.logout();
  };

  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Container>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Typography variant='h4' left={0}>
                TODO LIST
              </Typography>
              {authUserStore.isAuth && (
                <Box>
                  {`${authUserStore.userData.first_name} ${authUserStore.userData.last_name}`}
                  <Button
                    variant='text'
                    color='inherit'
                    sx={{ marginLeft: '10px' }}
                    onClick={logout}>
                    ВЫЙТИ
                  </Button>
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </header>
  );
});

export default Header;
