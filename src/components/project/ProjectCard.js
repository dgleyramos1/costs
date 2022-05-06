import React from 'react';
import styles from './ProjectCard.module.css';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'
import { NavLink } from 'react-router-dom';


const Projectcard = ({
    id,
    name,
    budget,
    category,
    handleRemove
}) => {

    const remove = (e) =>{
        e.preventDefault()
        handleRemove(id)
    }
    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span> R${budget}
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[category.toLowerCase()]}`}></span> {category}
            </p>
            <div className={styles.project_card_actions}>
                <NavLink to={`/project/${id}`}>
                    <BsPencil /> Editar
                </NavLink>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
    )
}

export default Projectcard;
