import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { data, Link } from 'react-router-dom';
import { MapPin, Clock, Calendar, User, Database } from "lucide-react";
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

const HomePage = () => {
    const [user, setUser] = useState(null);

    const teams = {
        'Arsenal': ars,
        'Aston Villa': avl,
        'Chelsea': che,
        'Fulham': ful,
        'Liverpool': liv,
        'Manchester Utd': mun,
        'Newcastle Utd': newc,
        'Tottenham': tot,
        'Wolves': wol,
        'Brighton': bha,
        'Everton': eve,
        'Bournemouth': bmo,
        'Crystal Palace': cry,
        'Nott\'ham Forest': nfo,
        'West Ham': whu,
        'Brentford': bre,
        'Manchester City': mci,
        'Sunderland': sun,
        'Leeds': lee,
        'Burnley': bur,
    }

    const stadiums = {
        'Arsenal': 'Emirates Stadium',
        'Aston Villa': 'Villa Park',
        'Chelsea': 'Stamford Bridge',
        'Fulham': 'Craven Cottage',
        'Liverpool': 'Anfield',
        'Manchester Utd': 'Old Trafford',
        'Newcastle Utd': 'St James\' Park',
        'Tottenham': 'Tottenham Hotspur Stadium',
        'Wolves': 'Molineux Stadium',
        'Brighton': 'American Express Stadium',
        'Everton': 'Hill Dickinson Stadium',
        'Bournemouth': 'Vitality Stadium',
        'Crystal Palace': 'Selhurst Park',
        'Nott\'ham Forest': 'The City Ground',
        'West Ham': 'London Stadium',
        'Brentford': 'Gtech Community Stadium',
        'Manchester City': 'The Etihad Stadium',
        'Sunderland': 'Stadium of Shite',
        'Leeds': 'Elland Road',
        'Burnley': 'Turf Moor',
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/home', {
                    method: 'GET', 
                    credentials: 'include',
                });
            
            if (response.ok) {
                const data = await response.json()
                setUser(data);
                console.log(data.predictions[0]);
                console.log(data.fixtures[0])
            } else {
                console.error('Failed to fetch user data', response);
            }

            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);
    if (!user) return <p>Loading...</p>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>

                <a href="#" className={styles.logo}>
                    <h1>Machine Learning EPL Predictor</h1>
                </a>

                <nav className={styles.nav}>
                    <a href="#" className={styles.navButton}>
                        <Database size={16} className={styles.icon}/>Data
                    </a>
                    <a href="#" className={styles.navButton}>
                        <User size={16} className={styles.icon}/>Profile
                    </a>
                </nav>
                
            </div>
            <div className={styles.content}>

                <div className={styles.featureBox}>
                    <h1>{user.firstName}'s Predictions for Gameweek 11</h1>
                    <div className={styles.mainPrediction}>

                        <div className={styles.predictionHeader}>
                            <div className={styles.information}>
                                <span className={styles.iconText}> <MapPin size={16} className={styles.icon}/>{stadiums[user.predictions[0]['Team_x']]}</span>
                                <span className={styles.iconText}> <Clock size={16} className={styles.icon}/>{user.predictions[0]['Time_x']}</span>
                                <span className={styles.iconText}> <Calendar size={16} className={styles.icon}/>{user.predictions[0]['Date'].replace(",", "").replace(/ \d{2}:\d{2}:\d{2} GMT/, "")}</span>
                            </div>
                            <p>Premier League</p>
                        </div>

                        <div className={styles.predictionBody}>
                            <div className={styles.leftSide}> 
                                <div className={styles.homeSide}>
                                     <img src={teams[user.predictions[0]['Team_x']]} alt="Arsenal Logo"/> 
                                     <p>{user.predictions[0]['Team_x']}</p>
                                     <div className={styles.percentage}> {user.predictions[0]['confidencePercentage_x'].toFixed(0)}% win chance </div> 
                                </div>
                                <div className={styles.centre}>VS</div>
                                <div className={styles.awaySide}>
                                     <img src={teams[user.predictions[0]['Team_y']]} alt="Arsenal Logo"/> 
                                     <p>{user.predictions[0]['Team_y']}</p> 
                                     <div className={styles.percentage}> {user.predictions[0]['confidencePercentage_y'].toFixed(0)}% win chance </div>                                     
                                </div>
                            </div>
                            <div className={styles.rightSide}/>
                        </div>

                    </div>
                </div>

                <div className={styles.otherPredictions}>
                </div>

            </div>
        </div>
    )
}

export default HomePage;