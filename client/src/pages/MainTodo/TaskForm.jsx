import {
  Button,
  TextField,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import TextArea from '../../components/TextArea';
import UsersComboBox from '../../components/UsersComboBox';
import DatePickers from './TaskFormItems/DatePickers';
import SelectItems from './TaskFormItems/SelectItems';
import dayjs from 'dayjs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 700,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

const TaskForm = observer(
  ({ closeTaskWindow, isUpdateWindow, taskDataStore, userRole }) => {
    const isAccess = userRole === 'руководитель' ? true : false;

    const [title, setTitle] = useState(taskDataStore.taskData.title);
    const titleChange = (e) => {
      setTitle(e.target.value);
    };

    const [description, setDescription] = useState(
      taskDataStore.taskData.description
    );
    const descriptionChange = (e) => {
      setDescription(e.target.value);
    };

    const [priority, setPriority] = useState(taskDataStore.taskData.priority);
    const priorityChange = (e) => {
      setPriority(e.target.value);
    };

    const [status, setStatus] = useState(taskDataStore.taskData.status);
    const statusChange = (e) => {
      setStatus(e.target.value);
    };

    const [expirationDate, setExpirationDate] = useState(
      taskDataStore.taskData.expiration_date
    );
    const expirationDateChange = (newValue) => {
      setExpirationDate(newValue);
    };

    const [responsible_id, setResponsible_id] = useState(null);
    const responsibleChange = (newValue) => {
      setResponsible_id(newValue);
    };

    const [isResponsibleChecked, setIsResponsibleChecked] = useState(false);
    const responsibleCheckedHandler = (e) => {
      setIsResponsibleChecked(e.target.checked);
    };

    const submit = (e) => {
      e.preventDefault();
      const taskData = {
        title,
        description,
        expiration_date: dayjs(expirationDate).add(1, 'day'),
        priority,
        status,
        responsible_id,
      };
      if (isUpdateWindow) {
        taskData.id = taskDataStore.taskData.id;
        taskDataStore.updateTask(taskData, closeTaskWindow);
      } else {
        taskDataStore.createTask(taskData, closeTaskWindow);
      }
    };

    return (
      <Box sx={style} component='form' onSubmit={submit}>
        <TextField
          id='title'
          label='Заголовок'
          value={title}
          variant='outlined'
          sx={{ width: '100%' }}
          onChange={titleChange}
          InputProps={{
            readOnly: !isAccess,
          }}
        />
        <TextArea
          placeholder='Описание'
          {...{ isAccess, description, descriptionChange }}
        />
        <DatePickers
          {...{
            isUpdateWindow,
            expirationDate,
            expirationDateChange,
            isAccess,
          }}
          taskData={taskDataStore.taskData}
        />
        <SelectItems
          {...{ priority, priorityChange, status, statusChange, isAccess }}
        />
        {isUpdateWindow && (
          <Typography color='text.secondary'>
            Создатель: <b>{taskDataStore.taskData.creator}</b>
          </Typography>
        )}
        {isUpdateWindow && (
          <Typography color='text.secondary'>
            Ответственный: <b>{taskDataStore.taskData.responsible}</b>
          </Typography>
        )}
        {isAccess && (
          <FormControlLabel
            control={
              <Checkbox
                checked={isResponsibleChecked}
                onChange={responsibleCheckedHandler}
              />
            }
            label={
              isUpdateWindow
                ? 'Переназначить ответственного'
                : 'Назначить ответственного'
            }
          />
        )}
        {isResponsibleChecked && isAccess && (
          <UsersComboBox
            readOnly={!isAccess}
            usersRole='подчинённый'
            setComboBox={responsibleChange}
            labelComboBox='Ответственный'
          />
        )}
        <Button
          sx={{ height: '', width: '100%', maxWidth: '200px' }}
          variant='contained'
          disabled={
            !title ||
            !description ||
            !expirationDate ||
            !priority ||
            !status ||
            (!responsible_id && isResponsibleChecked)
          }
          type='submit'>
          {isUpdateWindow ? 'Обновить' : 'Создать'}
        </Button>
      </Box>
    );
  }
);

export default TaskForm;
