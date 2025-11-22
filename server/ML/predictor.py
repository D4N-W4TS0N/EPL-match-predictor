from .dataScraper import DataScraper
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score


def prepareDataTrain():
    df = pd.read_csv('matches.csv', index_col=0)
    # print(df.values)

    df = df[df["Date"] != "Date"]
    df["Date"] = pd.to_datetime(df["Date"])
    df = df.sort_values(by=['Team', 'Date']).reset_index(drop=True) 

    # print(df.head(-50))

    df["venueCode"] = df["Venue"].astype('category').cat.codes
    df["opponentCode"] = df["Opponent"].astype('category').cat.codes
    df["hour"] = df["Time"].str.replace(':.+', '', regex=True).astype(int)
    df["dayCode"] = df["Date"].dt.dayofweek
    df["target"] = (df["Result"] == "W").astype(int)

    # print(df.head(50))

    return df

def prepareDataPredict(matchesCSV, fixturesCSV):
    dfMatches = pd.read_csv(matchesCSV, index_col=0)
    dfFixtures = pd.read_csv(fixturesCSV, index_col=0)
    # print(df.values)

    dfFixtures = dfFixtures.reindex(columns=dfMatches.columns)
    df = pd.concat([dfMatches, dfFixtures], ignore_index=True)

    df = df[df["Date"] != "Date"]
    df["Date"] = pd.to_datetime(df["Date"])
    df = df.sort_values(by=['Team', 'Date']).reset_index(drop=True) 

    # print(df.head(-50))

    df["venueCode"] = df["Venue"].astype('category').cat.codes
    df["opponentCode"] = df["Opponent"].astype('category').cat.codes
    df["hour"] = df["Time"].str.replace(':.+', '', regex=True).astype(int)
    df["dayCode"] = df["Date"].dt.dayofweek
    df["target"] = (df["Result"] == "W").astype(int)

    # print(df.head(50))

    return df

def rollingAverage(group, existingColumns, newColumns):
        group = group.sort_values('Date')
        rollingStats = group[existingColumns].rolling(7, closed='left').mean()
        group[newColumns] = rollingStats
        group = group.dropna(subset=newColumns)
        return group

def trainModel():
    df = prepareDataTrain()

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

    print(precision, accuracy)

    return forest

def predict(forest):

    df = prepareDataPredict('matches.csv', 'fixtures.csv')
    # df = pd.read_csv('24-25.csv')

    existingColumns = ['GF', 'GA', 'Sh', 'SoT', 'FK', 'PK', 'PKatt', 'Poss', 'Dist']
    newColumns = [f"{column}_rolling" for column in existingColumns]
    predictors = ["venueCode", "opponentCode", "hour", "dayCode"]

    dfRolling = df.groupby('Team').apply(lambda eachTeam: rollingAverage(eachTeam, existingColumns, newColumns))
    dfRolling = dfRolling.droplevel('Team')
    dfRolling.index = range(dfRolling.shape[0])

    dfRollingMatches = dfRolling[dfRolling["Result"].notna()]
    dfRollingFixtures = dfRolling[dfRolling["Result"].isna()]

    predictors = predictors + newColumns

    predictions = forest.predict(dfRollingFixtures[predictors])
    probabilities = forest.predict_proba(dfRollingFixtures[predictors])[:, 1]

    # print(predictions)
    combined = pd.DataFrame(dict(actualValue = dfRollingFixtures["target"], predictedValue = predictions, confidencePercentage = probabilities*100))
    combined = combined.merge(dfRolling[["Date", "Team", "Opponent"]], left_index=True, right_index=True).drop(columns=["actualValue"])

    homeTeams = dfRollingFixtures[dfRollingFixtures['Venue']=='Home']['Team']

    return combined, homeTeams

def combineHA(preds, homeTeams):
    class MissingDict(dict):
        __missing__ = lambda self, key: key

    mapValues = {
        "Brighton and Hove Albion ": "Brighton ",
        "Manchester United ": "Manchester Utd ",
        "Newcastle United ": "Newcastle Utd",
        "Nottingham Forest ": "Nott'ham Forest ",
        "Tottenham Hotspur ": "Tottenham ",
        "West Ham United ": "West Ham ",
        "Wolverhampton Wanderers ": "Wolves "
    }

    mapping = MissingDict(mapValues)
    preds["Team"] = preds["Team"].map(mapping)
    # print(preds)
    preds.columns = preds.columns.str.strip()
    preds["Opponent"] = preds["Opponent"].str.strip()
    preds["Team"] = preds["Team"].str.strip()
    homeTeams = homeTeams.map(mapping).values
    homeTeams = [team.strip() for team in homeTeams]


    home = preds[preds["Team"].isin(homeTeams)].copy()
    away = preds[~preds["Team"].isin(homeTeams)].copy()
    # print(home)
    # print(away)

    finalPreds = home.merge(away, left_on=["Date", "Team"], right_on=["Date", "Opponent"])
    return finalPreds

# epl = DataScraper()
# epl.scrapeData()
# epl.scrapeFixtures()

# forest = trainModel()
# preds, homeTeams = predict(forest)
# finalPreds = combineHA(preds, homeTeams)










    