import React from 'react'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../../redux/actions";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const [countryState, setCountryState] = useState('')
  const dispatch = useDispatch()

  function handleClick(e) {
    e.preventDefault()
    if(countryState.length === 0) {
      return alert ('Please input a name')
    }else{
      dispatch(getCountryByName(countryState))
      setCountryState('')
    }
  }

  return (
    <div className={styles.buscar}>
      <input
        type= 'text'
        placeholder= 'Busca un país...'
        value= {countryState}
        onChange= {(e) => setCountryState (e.target.value)}
      />
      <div type='btn' className={styles.btn}  onClick={handleClick}>
        <i className="fas fa-search icon"></i>
      </div> 
    </div>
  )
}