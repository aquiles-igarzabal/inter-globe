import {
GET_COUNTRIES,
GET_COUNTRY_BY_NAME,
GET_ACTIVITY,
GET_COUNTRY_DETAIL,
DELETE_COUNTRY_DETAIL,
ORDER_NAME,
ORDER_POPULATION,
FILTER_BY_ACTIVITY,
FILTER_BY_CONTINENT,
POST_ACTIVITY,
REMOVE_FULLACT_COUNTRIES
} from './actions'

const initialState = {
  allCountries: [],
  countries: [],
  countriesAct: [],
  activities: [],
  countryDetail: []
}

function rootReducer(state= initialState, action){
  switch(action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
        countries: action.payload
      }
    case GET_COUNTRY_BY_NAME:
      return {
        ...state,
        countries: action.payload
      }
    case GET_ACTIVITY:
      return {
        ...state,
        activities: action.payload
      } 
    case GET_COUNTRY_DETAIL:
      return {
        ...state,
        countryDetail: action.payload
      }
    case DELETE_COUNTRY_DETAIL:
      return {
        ...state,
        countryDetail: []
      }
    case ORDER_POPULATION:
      const sortedPop = action.payload === 'asc' ? 
        [...state.countries].sort ((a,b) => a.population - b.population)
        :
        [...state.countries].sort ((a,b) => b.population - a.population)
      return {
        ...state,
        countries: sortedPop
      }
    case ORDER_NAME:
      const sortedNames = action.payload === 'asc' ? 
        [...state.countries].sort(function (a, b) {
          if (a.name > b.name) {return 1} 
          if (b.name > a.name) {return -1}
          return 0  
        }) : 
        [...state.countries].sort(function (a, b) {
          if (a.name > b.name) {return -1} 
          if (b.name > a.name) {return 1}
          return 0
        })
      return {
      ...state,
      countries: sortedNames
      }
    case FILTER_BY_ACTIVITY:
      return {
        ...state,
        countries: action.payload
      }    
    case FILTER_BY_CONTINENT:
      return {
        ...state,
        countries: action.payload
      }
    case POST_ACTIVITY:
      return {
        ...state,
        activities: [...state.activities, action.payload.name]
      }
    case REMOVE_FULLACT_COUNTRIES:
      return {
        ...state,
        countriesAct: action.payload
      }          
    default:
      return state       
  } 
}          
export default rootReducer