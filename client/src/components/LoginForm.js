import React from 'react';
import styles from './LoginForm.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setLoginError(false);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setLoginError(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/login', {  //response code collapsed here
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            })
            })

            if (!response.ok){
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            } else {
                navigate('/home');
            }

        } catch(error) {
            setLoginError(true);
            setErrorMessage(error.message);
            console.error('Error:', error.message);
        }
    }

    return (
        <div className={styles.container}>
        <div className={styles.screen}>
            <div className={styles.loginContainer}>
                <h1>Premier League Predictor</h1>
                <h2>Please login to see your team's stats and predictions for the next gameweek</h2>
                <form className={styles.loginForm} onSubmit={handleSubmit}>

                    <div className={styles.formGroup}>
                        <label htmlFor='email'>Email</label>
                        <input type='text' id='email' name='email' placeholder='example@email.com'required value={email} onChange={handleEmailChange} style={{margin: !loginError ? '' : '20px 0px 5px 0px'}}/>
                    </div>

                    <div className={styles.formGroup}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='passsword' placeholder='••••••••' value={password} required onChange={handlePasswordChange}/>
                    </div>
                    {loginError && <p className={styles.errorMessage}>{errorMessage}</p>}
                    <div className={styles.buttonContainer}>
                        <button type='submit' className={styles.loginButton}>Login</button>
                    </div>
                    
                </form>
            </div>
            <div className={styles.sidebar}>
                <h1>Welcome!</h1>
                <p>Don't have an account?</p>
                <Link to={'/register'} className={styles.createAccountButton}>Create Acccount</Link>
            </div>
        </div>
        </div>
    )
}

export default LoginForm;