import React from 'react';
import styles from './LoginForm.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
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
            }
        } catch(error) {
            setLoginError(true);
            setErrorMessage(error.message);
            console.error('Error:', error.message);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <h1>Login</h1>
                <form className={styles.loginForm} onSubmit={handleSubmit}>

                    <div className={styles.formGroup}>
                        <input type='text' id='email' name='email' placeholder='Email'required value={email} onChange={handleEmailChange}/>
                    </div>

                    <div className={styles.formGroup}>
                        <input type='password' id='password' name='passsword' placeholder='Password' value={password} required onChange={handlePasswordChange}/>
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
    )
}

export default LoginForm;