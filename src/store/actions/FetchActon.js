const setData = data => ({
   type: 'FETCH_DATA',
   payload: data
})

const setCityName = cityName => ({
   type: 'SEARCH',
   payload: cityName
})

const setError = error => ({
   type: 'ERROR',
   payload: error
})

export default {
   setData,
   setCityName,
   setError
}