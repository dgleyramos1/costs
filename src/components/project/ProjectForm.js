import React from 'react';
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css'

const Projectform = ({ btnText }) => {
    return (
        <form className={styles.form}>
            <Input
                type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome para o projeto"
            />
            <Input
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento total"
            />
            <Select
                name="category_id"
                text="Selecione uma categoria"
            />
            <SubmitButton text={btnText} />
        </form>
    );
}

export default Projectform;
