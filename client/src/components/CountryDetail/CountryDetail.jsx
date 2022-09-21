import React from "react";
import { useSelector } from "react-redux";
import styles from "./CountryDetail.module.css";
import {getCountryDetail } from "../../redux/actions";
import { useDispatch } from "react-redux";

export default function CountryDetail () {

  const allCountries = useSelector((state) => state.allCountries)
  const aCountry = useSelector((state) => state.countryDetail)
  const dispatch = useDispatch()

  function handleLink(coun) {
    dispatch(getCountryDetail(coun))
  }

  return(
  <div className={styles.allCont}>
      {aCountry ? (
        <div key={aCountry.id} className={styles.allCont}>
          <h2>{aCountry.name} ({aCountry.id})</h2>
          <div className={styles.all}>
            <div className={styles.imgCont}>
              <img src={aCountry.image}  className={styles.img} alt={aCountry.name}/>
            </div>
              <div className={styles.allInfo}> 
                <div className={styles.data}>
                  <div className={styles.section}>
                    <h3>Continente: </h3>
                    <p className={styles.datito}>{aCountry.continents}</p>  
                  </div>
                  <div className={styles.section}>
                    <h3>Capital: </h3>
                      <p className={styles.datito}>{aCountry.capital}</p>
                  </div>
                  <div className={styles.section}>
                    <h3>Subregión: </h3>
                      <p className={styles.datito}>{aCountry.subregion}</p>
                  </div>   
                  <div className={styles.section}>
                    <h3>Area: </h3>
                      <p className={styles.datito}>{aCountry.area} km²</p>
                  </div>
                  <div className={styles.section}>
                    <h3>Población : </h3>
                      <p className={styles.datito}>{aCountry.population} hab.</p>
                  </div > 
                  <div className={styles.sectionBorder}>
                    <h3>Limita con: </h3>
                    <div className={styles.borders}>
                    {aCountry.borders && aCountry.borders.length?
                    aCountry.borders.map(coun => 
                      <div onClick={() => handleLink(coun)} className={styles.border}>
                      <p>{coun}</p>
                      <img  className={styles.miniImg} alt= {coun} src={allCountries.filter(pais => pais.id === coun)[0].image}></img>
                      </div>):
                    <p className={styles.noLimit}>No tiene limítrofes</p>}
                    </div>
                  </div > 
                </div>  
                {aCountry.activities && aCountry.activities.length?
                (
                <div className={styles.actSection}>
                <h3>Actividades: </h3>
                <div className={styles.activities}> 
                  {aCountry.activities.map (el =>
                    (
                    <div key= {el.name} className={styles.activity}>
                    <h4 className={styles.actName}>{el.name}</h4>
                    <div className={styles.dato}> 
                      <h5>Dificultad: </h5>
                      <p className={styles.datitoA}>{el.difficulty}</p>
                    </div> 
                    <div className={styles.dato}>
                      <h5>Duración: </h5>
                      <p className={styles.datitoA}>{el.duration} horas</p>
                    </div>
                    <div className={styles.datoTemp}>
                      <h5>Temporada/s: </h5>
                      <ul className={styles.temps}>
                      {el.season.map(season => <li className={styles.tem} key={season}>{season}</li>)}
                      </ul>
                    </div>
                    </div>
                    )
                  )}
                </div> 
                </div>
                )  
                : (<br></br>)}
                
              </div>
          </div> 
        </div>
      ) : (
        <h2>Not Found</h2>
      )}
    </div>    
  )
}