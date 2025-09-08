from dataScraper import DataScraper
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score


def prepareData():
    df = pd.read_csv('24-25.csv', index_col=0)
    # print(df.shape)

    df["Date"] = pd.to_datetime(df["Date"])

    df["venueCode"] = df["Venue"].astype('category').cat.codes
    df["opponentCode"] = df["Opponent"].astype('category').cat.codes
    df["hour"] = df["Time"].str.replace(':.+', '', regex=True).astype(int)
    df["dayCode"] = df["Date"].dt.dayofweek
    df["target"] = (df["Result"] == "W").astype(int)

    return df

def rollingAverage(group, existingColumns, newColumns):
        group = group.sort_values('Date')
        rollingStats = group[existingColumns].rolling(7, closed='left').mean()
        group[newColumns] = rollingStats
        group = group.dropna(subset=newColumns)
        return group

def evaluateModel():

    df = prepareData()

    groupedMatches = df.groupby('Team')

    

    existingColumns = ['GF', 'GA', 'Sh', 'SoT', 'FK', 'PK', 'PKatt', 'Poss', 'Dist']
    newColumns = [f"{column}_rolling" for column in existingColumns]
    predictors = ["venueCode", "opponentCode", "hour", "dayCode"]



    dfRolling = df.groupby('Team').apply(lambda eachTeam: rollingAverage(eachTeam, existingColumns, newColumns))
    dfRolling = dfRolling.droplevel('Team')
    dfRolling.index = range(dfRolling.shape[0])

    predictors = predictors + newColumns


    train = dfRolling[dfRolling["Date"] < "2025-03-28"]
    test = dfRolling[dfRolling["Date"] > "2025-03-28"]

    forest = RandomForestClassifier(n_estimators=50, min_samples_split=10, random_state=1)
    forest.fit(train[predictors], train["target"])

    predictions = forest.predict(test[predictors])
    probabilities = forest.predict_proba(test[predictors])[:, 1]

    combined = pd.DataFrame(dict(actualValue = test["target"], predictedValue = predictions, confidencePercentage = probabilities*100))
    combined = combined.merge(dfRolling[["Date", "Team", "Opponent", "Result"]], left_index=True, right_index=True)
    # combined = pd.crosstab(index = combined["actualValue"], columns = combined["predictedValue"])

    precision = precision_score(test["target"], predictions)
    accuracy = accuracy_score(test["target"], predictions)

    return combined, precision, accuracy

# print(evaluateModel())

epl = DataScraper()
epl.scrapeData()