import React from 'react';
import styles from './RegistrationForm.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [emailIsInUse, setEmailIsInUse] = useState(false);
    const navigate = useNavigate();

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

    const registrationIsValid = emailIsValid && passwordIsValid && firstName.length > 0 && lastName.length > 0 && email.length > 0 && password.length > 0;

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
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
            } else {
                navigate('/choose-team');
            }
        
        } catch(error) {
            setEmailIsInUse(true);
            console.error('Error:', error.message);
        };
        
    }

    return (
        <div className={styles.container}>
        <div className={styles.screen}>
            <div className={styles.registrationContainer}>
                <h1>Create Account</h1>
                <h2>Create an account to see predictions for your team throughout the 25/26 season</h2>
                <form className={styles.registrationForm} onSubmit={handleSubmit}>
                    <div className={styles.nameFormGroup}>
                        <div className={styles.name}>
                        <label htmlFor='firstName'>First Name</label>
                        <input type='text' id='firstName' name='firstName' placeholder='Alexander' required value={firstName} autoFocus onChange={(event) => setFirstName(event.target.value)}/>
                        </div>
                        <div className={styles.name}>
                        <label htmlFor='lastName'>Last Name</label>
                        <input type='text' id='lastName' name='lastName' placeholder='Isak' required value={lastName} onChange={(event) => setLastName(event.target.value)}/>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' name='email' placeholder='example@email.com'required value={email} onChange={handleEmailChange} style={{borderColor: !emailIsValid || emailIsInUse ? 'red' : '', margin: !emailIsValid || emailIsInUse ? '20px 0px 5px 0px' : ''}}/>
                        {emailIsInUse && <p className={styles.errorMessage}>This email address is already in use, please login or enter a new email</p>}
                        {!emailIsValid && !emailIsInUse && <p className={styles.errorMessage}>Please enter a valid email address.</p>}
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password' placeholder='••••••••' required value={password} onChange={handlePasswordChange} style={{borderColor: !passwordIsValid ? 'red' : '', margin: passwordIsValid ? '' : '20px 0px 5px 0px'}}/>
                        {!passwordIsValid && <p className={styles.errorMessage}>Please enter a password of at least 8 characters.</p>}
                    </div>

                    <div className={styles.buttonContainer}>
                        <button type='submit' className={`${styles.signUpButton} ${!registrationIsValid ? styles.disabled : ''}`} disabled={!registrationIsValid}>Sign Up</button>
                    </div>
                    
                </form>
            </div>
            <div className={styles.sidebar}>
                <h1>Got an account?</h1>
                <p>Already have an account? Login to see your team's predictions and statistics for the upcoming gameweek.</p>
                <Link to={'/login'} className={styles.loginButton}>Login</Link>
            </div>
        </div>
        </div>
    )
}

export default RegistrationForm;