import React from 'react';
import styles from './LoginForm.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <h1>Login</h1>
                <form className={styles.loginForm} onSubmit={handleSubmit}>

                    <div className={styles.formGroup}>
                        <input type='text' id='email' name='email' placeholder='Email'required />
                    </div>

                    <div className={styles.formGroup}>
                        <input type='password' id='password' name='passsword' placeholder='Password' required />
                    </div>
                    
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