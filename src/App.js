import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Dashboard from "./components/Dashboard";
import './App.css';
import axios from "./API/api";
import allAction from "./store/actions/Allactions";
import Allactions from "./store/actions/Allactions";

function App() {
   const dispatch = useDispatch();
   const data = useSelector(state => state.reducerWeather);

   React.useEffect(() => {
      const coors = new Promise((resolve, reject) => {
         if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
               resolve(position.coords)
            }, function (err) {
               if (err.code === 1 || err.message === "User denied Geolocation")
                  reject();
            })
         }
      })
      coors.then((res) => {
         axios.get(`/data/2.5/forecast?q=${data.cityName}&units=metric&lang=ru&appid=34a6e040345b5f6a4eead966b144aee7`)
            .then((res) => {
               dispatch(allAction.FetchActon.setData(res.data));
            })
            .catch((err) => {
               dispatch(Allactions.FetchActon.setError(true))
            })
      })
      coors.catch((err) => {
         axios.get(`/data/2.5/forecast?q=${data.cityName}&units=metric&lang=ru&appid=34a6e040345b5f6a4eead966b144aee7`)
            .then((res) => {
               dispatch(allAction.FetchActon.setData(res.data));
            })
            .catch((err) => {
               dispatch(Allactions.FetchActon.setError(true))
            })
      })
   }, [data.cityName])

   return (
      data.data.length !== 0 ?
         <div>
            <Dashboard/>
         </div>
         : ''
   );
}

export default App;
