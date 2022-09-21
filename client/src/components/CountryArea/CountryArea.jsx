import React from "react";
import CountryCard from "../CountryCard/CountryCard";
import Pagination from "../Pagination/Pagination";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCountries} from "../../redux/actions";
import styles from "./CountryArea.module.css";

export default function CountryArea({stateModal, setStateModal}) {
  
  const dispatch = useDispatch()
  const allCountries = useSelector((state) => state.countries)
  const [currentPage, setCurrentPage] = useState(1)
  const [countriesPerPage] = useState(10)
  const indexOfLastCountry = currentPage * countriesPerPage
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
  const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [allCountries]);

  return (
    <div className={styles.countryArea}>
      <div className={styles.pagination}>
        <Pagination
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          pagination={pagination}
          currentPage={currentPage}
        />
      </div>
      <div className={styles.countries}>
        { 
          currentCountries.map((el) => { 
            return  (
          <CountryCard
            key={el.id}
            id={el.id}
            name={el.name}
            image={el.image}
            continent= {el.continents}
            stateModal = {stateModal}
            setStateModal = {setStateModal}
          />
        )})}
      </div>
    </div>
  );
}