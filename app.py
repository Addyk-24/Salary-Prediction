from pydantic import BaseModel
import pandas as pd
import numpy as np
import joblib
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder,StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.svm import SVR
from sklearn.neighbors import KNeighborsRegressor
from sklearn.tree import DecisionTreeRegressor
from xgboost import XGBRegressor
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

model = input_model.xgb

if model == input_model.rfr:
    model = RandomForestRegressor(n_estimators=100,random_state=42)
    model.fit(X_train,y_train)
elif model == input_model.svr:
    sc = StandardScaler()
    X_train = sc.fit_transform(X_train)
    X_test = sc.transform(X_test)

    model = SVR()
    model.fit(X_train,y_train)
elif model == input_model.knn:
    model = KNeighborsRegressor(n_neighbors=10)
    model.fit(X_train,y_train)
elif model == input_model.dt:
    model = DecisionTreeRegressor(random_state=42)
    model.fit(X_train,y_train)
elif model == input_model.xgb:
    model = XGBRegressor(n_estimators=100, random_state=42)
    model.fit(X_train,y_train)
else:
    raise ValueError("Invalid Model Selected")


y_pred = model.predict(X_test)
print("Model Trained")
prediction = r2_score(y_test,y_pred)

print("Model Accuracy: ",prediction)

model_path = 'salary_prediction_model.pkl'
joblib.dump(model,model_path)
