import axios from 'axios'

export const GET_COUNTRIES  = 'GET_COUNTRIES'
export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL'
export const DELETE_COUNTRY_DETAIL = 'DELETE_COUNTRY_DETAIL'
export const GET_COUNTRY_BY_NAME = 'GET_COUNTRY_BY_NAME'
export const GET_ACTIVITY = 'GET_ACTIVITY'
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT'
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY'
export const ORDER_NAME = 'ORDER_NAME'
export const ORDER_POPULATION = 'ORDER_POPULATION'
export const POST_ACTIVITY = 'POST_ACTIVITY'
export const REMOVE_FULLACT_COUNTRIES = 'REMOVE_FULLACT_COUNTRIES'

export function getCountries() {
  return async function (dispatch) {
    try {
      let {data} = await axios.get('/countries')
      return dispatch ({
        type: GET_COUNTRIES,
        payload: data
      })
    } catch (error) {
      console.log(error)
    } 
  }
}

export function getCountryDetail(id) {
  return async function (dispatch) {
  try {
      let {data} = await axios.get(`/countries/${id}`)
      return dispatch ({
        type: GET_COUNTRY_DETAIL,
        payload: data
      })
    } catch (error) {
      console.log(error)
    } 
  }
}

export function getCountryByName(name) {
  return async function (dispatch) {
    try {
      let {data} = await axios.get(`/countries?name=${name}`)
      return dispatch ({
        type: GET_COUNTRY_BY_NAME,
        payload: data
      })
    } catch (error) {
      console.log(error)
      alert(`Could not find country "${name}"`)
    } 
  }
}

export function getActivity() {
  return async function (dispatch) {
    try{
      let {data} = await axios.get('/activity');
      let namesOfActivity = data.map(el => el.name)
      return dispatch({
          type: GET_ACTIVITY,
          payload: namesOfActivity
      });
    }catch(error) {
      console.log(error)
    }  
  }
}

export function postActivity (payload) {
  return async function (dispatch) {
    await axios.post('/activity',payload)
    return dispatch({
      type: POST_ACTIVITY,
      payload: payload
    })
  }
} 

export function orderName (payload) {
  return {
    type: ORDER_NAME,
    payload
  }
}

export function orderPopulation(payload) {
    return {
        type: ORDER_POPULATION,
        payload
    }
}

export function filterByContinent(payload) {
  return async function (dispatch) {
    try {
      let {data} = payload === 'all'? await axios.get(`/countries`) 
      :await axios.get(`/country?continent=${payload}`);
      return dispatch({
        type: FILTER_BY_CONTINENT,
        payload: data
      })
    } catch (error) {
        console.log(error)
    }
  }
}

export function filterByActivity(payload) {
  return async function (dispatch) {
    try {
      let {data} = await axios.get(`/activity`)
      let allCountries = await axios.get(`/countries`)
      let allActivities =  [...new Set(data.flat())]
      let activity = allActivities.filter (a => a.name === payload)
      let finalInfo = 
      payload === 'all'? allCountries.filter(coun => coun.activities.length > 0):
      allCountries.data.filter(coun => activity[0].includedCountries.includes(coun.id))
      return dispatch({
        type: FILTER_BY_ACTIVITY,
        payload: finalInfo
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function deleteCountryDetail() {
  return async function (dispatch){
    return dispatch({
      type: DELETE_COUNTRY_DETAIL
    })
  }
} 

export function removeFullActCountries() {
  return async function (dispatch) {
    try {
      let allCountries = await axios.get(`/countries`)
      let info = allCountries.data.filter(coun => coun.activities.length <= 2)
      return dispatch({
        type: REMOVE_FULLACT_COUNTRIES,
        payload: info
      })
    } catch (error) {
      console.log(error)
    }
  }
}