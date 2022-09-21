import React, { useState, useMemo, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postActivity, removeFullActCountries} from "../../redux/actions";
import styles from "./ActivityForm.module.css";



function validateForm(input,activities) {
  const validateName = /^[a-zA-Z\s]+$/ ;
  let errors = {};

  
  if (!input.name.trim().length) {
    errors.name = "Es necesario escribir un nombre";  
  } else if (!validateName.test(input.name)){
    errors.name = "Los carácteres especiales no estan permitidos";
  } else if (activities && activities.includes(input.name.trim())){
    errors.name = "Ese nombre ya está en uso";  
  }else if(input.name.length >20) {
    errors.name = "El nombre es demasiado largo! Max 20 carácteres"
  }else {
    errors.name = ''
  }

  
  if (input.includedCountries.length >= 1) {
    errors.countries = ''
  }else {
    errors.countries = "Debes seleccionar uno o varios Paises";
  }  
  
  if (!input.duration.length) {
    errors.duration= "Debes insertar una duracion";  
  }else if (input.duration > 24) {
    errors.duration = "La duración no puede superar las 24hs"
  }else if (!(input.duration > 0)) {
    errors.duration = "La duración no puede ser nula ni negativa"    
  }else {
    errors.duration = ''
  }
  
  if (!input.season.length) {
    errors.season = "Debes seleccionar una o varias temporadas";
  }else {
    errors.season = ''
  }

  return errors;
}

