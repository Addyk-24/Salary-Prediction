from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from fastapi.middleware.cors import CORSMiddleware
from typing import List,Optional
import pandas as pd
import numpy as np
model = joblib.load('salary_prediction_model.pkl')




app = FastAPI()

# Allow frontend origin (adjust as needed)
app.add_middleware(
    CORSMiddleware,
    # allow_origins=["*"],  # Replace "*" with your frontend origin in production
    allow_origins=["http://127.0.0.1:3000/index.html"],    
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Welcome to the Salary Prediction App!"}

class SalaryInput(BaseModel):
    Age : int 
    Gender : str
    Department : str
    Job_Title : str
    Experience_Years : int
    Education_Level : str
    Location : str
    

@app.post("/predict")
def predict_salary(input_data: SalaryInput):
    input = pd.DataFrame([input_data.model_dump()])
    prediction = model.predict(input)
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
    return {"predicted_price": float(prediction[0])}

    


# {
#   "Age": 25,
#   "Gender": "Male",
#   "Department": "Engineer",
#   "Job_Title": "Ai engineer",
#   "Experience_Years": 3,
#   "Education_Level": "MASTERS",
#   "Location": "SF"
# }