import numpy as np
import pandas as pd
import tensorflow


df = pd.read_csv('Data/Clean_Real_Estate_With_Crime.csv')
df.drop(df[df['Average School Rating'] == 'No Schools'].index, inplace=True)
df.astype({'Average School Rating': 'category', 'ZIP OR POSTAL CODE':'object','LATITUDE':'object','LONGITUDE':'object', 'BATHS':'int64'}).dtypes
for col in ['ZIP OR POSTAL CODE', 'CITY']:
    df[col]=df[col].astype('category')
df_new = df.loc[:,['BEDS','CITY', 'ZIP OR POSTAL CODE', 'BATHS','PRICE', 'SQUARE FEET', 'LOT SIZE', 'YEAR BUILT', 'DAYS ON MARKET','LATITUDE','LONGITUDE', 'Average School Rating','Crime per Capita (1000s)']]

new_df = pd.get_dummies(df_new)

X = new_df.drop(["PRICE"],axis=1)
y = np.log(new_df.PRICE.values)

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from tensorflow.keras.utils import to_categorical

X_train, X_test, y_train, y_test = train_test_split(
    X, y, random_state=42)

X_scaler = MinMaxScaler().fit(X_train)
X_train_scaled = X_scaler.transform(X_train)
X_test_scaled = X_scaler.transform(X_test)

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

model = Sequential()
model.add(Dense(units=100, input_dim=157))
model.add(Dense(units=100, activation='relu'))
# model.add(Dense(units=2, activation='softmax'))
model.add(Dense(units=1))

model.compile(optimizer='adam', loss='mean_squared_error', metrics=['mse'])
model.fit(X_train_scaled,y_train,validation_split=.15,epochs=80,shuffle=True,verbose=2)

from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor

rf = RandomForestRegressor()
rf.fit(X_train,y_train)


