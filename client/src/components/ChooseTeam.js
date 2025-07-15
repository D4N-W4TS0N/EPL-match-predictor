import React from 'react';
import styles from './ChooseTeam.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ars from './images/ars.png';
import avl from './images/avl.png';
import che from './images/che.png';
import ful from './images/ful.png';
import liv from './images/liv.png';
import mun from './images/mun.png';
import newc from './images/new.png';
import tot from './images/tot.png';
import wol from './images/wol.png';
import bha from './images/bha.png';
import eve from './images/eve.png';
import bmo from './images/bmo.png';
import cry from './images/cry.png';
import nfo from './images/nfo.png';
import whu from './images/whu.png';
import bre from './images/bre.png';
import mci from './images/mci.png';
import sun from './images/sun.png';
import lee from './images/lee.png';
import bur from './images/bur.png';
import epl from './images/epl.jpg';


const ChooseTeam = () => {
    const [team, setTeam] = useState(null);
    const [errorPresent, setErrorPresent] = useState(false);
    const navigate = useNavigate();

    
    const handleSubmit = async (selectedTeam) => {
        setTeam(selectedTeam);
        try  {
            const response = await fetch('http://127.0.0.1:5000/choose-team', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    team: selectedTeam,
                })
                })
                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(errorMessage);
                } else {
                    navigate('/home');
                }
        } catch (error) {
            setErrorPresent(true);
            console.error('Error:', error.message);
        }

    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Select your Premier League Team</h1>
                <h2 className={styles.subtitle}>Choose your team to follow with tailored predictions and statistics throughout the 25/26 season</h2>
                {errorPresent && <p className={styles.errorMessage}>Error saving team selection, please try again later.</p>}
            </div>
            <div className={styles.buttonList}>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={ars} alt="Arsenal Logo"/>
                        <p>Arsenal FC</p>
                    </div>
                    <button onClick={() => handleSubmit('ARS')}>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={avl} alt="Aston Villa Logo"/>
                        <p>Aston Villa</p>
                    </div>
                    <button onClick={() => handleSubmit('AVL')}>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={bmo} alt="Bournemouth Logo"/>
                        <p>Bournemouth</p>

                    </div>
                    <button onClick={() => handleSubmit('BOU')}>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={bre} alt="Brentford Logo"/>
                        <p>Brentford</p>
                    </div>
                    <button onClick={() => handleSubmit('BRE')}>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={bha} alt="Brighton Logo"/>
                        <p>Brighton & Hove Albion</p>
                    </div>
                    <button onClick={() => handleSubmit('BHA')}>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={bur} alt="Burnley Logo"/>
                        <p>Burnley</p>
                    </div>
                    <button onClick={() => handleSubmit('BUR')}>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={che} alt="Chelsea Logo"/>
                        <p>Chelsea FC</p>
                    </div>
                    <button onClick={() => handleSubmit('CHE')}>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={cry} alt="Palace Logo"/>
                        <p>Crystal Palace FC</p>
                    </div>
                    <button onClick={() => handleSubmit('CRY')}>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={eve} alt="Everton Logo"/>
                        <p>Everton</p>
                    </div>
                    <button onClick={() => handleSubmit('EVE')}>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={ful} alt="Fulham Logo"/>
                        <p>Fulham</p>
                    </div>
                    <button onClick={() => handleSubmit('FUL')}>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={lee} alt="Leeds Logo"/>
                        <p>Leeds United</p>
                    </div>
                    <button onClick={() => handleSubmit('LEE')}>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={liv} alt="Liverpool Logo"/>
                        <p>Liverpool FC</p>
                    </div>
                    <button onClick={() => handleSubmit('LIV')}>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={mci} alt="Man City Logo"/>
                        <p>Manchester City</p>
                    </div>
                    <button onClick={() => handleSubmit('MCI')}>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={mun} alt="Man Utd Logo"/>
                        <p>Manchester United</p>
                    </div>
                    <button onClick={() => handleSubmit('MUN')}>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={newc} alt="Newcastle Logo"/>
                        <p>Newcastle United</p>
                    </div>
                    <button onClick={() => handleSubmit('NEW')}>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={nfo} alt="Forrest Logo"/>
                        <p>Nottingham Forrest</p>
                    </div>
                    <button onClick={() => handleSubmit('NFO')}>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={sun} alt="Sunderland Logo"/>
                        <p>Sunderland AFC</p>
                    </div>
                    <button onClick={() => handleSubmit('PR2')}>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={tot} alt="Spurs Logo"/>
                        <p>Tottenham Hotspur</p>
                    </div>
                    <button onClick={() => handleSubmit('TOT')}>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={whu} alt="West Ham Logo"/>
                        <p>West Ham United</p>
                    </div>
                    <button onClick={() => handleSubmit('WHU')}>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={wol} alt="Wolves Logo"/>
                        <p>Wolverhampton Wanderers</p>
                    </div>
                    <button onClick={() => handleSubmit('WOL')}>Choose</button>
                </div>
            </div>
        </div>
    )
}

export default ChooseTeam;