import { Box, CircularProgress, Modal } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../..';
import TaskForm from './TaskForm';

const TaskWindow = observer(
  ({ isTaskWindow, closeTaskWindow, taskId, userRole }) => {
    const { taskDataStore } = useContext(Context);
    const [isUpdateWindow, setIsUpdateWindow] = useState(false);
    useEffect(() => {
      if (taskId) {
        taskDataStore.setTaskData(taskId);
        setIsUpdateWindow(true);
      } else setIsUpdateWindow(false);
    }, [taskId]);

    return (
      <Modal open={isTaskWindow} onClose={closeTaskWindow}>
        {taskDataStore.isFetching ? (
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
          <TaskForm
            {...{
              closeTaskWindow,
              isUpdateWindow,
              taskDataStore,
              taskId,
              userRole,
            }}
          />
        )}
      </Modal>
    );
  }
);

export default TaskWindow;
