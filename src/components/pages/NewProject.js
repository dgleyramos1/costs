import React from 'react';
import { useNavigate } from 'react-router-dom';
import Projectform from '../project/ProjectForm';
import styles from './NewProject.module.css';

const Newproject = () => {

    const navigate = useNavigate();

    const createPost = (project) => {

        //initialize cost and services
        project.cost = 0;
        project.services = [];

        fetch('https://my-json-server.typicode.com/dgleyramos1/costs/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)

        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            //redirect
            navigate('/projects', {
                message: "Projeto criado com sucesso!"
            })
        })
        .catch(err => console.log(err))
    }
    return (
        <div className={styles.newproject_container}>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <Projectform
            handleSubmit={createPost}
            btnText="Criar projeto"/>
        </div>
    );
}

export default Newproject;
