const initialState = {
   data: [],
   cityName: "Toshkent",
   error: ""
}

export default (state = initialState, action) => {
   switch (action.type) {
      case 'FETCH_DATA':
         return {
            ...state, data: action.payload
         }
      case 'SEARCH':
         return {
            ...state, cityName: action.payload
         }
      case 'ERROR':
         return {
            ...state, error: action.payload
         }
   }
   return state;
}