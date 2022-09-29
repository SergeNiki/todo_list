import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SelectComp = (props) => {
  return (
    <FormControl fullWidth size={props.size}>
      <InputLabel id='demo-simple-select-label'>{props.label}</InputLabel>
      <Select
        readOnly={props.readOnly}
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={props.value}
        label={props.label}
        style={props.styles}
        onChange={props.onChange}>
        {props.items.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectComp;
