import React from "react"
import CountryArea from "../CountryArea/CountryArea"
import NavBar from "../NavBar/NavBar"
import FilterArea from "../FilterArea/FilterArea"
import styles from '../Home/Home.module.css'



export default function Home({state1,state2,setState1,setState2}) {
  return (
    <div className={styles.home}>
      <NavBar 
      stateModal = {state2}
      setStateModal = {setState2}
      /> 
      <FilterArea/>
      <CountryArea 
      stateModal = {state1}
      setStateModal = {setState1}
      />

    </div>
  );
}