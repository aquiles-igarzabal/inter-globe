import React from "react";
import {getCountryDetail } from "../../redux/actions";
import { useDispatch } from "react-redux";
import styles from "./CountryCard.module.css";

export default function CountryCard ( {id, name, image, continent, stateModal,setStateModal}) {
  const dispatch = useDispatch()

  return (
    <div 
    className={styles.container}
    onClick = {() => {
      setStateModal(!stateModal)
      dispatch(getCountryDetail(id))
    }}
    >
      <div className={styles.imgContainer}>
        <img              
          src={image}
          alt={`${name} flag`}
        />
      </div>
      <div>
        <h4 className={styles.nameCountry}>{name}</h4>
        <div className={styles.continent}>  
          <h4>Continente: </h4>
          <p className={styles.continentName}>{continent}</p>
        </div>
      </div>
    </div>
  );
}
