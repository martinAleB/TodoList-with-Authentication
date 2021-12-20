import React from 'react'

const Header = ({ setVista }) => {
    const logoutUser = () => {
        localStorage.removeItem("authToken");
        setVista("login");
    }

    return (
        <nav className="mb-3 navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <h1 className="navbar-brand">Todo List</h1>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <button class="btn btn-primary navbar-nav" onClick={logoutUser}>Cerrar sesión</button>
                </div>
            </div>
        </nav>
    )
}

export default Header;