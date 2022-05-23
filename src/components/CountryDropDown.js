import React from 'react'
import styles from './css module/CountryDD.module.scss'

export default function CountryDropDown({countryData, selected, selectedCountry}) {
  return (
      
    <div className={styles.CountryDropDown}>
        <p align="center">Select Country</p>
        <select name="CountryDropDown" id="CountryDropDown" value={selected} onChange={(e)=>{selectedCountry(e.target.value)}}>
          <option value="Worldwide">Worldwide</option>
          {countryData.map((v,k)=>{
            return <option key={k} value={v}>{v}</option>
          })}
        </select>
    </div>
  )
}
