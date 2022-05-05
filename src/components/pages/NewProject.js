import React from 'react';
import Projectform from '../project/ProjectForm';
import styles from './NewProject.module.css';

const Newproject = () => {
    return (
        <div className={styles.newproject_container}>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <Projectform/>
        </div>
    );
}

export default Newproject;
