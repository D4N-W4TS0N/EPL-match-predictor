import React from 'react';
import styles from './LoginForm.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailError(false);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordError(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/login', {  //response code collapsed here
            method: 'POST',
            credentials: 'include',
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
            if (error.message.includes('password')) {
                setPasswordError(true);
            } else if (error.message.includes('Email')) {
                setEmailError(true);
            }
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
                        <input type='text' id='email' name='email' placeholder='example@email.com'required value={email} onChange={handleEmailChange} style={{margin: !emailError ? '' : '20px 0px 5px 0px', borderColor: !emailError ? '' : 'red'}}/>
                        {emailError && <p className={styles.errorMessage}>{errorMessage}</p>}
                    </div>

                    <div className={styles.formGroup}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='passsword' placeholder='••••••••' value={password} required onChange={handlePasswordChange} style={{margin: !passwordError ? '' : '20px 0px 5px 0px', borderColor: !passwordError ? '' : 'red'}}/>
                    {passwordError && <p className={styles.errorMessage}>{errorMessage}</p>}
                    </div>
                
                    <div className={styles.buttonContainer}>
                        <button type='submit' className={styles.loginButton}>Login</button>
                    </div>
                    
                </form>
            </div>
            <div className={styles.sidebar}>
                <h1>New to Premier League Predictor?</h1>
                <p>Create an account to select your team and follow them with tailored stats and predictions throughout the 25/26 season</p>
                <Link to={'/register'} className={styles.createAccountButton}>Create Acccount</Link>
            </div>
        </div>
        </div>
    )
}

export default LoginForm;