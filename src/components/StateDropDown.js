import React from 'react'
import styles from './css module/StateDropDown.module.scss'

export default function StateDropDown({stateData, selected, selectedState}) {
  return (
    <div className={styles.StateDropDown}>
        <p align="center">Optional</p>
        <select name="stateDropDown" id="stateDropDown" value={selected} onChange={(e)=>{selectedState(e.target.value)}}>
          <option value="nothing">Choose State</option>
          {stateData.map((v)=>{
            return <option value={v}>{v}</option>
          })}
        </select>
    </div>

  )
}