export default function ActivityForm({state,setState}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const activities = useSelector((state) => state.activities)
  const allCountries = useSelector((state) => state.countriesAct)
  let countries = allCountries.sort(function (a, b) {
          if (a.name > b.name) {return 1} 
          if (b.name > a.name) {return -1}
          return 0  
        })
  const [errors, setErrors] = useState({});
  const seasons = ['Verano', 'Otoño', 'Invierno', 'Primavera']
  const [checkedState, setCheckedState] = useState(
    new Array(seasons.length).fill(false)
);

  const [input, setInput] = useState({
    name: "",
    difficulty:"2.5",
    duration: "",
    season: [],
    includedCountries: [],
  });

  useEffect(() => {
    dispatch(removeFullActCountries());
  }, [dispatch]);

  const disable = useMemo(() => {
    if(errors.name || errors.season || errors.duration || errors.countries) {
      return true;
    }
    return false;
  }, [errors])

  const disableSelect = useMemo(() => {
    if(input.includedCountries.length === 5) {
      return true;
    }
    return false;
  }, [input])

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateForm({
        ...input,
        [e.target.name]: e.target.value,
      },activities)
    );
  }

  function handleRange(e) {
    setInput({
      ...input,
      difficulty: e.target.value,
    });
    document.getElementById('spanNum').innerHTML = e.target.value
  }

  function handleSelect(e) {
    const select = document.getElementById('select');
    select.addEventListener('click', function() {
      select.remove(select.selectedIndex)
    });
    setInput({
      ...input,
      includedCountries: [...input.includedCountries, e.target.value],
    });
    setErrors(
      validateForm({
        ...input,
        includedCountries: e.target.value,
      })
    );
  }

  function handleDelete(e,el) {
    const select = document.getElementById('select');
    const option = document.createElement('option');
    const valor = countries.find(coun => coun.id === el)
    option.value = valor.id;
    option.text = valor.name;
    select.appendChild(option);
    
    setInput({
      ...input,
      includedCountries: input.includedCountries.filter((coun) => coun !== el),
    });
    setErrors(
      validateForm({
        ...input,
        includedCountries: input.includedCountries.filter((coun) => coun !== el),
      })
    )
  }

    function handleCheckBox(e,position) {
    const updatedCheckedState = checkedState.map((item, index) =>
    index === position ? !item : item
    );
    setCheckedState(updatedCheckedState)
    if (e.target.checked){
      setInput({
        ...input,
        season: [...input.season, e.target.value],
      });
      setErrors(
        validateForm({
          ...input,
          season: [...input.season, e.target.value],
        })
      ); 
    }else {
      setInput({
        ...input,
        season: input.season.filter(el => el !== e.target.value),
      });
      setErrors(
        validateForm({
          ...input,
          season: input.season.filter(el => el !== e.target.value),
        })
      ); 
    }     
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !errors.name &&
      !errors.duration &&
      !errors.season
    ) {
      alert("Tu actividad ha sido agregada con éxito!");
      dispatch(postActivity(input));
      setInput({
      name: "",
      difficulty:"",
      duration: "",
      season: [],
      includedCountries: [],
      });
    } else {
      return alert('Debes completar todos los campos');
    }
    history.push("/home");
    setState(!state)
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.allForm} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.contentForm}> 
          <div className={styles.section}>
            <label className={styles.label}>Nombre: </label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
              className={styles.inputText}
              autoComplete= 'off'
              required
            />
            <div className={styles.error}>
              <p >{errors.name}</p>
            </div>
          </div>
          <div className={styles.section}>
            <label className={styles.label}>Dificultad: </label>
            <input
              type="range"
              value={input.difficulty}
              name="difficulty"
              min= "0"
              max= "5"
              step="0.1"
              onChange={(e) => handleRange(e)}
              className={styles.inputRange}
              required
            />
            <span id="spanNum" className={styles.spanRange}>2.5</span>
          </div>
          <div className={styles.section}>
            <label className={styles.label}>Duración (en horas): </label>
            <input
              type="number"
              value={input.duration}
              name="duration"
              onChange={(e) => handleChange(e)}
              className={styles.inputNumber}
              required
            />
            <span> hs</span>
            <div className={styles.error}>
                <p>{errors.duration}</p>
            </div> 
          </div> 
          <div className={styles.section}>
            <div>  
              <label className={styles.label}>Países: </label>
            </div>  
            <select 
            multiple 
            disabled = {disableSelect}
            id = 'select' 
            onChange={(e) => handleSelect(e)}
            className={styles.select}
            >
              {countries.map((coun) => {
                return (
                  <option 
                  key={coun.name} 
                  name={coun.name} 
                  value={coun.id}
                  className={styles.optionSelect}
                  >
                    {coun.name}
                  </option>
                );
              })}
            </select>
            {input.includedCountries.length? (  
              <div className={styles.countriesContainer}>
                <div className={styles.labelCoun}>
                  <h4>Has seleccionado estos países: </h4>
                </div>
                <div className={styles.countries}>
                  {input.includedCountries.map((el) => (
                    <div key={el} className={styles.country}>
                      <div className={styles.countryName}>
                        <p>{(countries.find(coun => coun.id === el)).name}</p>
                      </div>
                      <img 
                      src= {(countries.find(coun => coun.id === el)).image} 
                      height= "50px" 
                      alt={el}
                      className={styles.countryImg} /> 
                      <div>
                        <button className={styles.countryBtn} onClick={(e) => handleDelete(e,el)}>✖</button>
                      </div>
                    </div>
                  ))}
                </div>  
              </div>
            ) : (<br></br>)
            }
            <div className={styles.error}>
              <p>{errors.countries}</p>
            </div> 
          </div>
          <div className={styles.section}>
              <div className={styles.label}>
              <label>Temporadas: </label> 
              </div>
                <div className={styles.checkBoxes}>
                  {seasons.map((season,index) => {
                    return (
                    <div key={season}>
                      <input 
                      type="checkbox" 
                      id= {`season-checkbox-${index}`}
                      name="season" 
                      value={season}
                      checked={checkedState[index]} 
                      className={styles.checkBox}
                      onChange={(e) => handleCheckBox(e,index)} 
                      />
                      <span>{season}</span>
                    </div>);
                  })}
                </div>  
            <div className={styles.error}>
                <p>{errors.season}</p>
            </div>
          </div>
          <div className={styles.btnContainer}>
            <button  type="submit" disabled={disable} className={styles.btnSubmit}>
              Crear Actividad
            </button>
          </div>
        </div>   
      </form>
    </div>                                                                                                                                                                                                                                                                                                                          
  );
}    