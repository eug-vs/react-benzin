import React from 'react';
import { Button as MaterialButton } from '@material-ui/core';


interface PropTypes {
  color: 'primary' | 'secondary';
}

const Button: React.FC<PropTypes> = ({ color, children }) => (
  <MaterialButton
    variant="contained"
    color={color}
    children={children}
  />
);


export default Button;
