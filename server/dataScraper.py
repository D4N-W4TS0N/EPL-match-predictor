import requests
from bs4 import BeautifulSoup
import pandas as pd
import cloudscraper
import time

# Creates a class which will be used to fetch the data used in either displaying or predicting
class DataScraper():
    # Defines the initialisation method
    def __init__(self):
        # The URL that standings data will be fetched from
        self._standingsUrl = 'https://fbref.com/en/comps/9/Premier-League-Stats'
        self._data = None # HTML data
        self._standingsTable = None # Standings table
        self._teamLinks = None # Links to each epl team

    # The method that actually scrapes the data
    def scrapeData(self):
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
            "Referer": "https://fbref.com/",
            "Accept-Language": "en-US,en;q=0.9",
        }
        scraper = cloudscraper.create_scraper()  # Mimics a real browser
        # Uses the requests package to get the html from the url
        self._data = scraper.get(self._standingsUrl, headers=headers)
        print(self._data)
        # Uses the BeautifulSoup package to parse the html
        self._data = BeautifulSoup(self._data.text, features='lxml')
        # Uses bs4 css selector method to select all elements ties to the CSS class 'table.stats_table'
        self._standingsTable = self._data.select('table.stats_table')[0]
        # Finds every table element with the HTML <a> tag
        links = self._standingsTable.find_all('a')
        # Gets all the <a> tags that contain 'href' - a hyperlink
        links = [link.get('href') for link in links]
        # Only retains the links that link to each squad, not for example a player or other link
        links = [link for link in links if '/squad' in link]
        
        # Creates a list of URLs for each team
        teamURLs = [f"https://fbref.com{link}" for link in links]
        
        counter = 1
        allMatches = []

        for teamURL in teamURLs:
            teamName = teamURL.split('/')[-1].replace('Stats', '').replace('-', ' ')
            # teamSeason = year
            print(teamName)
            # Fetches the data from the first team URL
            teamData = scraper.get(teamURL, headers=headers)
            # Reads the data into a pandas dataframe
            matches = pd.read_html(teamData.text, match='Scores & Fixtures')
            # Parses the data
            soup = BeautifulSoup(teamData.text, features='html.parser')
            # Finds all the <a> tags
            links = soup.find_all('a')
            # Gets all the <a> tags that contain 'href' - a hyperlink
            links = [link.get('href') for link in links]
            # Only retains the links that link to shooting stats
            links = [link for link in links if link and 'all_comps/shooting' in link]

            # Fetches the data from the first shooting URL
            shootingData = scraper.get(f"https://fbref.com{links[0]}", headers=headers)
            # Reads the data into a pandas dataframe
            try:
                shooting = pd.read_html(shootingData.text, match='Shooting')[0]
            except ValueError:
                continue
            # Drops the first level of the multi-index
            shooting.columns = shooting.columns.droplevel()
            try:
                # Merges the match data frame with select columns from the shootin data frame, joining each record on the 'Date' column
                teamData = matches[0].merge(shooting[['Date', 'Sh', 'SoT', 'Dist', 'FK', 'PK', 'PKatt']], on='Date')
            except ValueError:
                continue    

            # Filters the data to only include Premier League matches
            teamData = teamData[teamData['Comp'] == 'Premier League']
            # Adds a column for the season
            teamData['Season'] = "2024-2025"
            # Adds a column for the team
            teamData['Team'] = teamName

            # Appends the data to the allMatches list
            allMatches.append(teamData)

            counter += 10
            time.sleep(counter)

        matchDF = pd.concat(allMatches)
        print(matchDF)
        matchDF.to_csv('matches.csv')
