import React, { useState, useEffect } from 'react';
import TareaForm from './TareaForm';
import Tarea from './Tarea';
import '../../styles/index.css';

function Home() {

  const [listaTareas, setListaTareas] = useState([]);
  const [act, setAct] = useState(false);
  const [userActivo, setUserActivo] = useState(true);
  const [iniTarea, setIniTarea] = useState(false);

  useEffect(() => {
    console.log('useEffect');
    consultaUser();
  }, []);

  useEffect(() => {
    if (act === true) {
      console.log('useEffect - ACTUALIZAR: ', act);
      console.log('useEffect - ACTUALIZAR ==> Total Lista', listaTareas.length);
      actualizarLista();
      setAct(false);
    }
  }, [act]);

  useEffect(()=>{
    if (!userActivo) {
      console.log('useEffect[userActivo] - crearUser');
      crearUser();
    }
      console.log('useEffect[userActivo] ', userActivo);
      setUserActivo(true);
  }, [userActivo]);

  useEffect(()=>{
    if(iniTarea){
      setListaTareas([]);
      console.log('useEffect[iniTarea] - consultaTareas');
      consultaTareas();
    }
    setIniTarea(false);
  }, [iniTarea]);

  const nuevaTarea = (tarea) => {
    // actualizarLista(tarea);
    setListaTareas([tarea, ...listaTareas]);
    setAct(true);
  }

  const borrar = (id) => {
    const listaFiltrada = listaTareas.filter((e, index) => index !== id);
    setListaTareas(listaFiltrada);
    setAct(true);
  }

  const consultaTareas = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch('https://assets.breatheco.de/apis/fake/todos/user/guillermo', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('consultaTareas - result', result)
        result.map((item) => {
          console.log('consultaTareas - Tarea1=> ', item.label);
          console.log('consultaTareas - listaTareas1 => ', listaTareas);
          setListaTareas((e) => [...e, item.label]);
          console.log('consultaTareas - listaTareas2 => ', listaTareas);
        })
        console.log('consultaTareas - cantidad:', result.length);
        console.log('consultaTareas - listaTareas 3 => ', listaTareas);

      })
      .catch(error => console.log('error', error))
  }

  const actualizarLista = () => {
    var listaFinal = [];
    console.log('actualizarLista - Total ListaTareas => ', listaTareas.length);
    for (let index = 0; index < listaTareas.length; index++) {
      let item = {};
      item['label'] = listaTareas[index];
      item['done'] = false;
      listaFinal.push(item);
    }

    console.log('listaFinal => ', listaFinal);

    fetch('https://assets.breatheco.de/apis/fake/todos/user/guillermo', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listaFinal),
    })
      .then(response => console.log('actualizarLista - response PUT', response))
      .catch(error => console.log('actualizarLista - error', error))

  }

  const consultaUser = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch('https://assets.breatheco.de/apis/fake/todos/user', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('consultaUser - result', result)
        console.log('consultaUser - cantidad:', result.length);
        console.log('consultaUser - Esta usuario guillermo: ', result.includes('guillermo'));
        setUserActivo(result.includes('guillermo'));
        setIniTarea(result.includes('guillermo'));
      })
      .catch(error => console.log('consultaUser - error', error))
  }

  const crearUser = () => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/guillermo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([]),
    })
      .then(response => {
        console.log('crearUser - response POST', response)
        setIniTarea(true);
      })
      .catch(error => console.log('crearUser - error', error))
  }

  const deleteUser = () => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/guillermo', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([listaTareas]),
    })
      .then(response => {
        console.log('deleteUser - response DELETE', response)
        if (response.ok === true) {
          console.log('deleteUser - cambio de UserActivo', userActivo)
          setUserActivo(true);
          console.log('deleteUser - cambio de UserActivo', userActivo)
          setUserActivo(false);
        }
      })
      .catch(error => console.log('deleteUser - error', error))
  }


  return (
    <div>
      <p className="titulo" >todos</p>
      <div className="marco">
        <TareaForm
          nuevaTarea={nuevaTarea}
        />

        <div>
          {
            listaTareas.map((e, index) => <Tarea
              tarea={e}
              borrar={borrar}
              id={index}
              key={index}
            />
            )
          }
        </div>
        {
          listaTareas.length > 0 ?
            <div className="total">{listaTareas.length} item left</div>
            : <div className="total">No hay tareas, añadir tareas</div>
        }
        <div className='botones'>
          <button className={`button btn-start `} onClick={() => deleteUser()}>Borrar Lista ToDo</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
