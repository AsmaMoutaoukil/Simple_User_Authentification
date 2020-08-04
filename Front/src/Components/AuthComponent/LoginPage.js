import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import "./LoginPage.css"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class LoginPage extends Component {
    state = {
        password: '',
        email: '',
     

    }
    onSubmitLogin = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        if (email === '' || password === '') {
            toast.error("veuillez  remplir les champs ");
        } else {
            axios.post('http://localhost:3000/login/login', {
                email: e.target.email.value,
                password: e.target.password.value,
            }).then(res => {
                localStorage.setItem('token', res.headers["x-access-token"])
                const token = localStorage.getItem('token')
                if (token) {
                    axios({
                        method: 'POST',
                        url: 'http://localhost:3000/login/protected',
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
                        .then(res => {
                            if (res.data.message === 'Token OK') {
                                window.location.assign('/')
                            } else {
                                res.json({ success: false, message: 'Authentication failed, wrong password buddy' });
                                toast.warning("Problem has occurred please try again later");
                            }

                        })
                }
                else {
                    return toast.error("Un problème est survenu, veuillez réessayer plus tard");
                }
            })
                .catch(error => {
                    return toast.error("Les Données entrées sont  incorrectes")
                })

        }


    }


    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (

            <div className="login-box">
                <h2>Se connecter</h2>
                <form onSubmit={this.onSubmitLogin}>
                    <div className="user-box">
                        <input type="email" name="email" value={this.state.email} onChange={this.changeHandler} required="" />
                        <label>Email  </label>
                    </div>
                    <div className="user-box">
                        <input type="password" name="password" value={this.state.password} onChange={this.changeHandler} required="" />
                        <label>Mot de passe  </label>
                    </div>
                    <a >
                        <button type="submit" onSubmit={this.onSubmitLogin}>Valider</button>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>

                    </a>
                </form>
                <p className="already-account-title">Vous n'avez pas encore de compte? <NavLink to="/register" className="not-account-signup-link">Cliquez ici</NavLink></p>
                <ToastContainer autoClose={10000} />
            </div>
        );
    }
}

export default LoginPage;