import React from 'react';
import {useSelector} from "react-redux";
import style from './dashboard.module.css';

export default function DayList() {
   const data = useSelector(state => state.reducerWeather.data)

   const Days = React.useMemo(() => {
      // const grouped = [...new Set(data.list.map(v => v.dt_txt.substr(0, 10)))].slice(0, 5);
      const grouped = data.list.filter((v, i, a) => a.findIndex(t => (t.dt_txt.substr(0, 10) === v.dt_txt.substr(0, 10))) === i).slice(0, 5);
      return grouped
   }, [])

   const getInfo = (el) => {
      let a = [];
      data.list.map(v => {
         switch (true) {
            case v.dt_txt.substr(0, 10) === el:
               return a.push(v);
         }
      })
      return a
   }

   const MaxMin = (v, i) => Math.round(getInfo(v).reduce((curr, next) => curr + next.main[i], 0) / getInfo(v).length);

   const getImg = data => `https://openweathermap.org/img/w/${data}.png`;

   const WeekDays = (data) => {
      let num = new Date(data).getDay();
      const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
      return days[num];
   }
   const mainData = Days;

   return (
      <div>
         {mainData.map(v =>
            <div className={style.container}>
               <div className={style.weekName}>
                  <img src={getImg(v.weather[0].icon)} alt=""/>
                  <p>{WeekDays(v.dt_txt.substr(0, 10))}</p>
               </div>
               <div className={style.degree}>
                  {MaxMin(v.dt_txt.substr(0, 10), "temp_max")}°C/<span
                  className={style.minTemp}>{MaxMin(v.dt_txt.substr(0, 10), "temp_min")}°C</span>
               </div>
               <div className={style.humid}>
                  Влажность: {MaxMin(v.dt_txt.substr(0, 10), "humidity")}%
               </div>
            </div>
         )}
      </div>
   )
}