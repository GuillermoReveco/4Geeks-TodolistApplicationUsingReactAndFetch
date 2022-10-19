import React from 'react';
import '../../styles/index.css';

const Tarea = (props) =>{

    const borrarTarea = () => {
        props.borrar(props.id);
    }

    return(
        <div>
            {
                <div className='tarea' key={props.id}>
                    <span className='izquierda'>{props.tarea}</span><span className='derecha' onClick={borrarTarea} >X</span>
                </div>
            }
        </div>
    );
}

export default Tarea;