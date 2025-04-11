import React from 'react';
import styles from './RegistrationForm.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [emailIsInUse, setEmailIsInUse] = useState(false);

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmailIsInUse(false);
        setEmail(newEmail);
        setEmailIsValid(newEmail.includes('@') && newEmail.includes('.') && !newEmail.includes(' ') && newEmail.length > 4);
    }
    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        setPasswordIsValid(newPassword.length >= 8);
    }

    const registrationIsValid = emailIsValid && passwordIsValid && firstName.length > 0 && lastName.length > 0;

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    firstName,
                    lastName,
                })
            })
            
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        
        } catch(error) {
            setEmailIsInUse(true);
            console.error('Error:', error.message);
        };
        
    }

    return (
        <div className={styles.container}>
            <div className={styles.registrationContainer}>
                <h1>Create Account</h1>
                <form className={styles.registrationForm} onSubmit={handleSubmit}>
                    <div className={styles.nameFormGroup}>
                        <input type='text' id='firstName' name='firstName' placeholder='First Name' required value={firstName} autoFocus onChange={(event) => setFirstName(event.target.value)}/>
                        <input type='text' id='lastName' name='lastName' placeholder='Last Name' required value={lastName} onChange={(event) => setLastName(event.target.value)}/>
                    </div>

                    <div className={styles.formGroup}>
                        <input type='email' id='email' name='email' placeholder='Email'required value={email} onChange={handleEmailChange} style={{borderColor: !emailIsValid || emailIsInUse ? 'red' : '', margin: !emailIsValid || emailIsInUse ? '20px 0px 5px 0px' : ''}}/>
                        {emailIsInUse && <p className={styles.errorMessage}>This email address is already in use, please login or enter a new email</p>}
                        {!emailIsValid && !emailIsInUse && <p className={styles.errorMessage}>Please enter a valid email address.</p>}
                        <input type='password' id='password' name='password' placeholder='Password' required value={password} onChange={handlePasswordChange} style={{borderColor: !passwordIsValid ? 'red' : '', margin: emailIsValid ? '' : '20px 0px 5px 0px'}}/>
                        {!passwordIsValid && <p className={styles.errorMessage}>Please enter a password of at least 8 characters.</p>}
                    </div>

                    <div className={styles.buttonContainer}>
                        <button type='submit' className={`${styles.signUpButton} ${!registrationIsValid ? styles.disabled : ''}`} disabled={!registrationIsValid}>Sign Up</button>
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