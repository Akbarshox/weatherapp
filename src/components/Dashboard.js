import React from 'react';
import style from './dashboard.module.css';
import DayList from "./DayList";

export default function Dashboard() {
   return (
      <div>
         <p className={style.header}>ПРОГНОЗ ПОГОДЫ НА 5 ДНЕЙ</p>
         <DayList/>
      </div>
   )
}