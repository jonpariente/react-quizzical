import React from "react";
import { decode } from 'html-entities';

const Chip = (props) => {
    let className = "chip";
    
    if (props.isChecked) {
        className = `${className} is-checked`;
    }
    
    if (props.isGameOver) {
        className = `${className} is-disabled`
        
        if (props.isChecked && props.isCorrect) {
            className = `${className} is-correct`;
        } else if (props.isChecked) {
            className = `${className} is-incorrect`;
        } else if (props.isCorrect) {
            className = `${className} is-correct`;
        }
    }
    
    return (
        <div className={className} key={props.id} onClick={() => props.handleSelectAnswer(props.name, props.id)}>
            <input className="chip-input" id={props.id} type="radio" name={props.name} value={decode(props.value)} disabled={props.isDisabled} />
            <label className="chip-label" htmlFor={props.id}>{decode(props.value)}</label>
        </div>
    )
}

export default Chip;