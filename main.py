from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from fastapi.middleware.cors import CORSMiddleware
from typing import List,Optional
import pandas as pd
model = joblib.load('salary_prediction_model.pkl')



app = FastAPI()

# Allow frontend origin (adjust as needed)
app.add_middleware(
    CORSMiddleware,
    # allow_origins=["*"],  # Replace "*" with your frontend origin in production
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.get("/")
# def root():
#     return {"message": "Welcome to the Salary Prediction App!"}


@app.get("/predict")
def predict_salary(BaseModel):
    Age : int 
    Gender : int
    Department : str
    Job_Title : str
    Experience_Years : int
    Education_Level : int
    Location : str

    input_data = pd.DataFrame({
        'Age': Age,
        'Gender' : Gender,
        'Department' : Department,
        'Job_Title' : Job_Title,
        'Experience_Years' : Experience_Years,
        'Education_Level' : Education_Level,
        'Location' : Location,
    })
    prediction = model.predict(input_data)
    return {"predicted_salary": prediction[0]}

    

