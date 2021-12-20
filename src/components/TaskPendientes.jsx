import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import Task from './Task';
import { getTasks } from '../actions/tasks';

const TaskPendientes = ({ tasks, getTasks }) => {

    useEffect(() => {
        getTasks();
    }, [])

    return (
        <>
            <div className="mb-4">
                <h2>Tareas pendientes</h2>
            </div>
            {tasks && tasks.map(task => (<Task task={task} />))}
        </>
    )
}

const mapStateToProps = state => {
    return ({
        tasks: state.tasks
    })
}

export default connect(mapStateToProps, { getTasks })(TaskPendientes);