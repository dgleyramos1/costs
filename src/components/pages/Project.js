import { v4 as uuidv4 } from 'uuid';

import { useParams } from 'react-router-dom';
import styles from './Project.module.css';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';


const Project = () => {

    const { id } = useParams();

    const [ project, setProject ] = useState([]);
    const [ services, setServices ] = useState([]);
    const [ showProjectForm, setShowProjectForm ] = useState(false);
    const [ showServiceForm, setShowServiceForm ] = useState(false);
    const [ message, setMessage ] = useState();
    const [ type, setType ] = useState();

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(resp => resp.json())
        .then(data => {
            setProject(data)
            setServices(data.services)
        })
        .catch(err => console.log(err));
        }, 300);
    }, [id]);

    const removeService = (id, cost) => {
        setMessage('')
        const serviceUpdated = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project;

        projectUpdated.services = serviceUpdated;
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
        .then(resp => resp.json())
        .then(data => {
            setProject(projectUpdated)
            setServices(serviceUpdated)
            setMessage('Servi??o removido com sucesso!')
            setType('success')
        })
        .catch(err => console.log(err))
    }

    const toggleProjectForm = () => {
        setShowProjectForm(!showProjectForm);
    }

    const toggleServiceForm = () => {
        setShowServiceForm(!showServiceForm);
    }

    const editPost = (project) => {
        setMessage('')
        // Budget validation
        if(project.budget < project.cost){
            //Message
            setMessage('O or??amento n??o pode ser menor que o custo do projeto!');
            setType('error');
            return false

        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then(data => {
            setProject(data)
            setShowProjectForm(false)
            //message
            setMessage('Projeto atualizado!');
            setType('success');
        })
        .catch(err => console.log(err))
    }

    const createService = (project) => {
        setMessage('');

        //Last service
        const lastService = project.services[project.services.length - 1];

        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost;

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //maximum value validation
        if(newCost > parseFloat(project.budget)){
            setMessage('Or??amento ultrapassado, verifique o valor do servi??o');
            setType('error');
            project.services.pop();
            return false;
        }

        //add service cost to project total cost
        project.cost = newCost;

        //update project
        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then(() => {
            setShowServiceForm(false)
        })
        .catch(err => console.log(err))

    }


    return (
        <>
            {project.name ?
            (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button onClick={toggleProjectForm} className={styles.btn}>
                                {!showProjectForm ? 'Editar projeto' : 'fechar'}
                            </button>
                            {
                                !showProjectForm ? 
                                (
                                    <div className={styles.project_info}>
                                        <p>
                                            <span>Categoria: </span> {project.category.name}
                                        </p>
                                        <p>
                                            <span>Total do Or??amento: </span> R${project.budget}
                                        </p>
                                        <p>
                                            <span>Total Utilizado: </span> R${project.cost}
                                        </p>
                                    </div>
                                ):(
                                    <div className={styles.project_info}>
                                        <ProjectForm
                                            handleSubmit={editPost}
                                            btnText="Concluir edi????o"
                                            projectData={project}
                                        />
                                    </div>
                                )
                            }
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicionar um servi??o</h2>
                            <button onClick={toggleServiceForm} className={styles.btn}>
                                {!showServiceForm ? 'Adicionar um servi??o' : 'fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm &&
                                    (
                                        <ServiceForm
                                            handleSubmit={createService}
                                            btnText="Adicionar servi??o"
                                            projectData={project}
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <h2>Servi??os</h2>
                        <Container customClass="start">
                            {
                                services.length > 0 && 
                                services.map((service) => (
                                    <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                ))
                            }
                            {
                                services.length === 0 && <p>N??o h?? servi??os cadastrados</p>
                            }
                        </Container>
                    </Container>
                </div>
            )
            :
            (
                <Loading />
            )
            }
        </>
    );
}

export default Project;
