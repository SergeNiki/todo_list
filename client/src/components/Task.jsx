import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { taskStatus } from './../data';

const Task = observer(({ taskData, openTaskWindow, setTaskId }) => {
  const expirationDate = dayjs(taskData.expiration_date).format('DD.MM.YYYY');
  const nowDate = dayjs()
    .set('hour', 0)
    .set('minute', 0)
    .set('second', 0)
    .set('milliseconds', 0);

  const isCompleted = taskData.status === taskStatus.COMPLETED ? true : false;

  let colorTitle = '';
  if (isCompleted) {
    colorTitle = 'green';
  }
  if (!isCompleted && dayjs(taskData.expiration_date) < nowDate) {
    colorTitle = 'red';
  }

  const openTaskHandler = (e) => {
    setTaskId(taskData.id);
    openTaskWindow();
  };

  return (
    <Card
      sx={{
        width: '100%',
        margin: 'auto',
        opacity: taskData.status === taskStatus.CANCELED ? 0.5 : 1,
      }}
      onClick={openTaskHandler}>
      <CardActionArea>
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '16px 26px',
          }}>
          <Box display='flex' flexDirection='column' alignItems='flex-start'>
            <Typography color={colorTitle} variant='h5'>
              {taskData.title}
            </Typography>
            <Typography color='text.secondary'>
              Приоритет: <b>{taskData.priority}</b>
            </Typography>
            <Typography color='text.secondary'>
              Ответственный: <b>{taskData.responsibleName}</b>
            </Typography>
          </Box>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            alignItems='flex-end'>
            <Typography variant='h6'>{taskData.status}</Typography>
            <Typography variant='body2'>
              Дата окончания: {expirationDate}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default Task;
