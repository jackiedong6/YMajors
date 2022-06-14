import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export const FormCheckbox = ({ name, classIsTaken }) => {
  // const isClassTaken = (className) => {
  //     return classesTaken.includes(className);
  // }

  return (
    <Box>
      <Box>
        <FormControlLabel label={name} control={<Checkbox />} />
      </Box>
    </Box>
  );
};
