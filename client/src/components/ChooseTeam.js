import React from 'react';
import styles from './ChooseTeam.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ars from './images/ars.png';
import avl from './images/avl.png';
import che from './images/che.png';
import ful from './images/ful.png';
import liv from './images/liv.png';
import mun from './images/mun.png';
import newc from './images/new.png';
import tot from './images/tot.png';
import wol from './images/wol.png';
import bri from './images/bri.png';
import eve from './images/eve.png';
import bmo from './images/bmo.png';
import cry from './images/cry.png';
import nfo from './images/nfo.png';
import whu from './images/whu.png';
import bre from './images/bre.png';
import mci from './images/mci.png';
import epl from './images/epl.jpg';


const ChooseTeam = () => {
    return (
        <body className={styles.body}>
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Select your Premier League Team</h1>
                <h2 className={styles.subtitle}>Choose your team to follow with tailored predictions and statistics throughout the 25/26 season</h2>
            </div>
            <div className={styles.buttonList}>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={ars} alt="Arsenal Logo"/>
                        <p>Arsenal FC</p>
                    </div>
                    <button>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={avl} alt="Aston Villa Logo"/>
                        <p>Aston Villa</p>
                    </div>
                    <button>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={bmo} alt="Bournemouth Logo"/>
                        <p>Bournemouth</p>

                    </div>
                    <button>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={bre} alt="Brentford Logo"/>
                        <p>Brentford</p>
                    </div>
                    <button>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={bri} alt="Brighton Logo"/>
                        <p>Brighton & Hove Albion</p>
                    </div>
                    <button>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={che} alt="Chelsea Logo"/>
                        <p>Chelsea FC</p>
                    </div>
                    <button>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={cry} alt="Palace Logo"/>
                        <p>Crystal Palace FC</p>
                    </div>
                    <button>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={eve} alt="Everton Logo"/>
                        <p>Everton</p>
                    </div>
                    <button>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={ful} alt="Fulham Logo"/>
                        <p>Fulham</p>
                    </div>
                    <button>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={liv} alt="Liverpool Logo"/>
                        <p>Liverpool FC</p>
                    </div>
                    <button>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={mci} alt="City Logo"/>
                        <p>Manchester City</p>
                    </div>
                    <button>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={mun} alt="Yanited Logo"/>
                        <p>Manchester United</p>
                    </div>
                    <button>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={newc} alt="Toon Logo"/>
                        <p>Newcastle United</p>
                    </div>
                    <button>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={nfo} alt="Forrest Logo"/>
                        <p>Nottingham Forrest</p>
                    </div>
                    <button>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={tot} alt="Spurs Logo"/>
                        <p>Tottenham Hotspur</p>
                    </div>
                    <button>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={whu} alt="Hammers Logo"/>
                        <p>West Ham United</p>
                    </div>
                    <button>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={wol} alt="Wolves Logo"/>
                        <p>Wolverhampton Wanderers</p>
                    </div>
                    <button>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={epl} alt="EPL Logo"/>
                        <p>Promoted 1</p>
                    </div>
                    <button>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={epl} alt="EPL Logo"/>
                        <p>Promoted 2</p>
                    </div>
                    <button>Choose</button>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.teamInfo}>
                        <img src={epl} alt="EPL Logo"/>
                        <p>Promoted 3</p>
                    </div>
                    <button>Choose</button>
                </div>
            </div>
        </div>
        </body>
    )
}

export default ChooseTeam;