import React, { useState } from 'react'
import FormError from './FormError';
import { connect } from 'react-redux';
import { addTask } from '../actions/tasks';

const AgregarTask = ({ addTask }) => {
    const [task, setTask] = useState({
        nombre: '',
        descripcion: ''
    });
    const [validacionTaskNombre, setValidacionTaskNombre] = useState("");
    const [validacionTaskDescripcion, setValidacionTaskDescripcion] = useState("");

    const onChange = e => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        setValidacionTaskNombre("");
        setValidacionTaskDescripcion("");

        const nombreLength = task.nombre.trim().length;
        const descripcionLength = task.descripcion.trim().length;
        if (nombreLength === 0 || descripcionLength === 0) {
            if (nombreLength === 0) {
                setValidacionTaskNombre("is-invalid");
            }
            if (descripcionLength === 0) {
                setValidacionTaskDescripcion("is-invalid");
            }
            return;
        }

        addTask(task);

        setTask({
            nombre: '',
            descripcion: ''
        })
    }

    return (
        <form className="row g-3" onSubmit={onSubmit}>
            <div className="col-12">
                <h2>Agregar tarea</h2>
            </div>
            <div className="col-12">
                <label htmlFor="nombreFormAgregar" className="form-label">Nombre de la tarea</label>
                <input type="text" className={`form-control ${validacionTaskNombre}`} id="nombreFormAgregar" name="nombre" onChange={onChange} value={task.nombre} />
                {validacionTaskNombre === "is-invalid" && <FormError mensaje="El nombre de la tarea no puede ser nulo" />}
            </div>
            <div className="col-12">
                <label htmlFor="descripcionFormAgregar" className="form-label">Descripción de la tarea</label>
                <input type="text" className={`form-control ${validacionTaskDescripcion}`} id="descripcionFormAgregar" name="descripcion" onChange={onChange} value={task.descripcion} />
                {validacionTaskDescripcion === "is-invalid" && <FormError mensaje="La descripcion de la tarea no puede ser nula" />}
            </div>
            <div className="col-12">
                <button className="btn btn-primary" type="submit">Agregar tarea</button>
            </div>
        </form>
    )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { addTask })(AgregarTask);