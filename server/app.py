from dataScraper import DataScraper
import requests

# Creates an instance of the DataScraper class for the English Premier League
epl = DataScraper()
# Scrapes the team links
epl.scrapeData()