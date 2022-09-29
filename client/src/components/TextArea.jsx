import { TextareaAutosize } from '@mui/material';

const TextArea = ({
  isAccess,
  description,
  descriptionChange,
  placeholder,
}) => {
  return (
    <TextareaAutosize
      readOnly={!isAccess}
      minRows={5}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
      }}
      value={description}
      onChange={descriptionChange}
    />
  );
};

export default TextArea;
