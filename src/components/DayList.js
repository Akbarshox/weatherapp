import React, {useState} from 'react';
import {useSelector} from "react-redux";
import style from './dashboard.module.css';
import Collapse from '@material-ui/core/Collapse';
import {ExpandLessSharp} from "@material-ui/icons";
import {ExpandMoreSharp} from "@material-ui/icons";

export default function DayList() {
   const data = useSelector(state => state.reducerWeather.data);
   const [expanded, setExpanded] = useState(-1);

   const handleExpand = (i) => {
      setExpanded(expanded !== i ? i : -1);
   }

   const Days = React.useMemo(() => {
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
         {mainData.map((v, i) =>
            <div className={style.main}>
               <div className={style.container} onClick={() => handleExpand(i)}>
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
                  <div className={style.expanded}>
                     {expanded === i ? <ExpandLessSharp /> : <ExpandMoreSharp />}
                  </div>
               </div>
               {getInfo(v.dt_txt.substr(0, 10)).map((el, idx) =>
                  <Collapse in={i === expanded} timeout="auto" className={style.accordionDetails} unmountOnExit>
                     <div className={style.hourly}>
                        <img src={getImg(el.weather[0].icon)} alt=""/>
                        <h3>{Math.round(el.main.temp)}°C</h3>
                        <p>{el.dt_txt.substr(11, 5)}</p>
                     </div>
                  </Collapse>
               )}
            </div>
         )}
      </div>
   )
}