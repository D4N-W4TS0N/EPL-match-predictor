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
    const [homeMainData, setHomeMainData] = useState(null);
    const [awayMainData, setAwayMainData] = useState(null);


    const teamsToLogo = {
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
        'Leeds United': lee,
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

    const teamToFixtures = {
        'Arsenal': 'Arsenal',
        'Aston Villa': 'Aston Villa',
        'Chelsea': 'Chelsea',
        'Fulham': 'Fulham',
        'Liverpool': 'Liverpool',
        'Manchester Utd': 'Manchester United',
        'Newcastle Utd': 'Newcastle United',
        'Tottenham': 'Tottenham Hotspur',
        'Wolves': 'Wolverhampton Wanderers',
        'Brighton': 'Brighton & Hove Albion',
        'Everton': 'Everton',
        'Bournemouth': 'Bournemouth',
        'Crystal Palace': 'Crystal Palace',
        'Nott\'ham Forest': 'Nottingham Forest',
        'West Ham': 'West Ham United',
        'Brentford': 'Brentford',
        'Manchester City': 'Manchester City',
        'Sunderland': 'Sunderland',
        'Leeds United': 'Leeds United',
        'Burnley': 'Burnley',
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
                console.log(data.fixtures);
                setHomeMainData(data.fixtures.find(f => f.Team.trim() === teamToFixtures[data.predictions[0]['Team_x']]));
                setAwayMainData(data.fixtures.find(f => f.Team.trim() === teamToFixtures[data.predictions[0]['Team_y']]));
                console.log(homeMainData);
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
    const mainPrediction = user.predictions[0];
    const pred1 = user.predictions[1];
    const p1homeBetter = pred1['confidencePercentage_x'] > pred1['confidencePercentage_y'];
    const pred2 = user.predictions[2];
    const p2homeBetter = pred2['confidencePercentage_x'] > pred2['confidencePercentage_y'];
    const pred3 = user.predictions[3];
    const p3homeBetter = pred3['confidencePercentage_x'] > pred3['confidencePercentage_y'];
    const pred4 = user.predictions[4];
    const p4homeBetter = pred4['confidencePercentage_x'] > pred4['confidencePercentage_y'];
    const pred5 = user.predictions[5];
    const p5homeBetter = pred5['confidencePercentage_x'] > pred5['confidencePercentage_y'];
    const pred6 = user.predictions[6];
    const p6homeBetter = pred6['confidencePercentage_x'] > pred6['confidencePercentage_y'];
    const pred7 = user.predictions[7];
    const p7homeBetter = pred7['confidencePercentage_x'] > pred7['confidencePercentage_y'];
    const pred8 = user.predictions[8]
    const p8homeBetter = pred8['confidencePercentage_x'] > pred8['confidencePercentage_y'];
    const pred9 = user.predictions[9]
    const p9homeBetter = pred9['confidencePercentage_x'] > pred9['confidencePercentage_y'];
    const homeScore = Number(mainPrediction['confidencePercentage_x']);
    const awayScore = Number(mainPrediction['confidencePercentage_y']);
    const homeScoreIsBetter = homeScore > awayScore;
    const homeGF = Number(homeMainData.GF_rolling);
    const awayGF = Number(awayMainData.GF_rolling);
    const homeGoalsIsBetter = homeGF > awayGF;
    const homeGA = Number(homeMainData.GA_rolling);
    const awayGA = Number(awayMainData.GA_rolling);
    const homeConcededIsBetter = homeGA < awayGA;
    const homePoss = Number(homeMainData.Poss_rolling);
    const awayPoss = Number(awayMainData.Poss_rolling);
    const homePossIsBetter = homePoss > awayPoss;
    const homeSh = Number(homeMainData.Sh_rolling);
    const awaySh = Number(awayMainData.Sh_rolling);
    const homeShIsBetter = homeSh > awaySh;
    const homeSoT = Number(homeMainData.SoT_rolling);
    const awaySoT = Number(awayMainData.SoT_rolling);
    const homeSoTIsBetter = homeSoT > awaySoT;
    const homeFK = Number(homeMainData.FK_rolling);
    const awayFK = Number(awayMainData.FK_rolling);
    const homeFKIsBetter = homeFK > awayFK;
    const homePK = Number(homeMainData.PK_rolling);
    const awayPK = Number(awayMainData.PK_rolling);
    const homePKIsBetter = homePK > awayPK;


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
                                <span className={styles.iconText}> <MapPin size={16} className={styles.icon}/>{stadiums[mainPrediction['Team_x']]}</span>
                                <span className={styles.iconText}> <Clock size={16} className={styles.icon}/>{mainPrediction['Time_x']}</span>
                                <span className={styles.iconText}> <Calendar size={16} className={styles.icon}/>{mainPrediction['Date'].replace(",", "").replace(/ \d{2}:\d{2}:\d{2} GMT/, "")}</span>
                            </div>
                            <p>Premier League</p>
                        </div>

                        <div className={styles.predictionBody}>
                            <div className={styles.leftSide}> 
                                <div className={styles.homeSide}>
                                     <img src={teamsToLogo[mainPrediction['Team_x']]} alt="Arsenal Logo"/> 
                                     <p>{mainPrediction['Team_x']}</p>
                                     <div className={`${styles.percentage} ${homeScoreIsBetter ? styles.winner : styles.percentage}`}>{mainPrediction['confidencePercentage_x'].toFixed(0)}% win chance </div> 
                                </div>
                                <div className={styles.centre}>VS</div>
                                <div className={styles.awaySide}>
                                     <img src={teamsToLogo[mainPrediction['Team_y']]} alt="Arsenal Logo"/> 
                                     <p>{mainPrediction['Team_y']}</p> 
                                     <div className={`${styles.percentage} ${homeScoreIsBetter ? styles.percentage : styles.winner}`}>{mainPrediction['confidencePercentage_y'].toFixed(0)}% win chance </div> 
                                </div>
                            </div>
                            <div className={styles.rightSide}>
                                <div className={styles.rsHeader}>Head-to-Head Stats ⚔️</div>

                                <div className={styles.statsHeader}>
                                    <div className={styles.teamLeft}>
                                        <img />
                                        <span>{user.predictions[0]['Team_x']}</span>
                                    </div>
                                    <div className={styles.statsTitle}>Statistic</div>
                                    <div className={styles.teamRight}>
                                        <span>{user.predictions[0]['Team_y']}</span>
                                        <img />
                                    </div>
                                </div>

                                <div className={styles.statsSection}>
                                    {/* <h3>Form (Last 5)</h3> */}
                                    <div className={styles.statRow}>
                                        <div className={`${styles.valueLeft} ${homeGoalsIsBetter ? styles.better : styles.worse}`}>{homeGF.toFixed(1)}</div>                                   
                                        <div className={styles.statLabel}>Goals For</div>
                                        <div className={`${styles.valueRight} ${homeGoalsIsBetter ? styles.worse : styles.better}`}>{awayGF.toFixed(1)}</div>  
                                    </div>
                                    <div className={styles.statRow}>
                                        <div className={`${styles.valueLeft} ${homeConcededIsBetter ? styles.better : styles.worse}`}>{homeGA.toFixed(1)}</div>  
                                        <div className={styles.statLabel}>Goals Against</div>
                                        <div className={`${styles.valueRight} ${homeConcededIsBetter ? styles.worse : styles.better}`}>{awayGA.toFixed(1)}</div>  
                                    </div>
                                    <p> </p>
                                    <div className={styles.statRow}>
                                        <div className={`${styles.valueLeft} ${homePossIsBetter ? styles.better : styles.worse}`}>{homePoss.toFixed(0)}%</div>  
                                        <div className={styles.statLabel}>Possession</div>
                                        <div className={`${styles.valueRight} ${homePossIsBetter ? styles.worse : styles.better}`}>{awayPoss.toFixed(0)}%</div>  
                                    </div>
                                    <div className={styles.statRow}>
                                        <div className={`${styles.valueLeft} ${homeShIsBetter ? styles.better : styles.worse}`}>{homeSh.toFixed(1)}</div>  
                                        <div className={styles.statLabel}>Shots</div>
                                        <div className={`${styles.valueRight} ${homeShIsBetter ? styles.worse : styles.better}`}>{awaySh.toFixed(1)}</div>  
                                    </div>
                                    <div className={styles.statRow}>
                                        <div className={`${styles.valueLeft} ${homeSoTIsBetter ? styles.better : styles.worse}`}>{homeSoT.toFixed(1)}</div>  
                                        <div className={styles.statLabel}>Shots on target</div>
                                        <div className={`${styles.valueRight} ${homeSoTIsBetter ? styles.worse : styles.better}`}>{awaySoT.toFixed(1)}</div>  
                                    </div>
                                    <p> </p>
                                    {/* <div className={styles.statRow}>
                                        <div className={`${styles.valueLeft} ${homeFKIsBetter ? styles.better : styles.worse}`}>{homeFK.toFixed(1)}</div>  
                                        <div className={styles.statLabel}>Free Kicks</div>
                                        <div className={`${styles.valueRight} ${homeFKIsBetter ? styles.worse : styles.better}`}>{awayFK.toFixed(1)}</div>  
                                    </div> */}
                                    <div className={styles.statRow}>
                                        <div className={`${styles.valueLeft} ${homePKIsBetter ? styles.better : styles.worse}`}>{homePK.toFixed(1)}</div>  
                                        <div className={styles.statLabel}>Penalties</div>
                                        <div className={`${styles.valueRight} ${homePKIsBetter ? styles.worse : styles.better}`}>{awayPK.toFixed(1)}</div>  
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <div className={styles.otherPredictions}>
                    <h1>Other Predictions</h1>
                    <div className={styles.tileRow}>
                        <div className={styles.tile}>
                            <div className={styles.predictionHeader}>
                                <div className={styles.information}>
                                    <span className={styles.iconText}> <MapPin size={12} className={styles.icon}/>{stadiums[pred1['Team_x']]}</span>
                                    <span className={styles.iconText}> <Clock size={12} className={styles.icon}/>{pred1['Time_x']}</span>
                                    <span className={styles.iconText}> <Calendar size={12} className={styles.icon}/>{pred1['Date'].replace(",", "").replace(/ \d{2}:\d{2}:\d{2} GMT/, "")}</span>
                                </div>
                            </div>
                            <div className={styles.predictionBody}>
                                <div className={styles.homeSide}>
                                    <img src={teamsToLogo[pred1['Team_x']]} alt="Arsenal Logo"/> 
                                    <p>{pred1['Team_x']}</p>
                                    <div className={`${styles.percentage} ${p1homeBetter ? styles.winner : styles.percentage}`}>{pred1['confidencePercentage_x'].toFixed(0)}% win chance </div> 
                                </div>
                                <div className={styles.centre}>VS</div>
                                <div className={styles.awaySide}>
                                    <img src={teamsToLogo[pred1['Team_y']]} alt="Arsenal Logo"/> 
                                    <p>{pred1['Team_y']}</p> 
                                    <div className={`${styles.percentage} ${p1homeBetter ? styles.percentage : styles.winner}`}>{pred1['confidencePercentage_y'].toFixed(0)}% win chance </div> 
                                </div>    
                            </div>                    
                        </div>
                        <div className={styles.tile}>
                            <div className={styles.predictionHeader}>
                                <div className={styles.information}>
                                    <span className={styles.iconText}> <MapPin size={12} className={styles.icon}/>{stadiums[pred2['Team_x']]}</span>
                                    <span className={styles.iconText}> <Clock size={12} className={styles.icon}/>{pred2['Time_x']}</span>
                                    <span className={styles.iconText}> <Calendar size={12} className={styles.icon}/>{pred2['Date'].replace(",", "").replace(/ \d{2}:\d{2}:\d{2} GMT/, "")}</span>
                                </div>
                            </div>
                            <div className={styles.predictionBody}>
                                <div className={styles.homeSide}>
                                    <img src={teamsToLogo[pred2['Team_x']]} alt="Arsenal Logo"/> 
                                    <p>{pred2['Team_x']}</p>
                                    <div className={`${styles.percentage} ${p2homeBetter ? styles.winner : styles.percentage}`}>{pred2['confidencePercentage_x'].toFixed(0)}% win chance </div> 
                                </div>
                                <div className={styles.centre}>VS</div>
                                <div className={styles.awaySide}>
                                    <img src={teamsToLogo[pred2['Team_y']]} alt="Arsenal Logo"/> 
                                    <p>{pred2['Team_y']}</p> 
                                    <div className={`${styles.percentage} ${p2homeBetter ? styles.percentage : styles.winner}`}>{pred2['confidencePercentage_y'].toFixed(0)}% win chance </div> 
                                </div>    
                            </div>                    
                        </div>
                        <div className={styles.tile}>
                            <div className={styles.predictionHeader}>
                                <div className={styles.information}>
                                    <span className={styles.iconText}> <MapPin size={12} className={styles.icon}/>{stadiums[pred3['Team_x']]}</span>
                                    <span className={styles.iconText}> <Clock size={12} className={styles.icon}/>{pred3['Time_x']}</span>
                                    <span className={styles.iconText}> <Calendar size={12} className={styles.icon}/>{pred3['Date'].replace(",", "").replace(/ \d{2}:\d{2}:\d{2} GMT/, "")}</span>
                                </div>
                            </div>
                            <div className={styles.predictionBody}>
                                <div className={styles.homeSide}>
                                    <img src={teamsToLogo[pred3['Team_x']]} alt="Arsenal Logo"/> 
                                    <p>{pred3['Team_x']}</p>
                                    <div className={`${styles.percentage} ${p3homeBetter ? styles.winner : styles.percentage}`}>{pred3['confidencePercentage_x'].toFixed(0)}% win chance </div> 
                                </div>
                                <div className={styles.centre}>VS</div>
                                <div className={styles.awaySide}>
                                    <img src={teamsToLogo[pred3['Team_y']]} alt="Arsenal Logo"/> 
                                    <p>{pred3['Team_y']}</p> 
                                    <div className={`${styles.percentage} ${p3homeBetter ? styles.percentage : styles.winner}`}>{pred3['confidencePercentage_y'].toFixed(0)}% win chance </div> 
                                </div>    
                            </div>                    
                        </div>          
                    </div>
                    <div className={styles.tileRow}>
                        <div className={styles.tile}>
                            <div className={styles.predictionHeader}>
                                <div className={styles.information}>
                                    <span className={styles.iconText}> <MapPin size={12} className={styles.icon}/>{stadiums[pred4['Team_x']]}</span>
                                    <span className={styles.iconText}> <Clock size={12} className={styles.icon}/>{pred4['Time_x']}</span>
                                    <span className={styles.iconText}> <Calendar size={12} className={styles.icon}/>{pred4['Date'].replace(",", "").replace(/ \d{2}:\d{2}:\d{2} GMT/, "")}</span>
                                </div>
                            </div>
                            <div className={styles.predictionBody}>
                                <div className={styles.homeSide}>
                                    <img src={teamsToLogo[pred4['Team_x']]} alt="Arsenal Logo"/> 
                                    <p>{pred4['Team_x']}</p>
                                    <div className={`${styles.percentage} ${p4homeBetter ? styles.winner : styles.percentage}`}>{pred4['confidencePercentage_x'].toFixed(0)}% win chance </div> 
                                </div>
                                <div className={styles.centre}>VS</div>
                                <div className={styles.awaySide}>
                                    <img src={teamsToLogo[pred4['Team_y']]} alt="Arsenal Logo"/> 
                                    <p>{pred4['Team_y']}</p> 
                                    <div className={`${styles.percentage} ${p4homeBetter ? styles.percentage : styles.winner}`}>{pred4['confidencePercentage_y'].toFixed(0)}% win chance </div> 
                                </div>    
                            </div>                    
                        </div>
                        <div className={styles.tile}>
                            <div className={styles.predictionHeader}>
                                <div className={styles.information}>
                                    <span className={styles.iconText}> <MapPin size={12} className={styles.icon}/>{stadiums[pred5['Team_x']]}</span>
                                    <span className={styles.iconText}> <Clock size={12} className={styles.icon}/>{pred5['Time_x']}</span>
                                    <span className={styles.iconText}> <Calendar size={12} className={styles.icon}/>{pred5['Date'].replace(",", "").replace(/ \d{2}:\d{2}:\d{2} GMT/, "")}</span>
                                </div>
                            </div>
                            <div className={styles.predictionBody}>
                                <div className={styles.homeSide}>
                                    <img src={teamsToLogo[pred5['Team_x']]} alt="Arsenal Logo"/> 
                                    <p>{pred5['Team_x']}</p>
                                    <div className={`${styles.percentage} ${p5homeBetter ? styles.winner : styles.percentage}`}>{pred5['confidencePercentage_x'].toFixed(0)}% win chance </div> 
                                </div>
                                <div className={styles.centre}>VS</div>
                                <div className={styles.awaySide}>
                                    <img src={teamsToLogo[pred5['Team_y']]} alt="Arsenal Logo"/> 
                                    <p>{pred5['Team_y']}</p> 
                                    <div className={`${styles.percentage} ${p5homeBetter ? styles.percentage : styles.winner}`}>{pred5['confidencePercentage_y'].toFixed(0)}% win chance </div> 
                                </div>    
                            </div>                    
                        </div>
                        <div className={styles.tile}>
                            <div className={styles.predictionHeader}>
                                <div className={styles.information}>
                                    <span className={styles.iconText}> <MapPin size={12} className={styles.icon}/>{stadiums[pred6['Team_x']]}</span>
                                    <span className={styles.iconText}> <Clock size={12} className={styles.icon}/>{pred6['Time_x']}</span>
                                    <span className={styles.iconText}> <Calendar size={12} className={styles.icon}/>{pred6['Date'].replace(",", "").replace(/ \d{2}:\d{2}:\d{2} GMT/, "")}</span>
                                </div>
                            </div>
                            <div className={styles.predictionBody}>
                                <div className={styles.homeSide}>
                                    <img src={teamsToLogo[pred6['Team_x']]} alt="Arsenal Logo"/> 
                                    <p>{pred6['Team_x']}</p>
                                    <div className={`${styles.percentage} ${p6homeBetter ? styles.winner : styles.percentage}`}>{pred6['confidencePercentage_x'].toFixed(0)}% win chance </div> 
                                </div>
                                <div className={styles.centre}>VS</div>
                                <div className={styles.awaySide}>
                                    <img src={teamsToLogo[pred6['Team_y']]} alt="Arsenal Logo"/> 
                                    <p>{pred6['Team_y']}</p> 
                                    <div className={`${styles.percentage} ${p6homeBetter ? styles.percentage : styles.winner}`}>{pred6['confidencePercentage_y'].toFixed(0)}% win chance </div> 
                                </div>    
                            </div>                    
                        </div>          
                    </div>
                    <div className={styles.tileRow}>
                        <div className={styles.tile}>
                            <div className={styles.predictionHeader}>
                                <div className={styles.information}>
                                    <span className={styles.iconText}> <MapPin size={12} className={styles.icon}/>{stadiums[pred7['Team_x']]}</span>
                                    <span className={styles.iconText}> <Clock size={12} className={styles.icon}/>{pred7['Time_x']}</span>
                                    <span className={styles.iconText}> <Calendar size={12} className={styles.icon}/>{pred7['Date'].replace(",", "").replace(/ \d{2}:\d{2}:\d{2} GMT/, "")}</span>
                                </div>
                            </div>
                            <div className={styles.predictionBody}>
                                <div className={styles.homeSide}>
                                    <img src={teamsToLogo[pred7['Team_x']]} alt="Arsenal Logo"/> 
                                    <p>{pred7['Team_x']}</p>
                                    <div className={`${styles.percentage} ${p7homeBetter ? styles.winner : styles.percentage}`}>{pred7['confidencePercentage_x'].toFixed(0)}% win chance </div> 
                                </div>
                                <div className={styles.centre}>VS</div>
                                <div className={styles.awaySide}>
                                    <img src={teamsToLogo[pred7['Team_y']]} alt="Arsenal Logo"/> 
                                    <p>{pred7['Team_y']}</p> 
                                    <div className={`${styles.percentage} ${p7homeBetter ? styles.percentage : styles.winner}`}>{pred7['confidencePercentage_y'].toFixed(0)}% win chance </div> 
                                </div>    
                            </div>                    
                        </div>
                        <div className={styles.tile}>
                            <div className={styles.predictionHeader}>
                                <div className={styles.information}>
                                    <span className={styles.iconText}> <MapPin size={12} className={styles.icon}/>{stadiums[pred8['Team_x']]}</span>
                                    <span className={styles.iconText}> <Clock size={12} className={styles.icon}/>{pred8['Time_x']}</span>
                                    <span className={styles.iconText}> <Calendar size={12} className={styles.icon}/>{pred8['Date'].replace(",", "").replace(/ \d{2}:\d{2}:\d{2} GMT/, "")}</span>
                                </div>
                            </div>
                            <div className={styles.predictionBody}>
                                <div className={styles.homeSide}>
                                    <img src={teamsToLogo[pred8['Team_x']]} alt="Arsenal Logo"/> 
                                    <p>{pred8['Team_x']}</p>
                                    <div className={`${styles.percentage} ${p8homeBetter ? styles.winner : styles.percentage}`}>{pred8['confidencePercentage_x'].toFixed(0)}% win chance </div> 
                                </div>
                                <div className={styles.centre}>VS</div>
                                <div className={styles.awaySide}>
                                    <img src={teamsToLogo[pred8['Team_y']]} alt="Arsenal Logo"/> 
                                    <p>{pred8['Team_y']}</p> 
                                    <div className={`${styles.percentage} ${p8homeBetter ? styles.percentage : styles.winner}`}>{pred8['confidencePercentage_y'].toFixed(0)}% win chance </div> 
                                </div>    
                            </div>                    
                        </div>
                        <div className={styles.tile}>
                            <div className={styles.predictionHeader}>
                                <div className={styles.information}>
                                    <span className={styles.iconText}> <MapPin size={12} className={styles.icon}/>{stadiums[pred9['Team_x']]}</span>
                                    <span className={styles.iconText}> <Clock size={12} className={styles.icon}/>{pred9['Time_x']}</span>
                                    <span className={styles.iconText}> <Calendar size={12} className={styles.icon}/>{pred9['Date'].replace(",", "").replace(/ \d{2}:\d{2}:\d{2} GMT/, "")}</span>
                                </div>
                            </div>
                            <div className={styles.predictionBody}>
                                <div className={styles.homeSide}>
                                    <img src={teamsToLogo[pred9['Team_x']]} alt="Arsenal Logo"/> 
                                    <p>{pred9['Team_x']}</p>
                                    <div className={`${styles.percentage} ${p9homeBetter ? styles.winner : styles.percentage}`}>{pred9['confidencePercentage_x'].toFixed(0)}% win chance </div> 
                                </div>
                                <div className={styles.centre}>VS</div>
                                <div className={styles.awaySide}>
                                    <img src={teamsToLogo[pred9['Team_y']]} alt="Arsenal Logo"/> 
                                    <p>{pred9['Team_y']}</p> 
                                    <div className={`${styles.percentage} ${p9homeBetter ? styles.percentage : styles.winner}`}>{pred9['confidencePercentage_y'].toFixed(0)}% win chance </div> 
                                </div>    
                            </div>                    
                        </div>          
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HomePage;