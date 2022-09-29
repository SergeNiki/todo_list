import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

const DatePickers = ({
  isUpdateWindow,
  expirationDate,
  expirationDateChange,
  taskData,
  isAccess,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {isUpdateWindow && (
        <>
          <DatePicker
            readOnly
            label='Дата создания'
            inputFormat='DD/MM//YYYY'
            value={taskData.create_date}
            onChange={expirationDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            readOnly
            label='Дата обновления'
            inputFormat='DD/MM//YYYY'
            value={taskData.update_date}
            onChange={expirationDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </>
      )}
      <DatePicker
        readOnly={!isAccess}
        label='Дата окончания'
        inputFormat='DD/MM//YYYY'
        value={expirationDate}
        onChange={expirationDateChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default DatePickers;
