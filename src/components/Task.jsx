import React from 'react'
import { connect } from 'react-redux';
import { deleteTask } from '../actions/tasks';

const Task = ({ task, deleteTask }) => {
    const { _id, nombre, descripcion } = task;

    const onClick = () => {
        deleteTask(_id);
    }

    return (
        <div className="mb-2">
            <div className="card w-100">
                <div className="card-body">
                    <h5 className="card-title">{nombre}</h5>
                    <p className="card-text">{descripcion}</p>
                    <button onClick={onClick} className="btn btn-primary">Resolver tarea</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { deleteTask })(Task);