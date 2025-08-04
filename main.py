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
    allow_origins=["*"],  # Replace "*" with your frontend origin in production
    # allow_origins=["http://127.0.0.1:8000/predict"],
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
    return {"predicted_salary": prediction[0]}

    


# {
#   "Age": 25,
#   "Gender": "Male",
#   "Department": "Engineer",
#   "Job_Title": "Ai engineer",
#   "Experience_Years": 3,
#   "Education_Level": "MASTERS",
#   "Location": "SF"
# }