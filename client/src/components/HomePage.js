import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}></div>
            <div className={styles.content}>
                <h1>hello</h1>
            </div>
        </div>
    )
}

export default HomePage;