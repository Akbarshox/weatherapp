import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';
import {useSelector} from "react-redux";

function Alert(props) {
   return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      '& > * + *': {
         marginTop: theme.spacing(2),
      },
   },
}));

export default function Snacks() {
   const classes = useStyles();
   const [open, setOpen] = React.useState(false);
   const error = useSelector(state => state.reducerWeather.error);

   React.useEffect(() => {
      setOpen(error);
   }, [error])

   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      setOpen(false);
   };

   return (
      <div className={classes.root}>
         <Snackbar open={open} autoHideDurastion={500} onClose={handleClose}
                   anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
            <Alert severity="error">
               Город не найден!
            </Alert>
         </Snackbar>
      </div>
   );
}