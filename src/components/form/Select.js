import React from 'react';
import styles from './Select.module.css'
import isEmpty from 'lodash/isEmpty';

const Select = ({
    text,
    name,
    options,
    handleOnChange,
    value
}) => {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
                <option>Selecione uma opção</option>
                {!isEmpty(options) &&
                    options.map((option)=> (
                        <option value={option.id} key={option.id}>{option.name}</option>
                    ))
                }
            </select>
        </div>
    );
}

export default Select;
