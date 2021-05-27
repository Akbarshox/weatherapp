import React, {useContext} from 'react';
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import style from './textfield.module.css';

const useStyles = makeStyles((theme, state) => ({
   inputRoot: {
      fontSize: 12,
      color: '#fff',
      width: '95%',
      fontFamily: "Montserrat",
      "& .MuiOutlinedInput-notchedOutline": {
         borderWidth: "1px",
         borderColor: "rgba(255, 255, 255, 1)",
         fontSize: 12,
         height: 38
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
         borderWidth: "1px",
         borderColor: "#fff",
         fontSize: 12,
      },
      "&.Mui-focused .MuiOutlinedInput": {
         borderWidth: "1px",
         borderColor: "#fff"
      },
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
         borderColor: state => state.mode === 'dark' ? "#fff" : "#000",
         color: '#000'
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
         borderColor: "#fff"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
         borderColor: "#fff"
      },
   },
   label: {
      fontSize: 12,
      color: '#fff'
   },
   icon: {
      color: 'white',
   },
   progress: {
      Width: 10,
      margin: "auto"
   },
}));

export default function Input(props) {
   const classes = useStyles();
   let inputElement = null;

   switch (props.inputType) {
      case ('textField'):
         inputElement = <TextField
            key={props.key}
            variant={props.variant}
            size={props.size}
            name={props.name}
            error={props.error}
            type={props.type}
            disabled={props.disabled}
            value={props.value}
            autoFocus={props.autoFocus}
            required={props.required}
            autoComplete={props.autoComplete}
            label={props.label}
            placeholder={props.placeholder}
            onChange={props.onChange}
            inputRef={props.inputRef}
            prefix={props.prefix}
            defaultValue={props.defaultValue}
            SelectProps={{
               classes: {icon: classes.icon},
            }}
            style={props.style}
            className={classes.inputRoot}
            InputLabelProps={{className: style.label}}
         />
         break;
   }

   return inputElement
}