import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { roles } from './../data';

const RadioButtonsGroup = ({ radioValues, setIsComboBox, setRole }) => {
  const buttons = radioValues.map((radioValue) => (
    <FormControlLabel
      key={radioValue}
      value={radioValue}
      control={<Radio />}
      label={radioValue}
    />
  ));

  const handleChange = (e) => {
    setRole(e.target.value);
    if (e.target.value === roles.SUBORDINATE) {
      setIsComboBox(true);
    } else {
      setIsComboBox(false);
    }
  };

  return (
    <FormControl sx={{ marginTop: '10px' }}>
      <FormLabel id='demo-row-radio-buttons-group-label'>
        Роль пользователя*
      </FormLabel>
      <RadioGroup
        row
        sx={{ margin: 'auto' }}
        aria-labelledby='demo-row-radio-buttons-group-label'
        name='row-radio-buttons-group'
        onChange={handleChange}>
        {buttons}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonsGroup;
