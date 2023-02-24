import { Autocomplete, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Context } from '../index';

const UsersComboBox = observer(
  ({ usersRole, setComboBox, labelComboBox, sizeInput, readOnly }) => {
    const { usersStore } = useContext(Context);
    const { setUsers, usersList } = usersStore;

    useEffect(() => {
      setUsers(usersRole);
    }, [usersRole, setUsers]);

    const usersOptions = usersList.map((user) => {
      return {
        id: user.id,
        label: `${user.first_name} ${user.last_name} ${
          user.patronymic ? user.patronymic : ''
        }`,
      };
    });

    const comboBoxHandler = (e, value) => {
      setComboBox(value?.id ? value.id : null);
    };

    return (
      <Autocomplete
        readOnly={readOnly}
        disablePortal
        id='users-combo-box'
        options={usersOptions}
        sx={{ width: '100%', maxWidth: '300px' }}
        onChange={comboBoxHandler}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{ backgroundColor: 'white' }}
            size={sizeInput}
            label={labelComboBox}
            margin='dense'
          />
        )}
      />
    );
  }
);

export default UsersComboBox;
