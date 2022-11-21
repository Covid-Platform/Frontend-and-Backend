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
arr = np.array([[sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5], sys.argv[6], sys.argv[7], sys.argv[8], sys.argv[9], sys.argv[10], sys.argv[11], sys.argv[12], sys.argv[13], sys.argv[14], sys.argv[15], sys.argv[16], sys.argv[17]]])
scaled_feature = scaler.transform(arr)


pred = model.predict(scaled_feature)
print(pred)
# print("Hello form python")