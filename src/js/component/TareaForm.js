import React, {useState} from 'react';

const TareaForm = (props) =>{
    const [inputText, setInputText] = useState('');

    const manejarFormulario = (event) =>{
        setInputText(event.target.value);
    }

    const submit = (event) =>{
        event.preventDefault();
        if(inputText.trim() !== ''){
            props.nuevaTarea(inputText);
            setInputText('');
        }
    }

    return(
        <div>
            <form className='form' onSubmit={submit}>
                <input value={inputText} onChange={manejarFormulario} />
            </form>
        </div>
    );
}

export default TareaForm;