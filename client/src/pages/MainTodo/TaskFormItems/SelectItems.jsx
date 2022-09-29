import { Box } from '@mui/system';
import SelectComp from '../../../components/SelectComp';
import { taskPriority, taskStatus } from '../../../data';

const SelectItems = ({
  priority,
  priorityChange,
  status,
  statusChange,
  isAccess,
}) => {
  return (
    <Box style={{ display: 'flex', gap: '10px', width: '100%' }}>
      <SelectComp
        readOnly={!isAccess}
        label='Приоритет'
        value={priority}
        onChange={priorityChange}
        items={[taskPriority.HIGH, taskPriority.MEDIUM, taskPriority.LOW]}
      />
      <SelectComp
        readOnly={false}
        label='Статус'
        value={status}
        onChange={statusChange}
        items={[
          taskStatus.TO_FULFILLMENT,
          taskStatus.IN_PROCESS,
          taskStatus.COMPLETED,
          taskStatus.CANCELED,
        ]}
      />
    </Box>
  );
};

export default SelectItems;
