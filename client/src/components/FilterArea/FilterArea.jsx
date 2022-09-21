import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  getActivity,
  filterByActivity,
  orderName,
  orderPopulation,
  filterByContinent,
} from "../../redux/actions";
import styles from "./FilterArea.module.css"


export default function FilterArea() {
  const dispatch = useDispatch()
  const activities = useSelector((state) => state.activities)

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivity());
  }, [dispatch]);  

  function handleClickOrder(e) {
    e.preventDefault();
    dispatch(orderName(e.target.value));
  }
  function handleClickOrderPop(e) {
    e.preventDefault();
    dispatch(orderPopulation(e.target.value));
  }
  function handleFilterContinent(e) {
    dispatch(filterByContinent(e.target.value));
  }
  function handleFilterByAct(e) {
    e.preventDefault();
    dispatch(filterByActivity(e.target.value));
  }

  return (
  <div className={styles.filterArea}>
    <div className={styles.filter}>
      <h5 className={styles.label}>Orden alfabetico: </h5>
      <div className={styles.contentSelect}> 
        <select
          onChange={(e) => {
            handleClickOrder(e);
          }}>
          <option defaultValue value="asc" hidden>
            Orden
          </option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>
        <i></i>
      </div> 
    </div>
    <div className={styles.filter}>
      <h5 className={styles.label}>Orden por Población: </h5>
      <div className={styles.contentSelect}>
        <select
          onChange={(e) => {
            handleClickOrderPop(e);
          }}>
          <option defaultValue value="all" hidden>
            Orden
          </option>
          <option value="asc">Menor primero</option>
          <option value="desc">Mayor primero</option>
        </select>
        <i></i>
      </div>  
    </div>
    <div className={styles.filter}>
      <h5 className={styles.label}>Filtrar por Continente: </h5>
      <div className={styles.contentSelect}>
        <select
          onChange={(e) => {
            handleFilterContinent(e);
          }}>
          <option value= "all">Todos</option>
          <option value= "America">América</option>
          <option value= "North America">América del Norte</option>
          <option value= "South America">América del Sur</option>
          <option value= "Europe">Europa</option>
          <option value= "Asia">Asia</option>
          <option value= "Africa">África</option>
          <option value= "Oceania">Oceanía</option>
          <option value= "Antarctica">Antártida</option>
        </select>
        <i></i>
      </div>  
    </div>
    <div className={styles.lastFilter}>
      <h5 className={styles.label}>Filtrar por Actividad: </h5>
      <div className={styles.contentSelect}>
        <select id='selectAct' onChange={(e) => handleFilterByAct(e)}>
          <option value="all">Todas</option>
          {activities.map((act) => {
            return (
              <option value={act} key={act}>
                {act[0].toUpperCase() + act.substring(1).toLowerCase()}
              </option>
            );
          })}
        </select>
        <i></i>
      </div>  
    </div>
  </div>
);  
}