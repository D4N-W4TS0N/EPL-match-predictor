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

        # Uses the BeautifulSoup package to parse the html
        self._data = BeautifulSoup(self._data.text, features='lxml')

        # Uses bs4 css selector method to select all elements ties to the CSS class 'table.stats_table'
        self._standingsTable = self._data.select('table.stats_table')[0]
        # Finds every table element with the HTML <a> tag
        aTags = self._standingsTable.find_all('a')
        links = []
        for link in aTags:
            link = link.get('href')
            if '/squad' in link:
                links.append(link)
        
        # Creates a list of URLs for each team
        teamURLs = []
        for link in links:
            teamURLs.append(f"https://fbref.com{link}")

        
        allMatches =[]
        counter = 0

        for teamURL in teamURLs:
            teamName = teamURL.split('/')[-1].replace('Stats', '').replace('-', ' ')
            teamData = scraper.get(teamURL, headers=headers)

            matches = pd.read_html(teamData.text, match='Scores & Fixtures')
            
            parsedData = BeautifulSoup(teamData.text, features='html.parser')
            aTags = parsedData.find_all('a')

            links = []
            for link in aTags:
                link = link.get('href')
                if link and 'all_comps/shooting' in link:
                    links.append(link)

            shootingURLs = []
            for link in links:
                shootingURLs.append(f"https://fbref.com{link}")

            shootingData = scraper.get(shootingURLs[0], headers=headers)
            print(shootingData.text)

            print(shootingData.text)

            try:
                shootingDF = pd.read_html(shootingData.text, match="Shooting")[0]
            except ValueError as error:
                print(f"Error: {error}")
                

            shootingDF.columns = shootingDF.columns.droplevel()

            try:
                teamData = matches[0].merge(shootingDF[['Date', 'Sh', 'SoT', 'Dist', 'FK', 'PK', 'PKatt']], on='Date')
            except ValueError as error:
                print(f"Error: {error}")

            print(teamData.columns)

            teamData = teamData[teamData['Comp'] == 'Premier League']
            teamData['Season'] = "2024-2025"
            teamData['Team'] = teamName
            print(teamData)

            allMatches.append(teamData)
            counter += 10
            time.sleep(counter)

        matchDF = pd.concat(allMatches)
        print(matchDF)
        matchDF.to_csv('matches.csv')

