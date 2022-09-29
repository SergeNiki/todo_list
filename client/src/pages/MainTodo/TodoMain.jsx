import { Box, CircularProgress, Container } from '@mui/material';
import { Stack } from '@mui/system';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../..';
import Task from '../../components/Task';
import { roles } from '../../data';
import withAuthRouter from '../../hoc/withAuthRouter';
import TaskWindow from './TaskWindow';
import TodoMenu from './TodoMenu';

const MainTodo = observer(({ authUserStore }) => {
  const { taskListStore } = useContext(Context);
  const { taskDataStore } = useContext(Context);
  const [dateGroup, setDateGroup] = useState('За всё время');
  const [subordinatesGroup, setSubordinatesGroup] = useState(null);

  if (authUserStore.userData.role === roles.ADMIN) {
    return <Navigate to={'/admin'} />;
  }

  const [isTaskWindow, setIsTaskWindow] = useState(false);
  const openTaskWindow = () => {
    setIsTaskWindow(true);
  };
  const closeTaskWindow = () => {
    setIsTaskWindow(false);
    taskDataStore.clearStore();
    setTaskId(null);
  };

  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    subordinatesGroup
      ? taskListStore.setTaskList(subordinatesGroup)
      : taskListStore.setTaskList();
  }, [subordinatesGroup, taskListStore, taskDataStore.taskData]);

  useEffect(() => {
    return () => {
      taskListStore.clearStore();
    };
  }, [taskListStore]);

  return (
    <Container>
      <TaskWindow
        isTaskWindow={isTaskWindow}
        closeTaskWindow={closeTaskWindow}
        userRole={authUserStore.userData.role}
        taskId={taskId}
      />
      <TodoMenu
        dateGroup={dateGroup}
        setDateGroup={setDateGroup}
        setSubordinatesGroup={setSubordinatesGroup}
        userRole={authUserStore.userData.role}
        openTaskWindow={openTaskWindow}
      />
      {taskListStore.isFetching ? (
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={2} mb='20px'>
          {taskListStore.taskList.map((task) => (
            <Task
              key={task.id}
              taskData={task}
              openTaskWindow={openTaskWindow}
              setTaskId={setTaskId}
            />
          ))}
        </Stack>
      )}
    </Container>
  );
});

export default withAuthRouter(MainTodo);
