import React, {useState} from 'react';
import style from './dashboard.module.css';
import DayList from "./DayList";
import Input from "../UI/TextField";
import {Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import Allactions from "../store/actions/Allactions";
import Snacks from "../UI/Snackbar";

export default function Dashboard() {
   const state = useSelector(state => state.reducerWeather)
   const dispatch = useDispatch();
   const [cityName, setCityName] = useState(state.cityName);

   const handleChangeInputs = (e) => {
      setCityName(e.target.value);
      dispatch(Allactions.FetchActon.setError(false))
   }
   const handleClick = () => {
      dispatch(Allactions.FetchActon.setCityName(cityName));
   }

   return (
      <div>
         <p className={style.header}>ПРОГНОЗ ПОГОДЫ НА 5 ДНЕЙ</p>
         <div className={style.input}>
            <Input
               required={true}
               inputType={'textField'}
               variant={'outlined'}
               label={"Город"}
               size="small"
               name={"city"}
               autoComplete='off'
               value={cityName}
               onChange={(e) => handleChangeInputs(e)}
            />
            <Button variant="contained" color="secondary" onClick={handleClick}>
               Поиск
            </Button>
         </div>
         <DayList/>
         <Snacks/>
      </div>
   )
}