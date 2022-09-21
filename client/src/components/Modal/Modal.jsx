import React from "react";
import styles from '../Modal/Modal.module.css'
import { useDispatch } from "react-redux";
import { deleteCountryDetail} from "../../redux/actions";

export default function Modal({children, state, setState,title,showHeader}) {
  const dispatch = useDispatch()
  
  function handleClose() {
    setState(false)
    dispatch(deleteCountryDetail())
  }

  return (
    <>
      {state &&
        <div className={styles.overlay}>
          <div className={styles.back} onClick= {() =>handleClose()}></div>
          <div className={styles.contenedorModal}>
            {showHeader &&
            <div className={styles.encabezadoModal}>
              <h4>{title}</h4>
            </div>
            }
            <button className={styles.botonCerrar} onClick= {() =>handleClose()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0
                1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
            {children}
          </div>
        </div>
      }
    </>
  )
}