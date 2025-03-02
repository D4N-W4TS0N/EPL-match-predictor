import React from 'react';
import styles from './RegistrationForm.module.css';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
    return (
        <div className={styles.container}>
            <div className={styles.registrationContainer}>
                <h1>Create Account</h1>
                <form className={styles.registrationForm}>
                    <div className={styles.nameFormGroup}>
                        <input type='text' id='firstName' name='firstName' placeholder='First Name' required />
                        <input type='text' id='lastName' name='LastName' placeholder='Last Name' required />
                    </div>

                    <div className={styles.formGroup}>
                        {/* <label htmlFor="username">Username</label> */}
                        <input type='text' id='email' name='email' placeholder='Email'required />
                        {/* <label htmlFor="username">Username</label> */}
                        <input type='password' id='password' name='passsword' placeholder='Password' required />
                    </div>

                    <div className={styles.buttonContainer}>
                        <button type='submit' className={styles.signUpButton}>Sign Up</button>
                    </div>
                    
                </form>
            </div>
            <div className={styles.sidebar}>
                <h1>Welcome!</h1>
                <p>Already have an account?</p>
                <Link to={'/login'} className={styles.loginButton}>Login</Link>
            </div>
        </div>
    )
}

export default RegistrationForm;