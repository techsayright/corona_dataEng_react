import React from 'react'
import styles from './css module/DropDown.module.scss'

export const DropDown = (props) => {

    return (
        <div className={styles.DropDown}>
            <select name="DropDown" id="DropDown" value={props.selected} onChange={(e)=>{props.selectedVal(e.target.value)}}>
                <option value="VBar">Vertical Bar</option>
                <option value="Pie">Pie</option>
                <option value="Line">Line</option>
            </select>
        </div>
    )
}
