from dataScraper import DataScraper
import pandas as pd

# epl = DataScraper()
# epl.scrapeData()

df = pd.read_csv('24-25.csv', index_col=0)
# print(df.shape)

df["Date"] = pd.to_datetime(df["Date"])

df["venueCode"] = df["Venue"].astype('category').cat.codes
df["opponentCode"] = df["Opponent"].astype('category').cat.codes
df["hour"] = df["Time"].str.replace(':.+', '', regex=True).astype(int)
df["dayCode"] = df["Date"].dt.dayofweek
df["target"] = (df["Result"] == "W").astype(int)

print(df.head())
