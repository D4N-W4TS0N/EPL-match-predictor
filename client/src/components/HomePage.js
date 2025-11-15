import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Calendar, User, Database } from "lucide-react";

const HomePage = () => {
    const [user, setUser] = useState(null);

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
                    <h1>Predictions for Gameweek 11</h1>
                    <div className={styles.mainPrediction}>

                        <div className={styles.predictionHeader}>
                            <div className={styles.information}>
                                <span className={styles.iconText}> <MapPin size={16} className={styles.icon}/>St James' Park</span>
                                <span className={styles.iconText}> <Clock size={16} className={styles.icon}/>14:00 GMT</span>
                                <span className={styles.iconText}> <Calendar size={16} className={styles.icon}/>Sunday 9th November</span>
                            </div>
                            <p>Premier League</p>
                        </div>

                        <div className={styles.predictionBody}>
                            <div className={styles.leftSide}> 
                                <div className={styles.homeSide}/>
                                <div className={styles.centre}>VS</div>
                                <div className={styles.awaySide}/>
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