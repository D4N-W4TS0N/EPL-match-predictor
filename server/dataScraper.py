import requests
from bs4 import BeautifulSoup
import pandas as pd

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
    def scrapeTeamLinks(self):
        # Uses the requests package to get the html from the url
        self._data = requests.get(self._standingsUrl)
        self._data = BeautifulSoup(self._data.text, features='html.parser')
        # Uses bs4 css selector method to select all elements ties to the CSS class 'table.stats_table'
        self._standingsTable = self._data.select('table.stats_table')[0]
        # Finds every table element with the HTML <a> tag
        links = self._standingsTable.find_all('a')
        # Gets all the <a> tags that contain 'href' - a hyperlink
        links = [link.get('href') for link in links]
        # Only retains the links that link to each squad, not for example a player or other link
        links = [link for link in links if '/squad' in link]
        
        teamURLs = [f"https://fbref.com{link}" for link in links]
        
        teamURL = teamURLs[0]
        teamData = requests.get(teamURL)
        matches = pd.read_html(teamData.text, match='Scores & Fixtures')
        soup = BeautifulSoup(teamData.text, features='html.parser')
        links = soup.find_all('a')
        links = [link.get('href') for link in links]
        links = [link for link in links if link and 'all_comps/shooting' in link]

        shootingData = requests.get(f"https://fbref.com{links[0]}")
        shooting = pd.read_html(shootingData.text, match='Shooting')[0]
        shooting.columns = shooting.columns.droplevel()
        print(shooting.head())
        