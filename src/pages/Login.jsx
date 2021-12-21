import axios from 'axios';
import { config } from '../config';
import React, { useState } from 'react'
import FormError from '../components/FormError';
import FormDangerMsg from '../components/FormDangerMsg';


const Login = ({ setVista }) => {
    const [login, setLogin] = useState({
        username: '',
        password: ''
    });
    const [validacionLoginUsername, setValidacionLoginUsername] = useState("");
    const [validacionLoginPassword, setValidacionLoginPassword] = useState("");

    const onChange = e => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const loginUser = async () => {
        var res;
        try {
            res = await axios.post("/.netlify/backend/app/auth/login", login);
            localStorage.setItem("authToken", res.data.token);
            setVista("todolist");
        } catch (err) {
            setValidacionLogin(true);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        setValidacionLoginUsername("");
        setValidacionLoginPassword("");
        setValidacionLogin(false);

        const usernameLength = login.username.trim().length;
        const passwordLength = login.password.trim().length;
        if (usernameLength === 0 || passwordLength === 0) {
            if (usernameLength === 0) {
                setValidacionLoginUsername("is-invalid");
            }
            if (passwordLength === 0) {
                setValidacionLoginPassword("is-invalid");
            }
            setLogin({
                username: "",
                password: ""
            });
            return;
        }

        loginUser();

        setLogin({
            username: "",
            password: ""
        });
    }

    return (
        <div className="container mt-3">
            <h2>Iniciar sesión</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="loginUsername" className="form-label">Nombre de usuario</label>
                    <input type="text" className={`form-control ${validacionLoginUsername}`} name="username" onChange={onChange} value={login.username} id="loginUsername" />
                    {validacionLoginUsername === "is-invalid" && <FormError mensaje="El nombre de usuario no puede ser nulo" />}
                </div>
                <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">Contraseña</label>
                    <input type="password" className={`form-control ${validacionLoginPassword}`} name="password" onChange={onChange} value={login.password} id="loginPassword" />
                    {validacionLoginPassword === "is-invalid" && <FormError mensaje="La contraseña no puede ser nula" />}
                </div>
                {validacionLogin ? <FormDangerMsg mensaje="Usuario o contraseña incorrectos" /> : null}
                <button type="submit" className="btn btn-primary">Iniciar sesion</button>
                <button className="btn btn-secondary" onClick={() => setVista("signup")}>Registrarse</button>
            </form>
        </div>
    )
}

export default Login;