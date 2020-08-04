import React, { Component } from 'react';

import { NavLink } from "react-router-dom"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./RegisterPage.css"

class RegisterPage extends Component {
    state = {
        password: '',
        email: '',
        fullname: '',


    }



    onSubmitRegister = (ev) => {
        ev.preventDefault()
        const fullname = ev.target.fullname.value
        const email = ev.target.email.value
        const password = ev.target.password.value

        if (fullname !== "" || email !== "" || password !== "") {
            const objectdata = {
                fullname: ev.target.fullname.value,
                email: ev.target.email.value,
                password: ev.target.password.value
            }
            axios.post("http://localhost:3000/registration/registration", objectdata)
                .then(resp => {
                    if (resp.data.error === "User already exists") {
                        toast.error("Ce compte existe déja");
                    } else {

                        window.location.assign('/login')
                        toast.success("Votre compte a bien été enregistré");
                    }
                })
                .catch(error => {
                    return toast.error("Erreur lors de d'enregistrement veuillez essayer ultérieurement ")
                })
        }
        else {
            toast.error("Formulaire non valide")
            return false
        }


    }

    render() {
        return (
            <>
                <div className="register-box">
                    <h2> S'enregistrer</h2>
                    <form onSubmit={this.onSubmitRegister}>
                        <div className="user-box">
                            <input type="text" name="fullname" required />
                            <label>Nom et Prénom</label>
                        </div>
                        <div className="user-box">
                            <input type="email" name="email" required />
                            <label>Email</label>
                        </div>
                        <div className="user-box">
                            <input type="password" name="password" required />
                            <label>Mot de passe</label>
                        </div>
                        <a href="#">
                            <button type="submit" onSubmit={this.onSubmitLogin}>valider</button>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>

                        </a>

                    </form>
                    <p className="already-account-title">Vous avez déjà un compte? <NavLink to="/login" className="not-account-signup-link">Cliquez ici</NavLink></p>
                    <ToastContainer autoClose={10000} />
                </div>
            </>
        )
    }

}
export default RegisterPage;