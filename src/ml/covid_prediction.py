import pickle
import numpy as np
import sys
from sklearn.preprocessing import StandardScaler
import pandas as pd

model = pickle.load(open('src/ml/model/covid_prediction.pkl', 'rb'))

# sys.argv[1]

covid_df = pd.read_csv("src/ml/dataset/modified_covid_dataset.csv")
scaler = StandardScaler()
firstColumn = covid_df.columns[0]
scaler.fit(covid_df.drop([firstColumn, 'covid_res'], axis = 1))
scaled_feature = scaler.transform([[1, 2, 1, 1, 34, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 2]])

# arr = np.array([[1, 2, 1, 1, 34, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 2]])
pred = model.predict(scaled_feature)
print(pred)
# print("Hello form python")