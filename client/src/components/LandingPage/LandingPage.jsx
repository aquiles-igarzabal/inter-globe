import React from 'react'
import {Link} from 'react-router-dom'
import styles from '../LandingPage/LandingPage.module.css'
import brillo from '../../media/brillo.png'

export default function LandingPage(){
  return (
    <div className={styles.landing}>
      <div className={styles.titleBox}>
        <h1 className={styles.title}>Inter Globe</h1>
      </div>
      <div className={styles.world}>
        <img  className={styles.img} src= {brillo} alt= ''></img>
      </div>    
      <Link to= '/home'>
        <button className={styles.button}>Inicio</button>
      </Link>
    </div>
  )
}