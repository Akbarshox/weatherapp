import React from 'react';
import './App.css';
import Dashboard from "./components/Dashboard";
import './App.css';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import allAction from "./store/actions/Allactions";

function App() {
   const dispatch = useDispatch();
   const data = useSelector(state => state.reducerWeather.data)
   React.useEffect(() => {
      // navigator.geolocation ?
      //    navigator.geolocation.getCurrentPosition(function (position) {
      //       coorsRef.current = {lat: position.coords.latitude, long: position.coords.latitude}
      //    }) : coorsRef.current = {err: 'error fetching location'}

      axios.get('https://api.openweathermap.org/data/2.5/forecast?q=Toshkent&units=metric&lang=ru&appid=34a6e040345b5f6a4eead966b144aee7')
         .then((res) => {
            dispatch(allAction.FetchActon.setData(res.data));
         })
         .catch((err) => {
            console.log(err)
         })
   }, [])

   return (
      data.length !== 0 ?
         <div>
            <Dashboard/>
         </div>
         : ''
   );
}

export default App;
