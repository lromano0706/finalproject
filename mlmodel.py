from rfpimp import *
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

df_og = pd.read_csv('Data/Clean_Real_Estate.csv')
df_og = pd.DataFrame(df_og).fillna(0)


df = df_og.copy()


df['PRICE'] = np.log(df['PRICE'])
df_train, df_test = train_test_split(df, test_size=.20)
features = ['BATHS', 'BEDS', 'SQUARE FEET', 'LOT SIZE', 'PRICE']
df_train = df_train[features]
df_test = df_test[features]

X_train, y_train = df_train.drop('PRICE',axis=1), df_train['PRICE']
X_test, y_test = df_test.drop('PRICE',axis=1), df_test['PRICE']


rf = RandomForestRegressor(n_estimators=100, n_jobs=-1)
rf.fit(X_train, y_train)

def model(houseFeatures):
    d = {'BATHS':houseFeatures[0], 'BEDS':houseFeatures[1], 'SQUARE FEET':houseFeatures[2], 'LOT SIZE':houseFeatures[3]}
    hf_df = pd.DataFrame(data=d, index=[0])
    return np.exp(rf.predict(hf_df))

print(type(model([1.75, 4, 2107, 8343])[0]))