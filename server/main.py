from dataScraper import DataScraper
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score

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

forest = RandomForestClassifier(n_estimators=50, min_samples_split=10, random_state=1)

train = df[df["Date"] < "2025-03-28"]
test = df[df["Date"] > "2025-03-28"]

# BEFORE ROLLING AVERAGES IMPLEMENTED - ACCURACY: 0.66, PRECISION: 0.58
# 
# print(test.head())

# predictors = ["venueCode", "opponentCode", "hour", "dayCode"]

# forest.fit(train[predictors], train["target"])
# predictions = forest.predict(test[predictors])

# accuracy = accuracy_score(test["target"], predictions)
# print(accuracy)

# precision = precision_score(test["target"], predictions)
# print(precision)

# combined = pd.DataFrame(dict(actualValue = test["target"], predictedValue = predictions))
# combined = pd.crosstab(index = combined["actualValue"], columns = combined["predictedValue"])
# print(combined)

groupedMatches = df.groupby('Team')
liv = groupedMatches.get_group('Liverpool ')
# print(liv.head())

def rollingAverage(group, existingColumns, newColumns):
    group = group.sort_values('Date')
    rollingStats = group[existingColumns].rolling(3, closed='left').mean()
    group[newColumns] = rollingStats
    group = group.dropna(subset=newColumns)
    return group

existingColumns = ['GF', 'GA', 'Sh', 'SoT', 'FK', 'PK', 'PKatt', 'Poss', 'Dist']
newColumns = [f"{column}_rolling" for column in existingColumns]

# newLiv = rollingAverage(liv, existingColumns, newColumns)

dfRolling = df.groupby('Team').apply(lambda eachTeam: rollingAverage(liv, existingColumns, newColumns))
dfRolling = dfRolling.droplevel('Team')
print(dfRolling.head())