import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import UsersComboBox from '../../components/UsersComboBox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { roles } from '../../data';

const TodoMenu = ({
  dateGroup,
  setDateGroup,
  setSubordinatesGroup,
  userRole,
  openTaskWindow,
}) => {
  const dateGroupChange = (e) => {
    setDateGroup(e.target.value);
  };

  return (
    <Box
      sx={{ backgroundColor: '#F3F3F3' }}
      width='100%'
      maxWidth={'800px'}
      padding='10px'
      margin={'20px auto'}
      display='flex'
      justifyContent='space-around'
      alignItems={'center'}
      boxSizing='border-box;'
      borderRadius={'5px'}>
      <FormControl size='small'>
        <Typography color='primary' mb={'8px'}>
          По дате завершения
        </Typography>
        <Select
          sx={{ backgroundColor: 'white' }}
          value={dateGroup}
          onChange={dateGroupChange}
          inputProps={{ 'aria-label': 'Without label' }}>
          <MenuItem value='За всё время'>За всё время</MenuItem>
          <MenuItem value='На сегодня'>На сегодня</MenuItem>
          <MenuItem value='На неделю'>На неделю</MenuItem>
          <MenuItem value='На будущее'>На будущее</MenuItem>
        </Select>
      </FormControl>
      {userRole === roles.SUPERVISOR && (
        <>
          <Box width={'300px'}>
            <Typography color='primary'>По ответственным</Typography>
            <UsersComboBox
              usersRole={roles.SUBORDINATE}
              setComboBox={setSubordinatesGroup}
              labelComboBox='Мои подчинённые'
              sizeInput={'small'}
            />
          </Box>
          <Button
            sx={{ height: '' }}
            variant='contained'
            startIcon={<AddCircleOutlineIcon />}
            onClick={openTaskWindow}>
            Создать
          </Button>
        </>
      )}
    </Box>
  );
};

export default TodoMenu;
