import React from "react";
import { useDispatch} from "react-redux";
import SearchBar from '../SearchBar/SearchBar'
import styles from '../NavBar/NavBar.module.css'
import logo from '../../media/logo.png'
import {getCountries} from "../../redux/actions";

export default function NavBar({stateModal,setStateModal}) {
  const dispatch = useDispatch()

  function handleHome(e) {
    e.preventDefault();
    dispatch(getCountries(e.target.value));
  }
  return (
      <header className={styles.allNav}> 
          <div className={styles.titleAndImage}>
            <div className={styles.titleCont}>
              <h1 className={styles.title}>Inter Globe</h1>
            </div>
            <div onClick={(e) => handleHome(e)}>
            <img className={styles.logo} src={logo} alt='home'></img>
            </div>
          </div>
          <div className={styles.searchBarCont}>
            <SearchBar/>
          </div>
        <div className={styles.creaAct}>
          <h4 className={styles.labelAct}>Crea una Actividad</h4>
            <button className={styles.btnAct} onClick= {() => setStateModal(!stateModal)}>Añadir</button>
        </div>
      </header>  
  )
}