def mlmodel(houseFeatures):
    d = {'BEDS': houseFeatures[0],
        'BATHS': houseFeatures[1],
        'SQUARE FEET': houseFeatures[2],
        'LOT SIZE': houseFeatures[3],
        'YEAR BUILT': houseFeatures[4],
        'DAYS ON MARKET': houseFeatures[5],
        'LATITUDE': houseFeatures[6],
        'LONGITUDE': houseFeatures[7],
        'Crime per Capita (1000s)': houseFeatures[8],
        'CITY_Aliso Viejo': houseFeatures[9],
        'CITY_Anaheim': houseFeatures[10],
        'CITY_Brea': houseFeatures[11],
        'CITY_Buena Park': houseFeatures[12],
        'CITY_Costa Mesa': houseFeatures[13],
        'CITY_Cypress': houseFeatures[14],
        'CITY_Dana Point': houseFeatures[15],
        'CITY_Fountain Valley': houseFeatures[16],
        'CITY_Fullerton': houseFeatures[17],
        'CITY_Garden Grove': houseFeatures[18],
        'CITY_Huntington Beach': houseFeatures[19],
        'CITY_Irvine': houseFeatures[20],
        'CITY_La Habra': houseFeatures[21],
        'CITY_La Palma': houseFeatures[22],
        'CITY_Laguna Beach': houseFeatures[23],
        'CITY_Laguna Hills': houseFeatures[24],
        'CITY_Laguna Niguel': houseFeatures[25],
        'CITY_Lake Forest': houseFeatures[26],
        'CITY_Los Alamitos': houseFeatures[27],
        'CITY_Mission Viejo': houseFeatures[28],
        'CITY_Newport Beach': houseFeatures[29],
        'CITY_Orange': houseFeatures[30],
        'CITY_Placentia': houseFeatures[31],
        'CITY_Rancho Santa Margarita': houseFeatures[32],
        'CITY_San Clemente': houseFeatures[33],
        'CITY_San Juan Capistrano': houseFeatures[34],
        'CITY_Santa Ana': houseFeatures[35],
        'CITY_Seal Beach': houseFeatures[36],
        'CITY_Stanton': houseFeatures[37],
        'CITY_Tustin': houseFeatures[38],
        'CITY_Villa Park': houseFeatures[39],
        'CITY_Westminster': houseFeatures[40],
        'CITY_Yorba Linda': houseFeatures[41],
        'ZIP OR POSTAL CODE_90620': houseFeatures[42],
        'ZIP OR POSTAL CODE_90621': houseFeatures[43],
        'ZIP OR POSTAL CODE_90623': houseFeatures[44],
        'ZIP OR POSTAL CODE_90630': houseFeatures[45],
        'ZIP OR POSTAL CODE_90631': houseFeatures[46],
        'ZIP OR POSTAL CODE_90680': houseFeatures[47],
        'ZIP OR POSTAL CODE_90720': houseFeatures[48],
        'ZIP OR POSTAL CODE_90740': houseFeatures[49],
        'ZIP OR POSTAL CODE_92602': houseFeatures[50],
        'ZIP OR POSTAL CODE_92603': houseFeatures[51],
        'ZIP OR POSTAL CODE_92604': houseFeatures[52],
        'ZIP OR POSTAL CODE_92606': houseFeatures[53],
        'ZIP OR POSTAL CODE_92610': houseFeatures[54],
        'ZIP OR POSTAL CODE_92612': houseFeatures[55],
        'ZIP OR POSTAL CODE_92614': houseFeatures[56],
        'ZIP OR POSTAL CODE_92618': houseFeatures[57],
        'ZIP OR POSTAL CODE_92620': houseFeatures[58],
        'ZIP OR POSTAL CODE_92624': houseFeatures[59],
        'ZIP OR POSTAL CODE_92626': houseFeatures[60],
        'ZIP OR POSTAL CODE_92627': houseFeatures[61],
        'ZIP OR POSTAL CODE_92629': houseFeatures[62],
        'ZIP OR POSTAL CODE_92630': houseFeatures[63],
        'ZIP OR POSTAL CODE_92646': houseFeatures[64],
        'ZIP OR POSTAL CODE_92647': houseFeatures[65],
        'ZIP OR POSTAL CODE_92648': houseFeatures[66],
        'ZIP OR POSTAL CODE_92649': houseFeatures[67],
        'ZIP OR POSTAL CODE_92651': houseFeatures[68],
        'ZIP OR POSTAL CODE_92653': houseFeatures[69],
        'ZIP OR POSTAL CODE_92656': houseFeatures[70],
        'ZIP OR POSTAL CODE_92660': houseFeatures[71],
        'ZIP OR POSTAL CODE_92661': houseFeatures[72],
        'ZIP OR POSTAL CODE_92663': houseFeatures[73],
        'ZIP OR POSTAL CODE_92672': houseFeatures[74],
        'ZIP OR POSTAL CODE_92673': houseFeatures[75],
        'ZIP OR POSTAL CODE_92675': houseFeatures[76],
        'ZIP OR POSTAL CODE_92677': houseFeatures[77],
        'ZIP OR POSTAL CODE_92679': houseFeatures[78],
        'ZIP OR POSTAL CODE_92683': houseFeatures[79],
        'ZIP OR POSTAL CODE_92688': houseFeatures[80],
        'ZIP OR POSTAL CODE_92691': houseFeatures[81],
        'ZIP OR POSTAL CODE_92692': houseFeatures[82],
        'ZIP OR POSTAL CODE_92701': houseFeatures[83],
        'ZIP OR POSTAL CODE_92703': houseFeatures[84],
        'ZIP OR POSTAL CODE_92704': houseFeatures[85],
        'ZIP OR POSTAL CODE_92705': houseFeatures[86],
        'ZIP OR POSTAL CODE_92706': houseFeatures[87],
        'ZIP OR POSTAL CODE_92707': houseFeatures[88],
        'ZIP OR POSTAL CODE_92708': houseFeatures[89],
        'ZIP OR POSTAL CODE_92780': houseFeatures[90],
        'ZIP OR POSTAL CODE_92782': houseFeatures[91],
        'ZIP OR POSTAL CODE_92801': houseFeatures[92],
        'ZIP OR POSTAL CODE_92802': houseFeatures[93],
        'ZIP OR POSTAL CODE_92804': houseFeatures[94],
        'ZIP OR POSTAL CODE_92805': houseFeatures[95],
        'ZIP OR POSTAL CODE_92806': houseFeatures[96],
        'ZIP OR POSTAL CODE_92807': houseFeatures[97],
        'ZIP OR POSTAL CODE_92821': houseFeatures[98],
        'ZIP OR POSTAL CODE_92823': houseFeatures[99],
        'ZIP OR POSTAL CODE_92831': houseFeatures[100],
        'ZIP OR POSTAL CODE_92832': houseFeatures[101],
        'ZIP OR POSTAL CODE_92833': houseFeatures[102],
        'ZIP OR POSTAL CODE_92835': houseFeatures[103],
        'ZIP OR POSTAL CODE_92840': houseFeatures[104],
        'ZIP OR POSTAL CODE_92841': houseFeatures[105],
        'ZIP OR POSTAL CODE_92843': houseFeatures[106],
        'ZIP OR POSTAL CODE_92844': houseFeatures[107],
        'ZIP OR POSTAL CODE_92845': houseFeatures[108],
        'ZIP OR POSTAL CODE_92861': houseFeatures[109],
        'ZIP OR POSTAL CODE_92865': houseFeatures[110],
        'ZIP OR POSTAL CODE_92866': houseFeatures[111],
        'ZIP OR POSTAL CODE_92867': houseFeatures[112],
        'ZIP OR POSTAL CODE_92868': houseFeatures[113],
        'ZIP OR POSTAL CODE_92869': houseFeatures[114],
        'ZIP OR POSTAL CODE_92870': houseFeatures[115],
        'ZIP OR POSTAL CODE_92886': houseFeatures[116],
        'ZIP OR POSTAL CODE_92887': houseFeatures[117],
        'Average School Rating_2.333': houseFeatures[118],
        'Average School Rating_2.667': houseFeatures[119],
        'Average School Rating_3.0': houseFeatures[120],
        'Average School Rating_3.333': houseFeatures[121],
        'Average School Rating_3.667': houseFeatures[122],
        'Average School Rating_4.0': houseFeatures[123],
        'Average School Rating_4.333': houseFeatures[124],
        'Average School Rating_4.4': houseFeatures[125],
        'Average School Rating_4.429': houseFeatures[126],
        'Average School Rating_4.6': houseFeatures[127],
        'Average School Rating_4.667': houseFeatures[128],
        'Average School Rating_4.75': houseFeatures[129],
        'Average School Rating_4.833': houseFeatures[130],
        'Average School Rating_5.0': houseFeatures[131],
        'Average School Rating_5.25': houseFeatures[132],
        'Average School Rating_5.333': houseFeatures[133],
        'Average School Rating_5.5': houseFeatures[134],
        'Average School Rating_5.667': houseFeatures[135],
        'Average School Rating_5.75': houseFeatures[136],
        'Average School Rating_6.0': houseFeatures[137],
        'Average School Rating_6.25': houseFeatures[138],
        'Average School Rating_6.333': houseFeatures[139],
        'Average School Rating_6.5': houseFeatures[140],
        'Average School Rating_6.667': houseFeatures[141],
        'Average School Rating_6.75': houseFeatures[142],
        'Average School Rating_7.0': houseFeatures[143],
        'Average School Rating_7.25': houseFeatures[144],
        'Average School Rating_7.333': houseFeatures[145],
        'Average School Rating_7.667': houseFeatures[146],
        'Average School Rating_7.75': houseFeatures[147],
        'Average School Rating_8.0': houseFeatures[148],
        'Average School Rating_8.2': houseFeatures[149],
        'Average School Rating_8.25': houseFeatures[150],
        'Average School Rating_8.333': houseFeatures[151],
        'Average School Rating_8.5': houseFeatures[152],
        'Average School Rating_8.667': houseFeatures[153],
        'Average School Rating_8.75': houseFeatures[154],
        'Average School Rating_9.0': houseFeatures[155],
        'Average School Rating_9.333': houseFeatures[156]}
    hf_df = pd.DataFrame(data=d, index=[0])
    return np.exp(rf.predict(hf_df))
    