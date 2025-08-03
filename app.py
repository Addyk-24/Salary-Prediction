from pydantic import BaseModel
import pandas as pd
import numpy as np
import joblib
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score



df = pd.read_csv('Employers_data.csv')

X = df.drop('Salary', axis=1)
y = df['Salary']


class model:
    rfr = 'Random Forest Regressor'
    svr = 'Support Vector Regressor'
    knn = 'K-Nearest Neighbors Regressor'
    dt = 'Decision Tree Regressor'
    xgb = 'XGBoost Regressor'

cat_data = X.select_dtypes(include=['object','category'])
num_data = X.select_dtypes(include=['number'])

categorical_cols = cat_data.columns.tolist()
ct_train = ColumnTransformer(
    transformers=[
        ('encoder', OneHotEncoder(sparse_output=False, handle_unknown='ignore'), categorical_cols),
    ],
    remainder='passthrough'
)
X = np.array(ct_train.fit_transform(X))

print("training model...")

X_train,X_test,y_train,y_test = train_test_split(X, y, test_size=0.2, random_state=42)

input_model = model()

model = input_model.rfr

if model == input_model.rfr:
    model = RandomForestRegressor(n_estimators=100,random_state=42)
    model.fit(X_train,y_train)


y_pred = model.predict(X_test)
print("Model Trained")
prediction = r2_score(y_test,y_pred)

print("Model Accuracy: ",prediction)

model_path = 'salary_prediction_model.pkl'
joblib.dump(model,model_path)
