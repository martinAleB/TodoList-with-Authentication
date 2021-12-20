import React from 'react';
import Header from '../components/Header';
import AgregarTask from '../components/AgregarTask';
import TaskPendientes from '../components/TaskPendientes';

const TodoList = ({ setVista }) => {
    console.log(localStorage.getItem("authToken"));
    return (
        <>
            <Header setVista={setVista} />

            <div className="container">
                <div className="row">
                    <div className="col-md">
                        <AgregarTask />
                    </div>
                    <div className="col-md">
                        <TaskPendientes />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoList;