import axios from 'axios';
import React, { useState } from 'react'
import FormDangerMsg from '../components/FormDangerMsg';
import FormError from '../components/FormError';

const Signup = ({ setVista }) => {
    const [signup, setSignup] = useState({
        username: '',
        password: ''
    });
    const [validacionSignupUsername, setValidacionSignupUsername] = useState("");
    const [validacionSignupPassword, setValidacionSignupPassword] = useState("");
    const [validacionSignup, setValidacionSignup] = useState(false);

    const onChange = e => {
        setSignup({
            ...signup,
            [e.target.name]: e.target.value
        })
    }

    const signupUser = async () => {
        var res;
        try {
            res = await axios.post("/.netlify/functions/app/auth/signup", signup);
            localStorage.setItem("authToken", res.data.token);
            setVista("todolist");
        } catch (err) {
            console.log(err);
            setValidacionSignup(true);
        }
    }

    const onSubmit = e => {
        e.preventDefault();

        setValidacionSignupUsername("");
        setValidacionSignupPassword("");
        setValidacionSignup(false);

        const usernameLength = signup.username.trim().length;
        const passwordLength = signup.password.trim().length;
        if (usernameLength === 0 || passwordLength === 0) {
            if (usernameLength === 0) {
                setValidacionSignupUsername("is-invalid");
            }
            if (passwordLength === 0) {
                setValidacionSignupPassword("is-invalid");
            }
            setSignup({
                username: "",
                password: ""
            });
            return;
        }

        signupUser();

        setSignup({
            username: "",
            password: ""
        });
    }

    return (
        <div className="container mt-3">
            <h2>Registrarse</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label for="signupUsername" className="form-label">Nombre de usuario</label>
                    <input type="text" className={`form-control ${validacionSignupUsername}`} name="username" onChange={onChange} value={signup.username} id="signupUsername" />
                    {validacionSignupUsername === "is-invalid" && <FormError mensaje="El nombre de usuario no puede ser nulo" />}
                </div>
                <div className="mb-3">
                    <label for="signupPassword" className="form-label">Contrase??a</label>
                    <input type="password" className={`form-control ${validacionSignupPassword}`} name="password" onChange={onChange} value={signup.password} id="signupPassword" />
                    {validacionSignupPassword === "is-invalid" && <FormError mensaje="La contrase??a no puede ser nula" />}
                </div>
                {validacionSignup ? <FormDangerMsg mensaje="Ese nombre de usuario ya existe" /> : null}
                <button type="submit" className="btn btn-primary">Registrarse</button>
                <button className="btn btn-secondary" onClick={() => setVista("login")}>Iniciar sesi??n</button>
            </form>
        </div>
    )
}

export default Signup;