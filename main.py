from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from fastapi.middleware.cors import CORSMiddleware
from typing import List,Optional
import pandas as pd
import numpy as np
import os
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder

# Load the pre-trained model
model = joblib.load('salary_prediction_model.pkl')
encoder = joblib.load('encoder.pkl')




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
    Employee_ID: int
    Name: str
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
    # cat_data = input.select_dtypes(include=['object','category'])
    # num_data = input.select_dtypes(include=['number'])

    # categorical_cols = cat_data.columns.tolist()
    
    input = encoder.transform(input)
    # input = np.array(encoder.transform(input))
    print(input)
    prediction = model.predict(input)
    return {"predicted_price": float(prediction[0])}

    


# {
#   "Employee_ID": 1,
#   "Name": "Addy",
#   "Age": 25,
#   "Gender": "Male",
#   "Department": "Engineer",
#   "Job_Title": "Ai engineer",
#   "Experience_Years": 3,
#   "Education_Level": "MASTERS",
#   "Location": "SF"
# }