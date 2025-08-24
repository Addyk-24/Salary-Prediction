from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import uvicorn


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
model = joblib.load('../models/salary_prediction_model.pkl')
encoder = joblib.load('../models/encoder.pkl')
y_sc = joblib.load('../models/y_sc.pkl')
x_sc = joblib.load('../models/x_sc.pkl')




app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/",response_class = HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})




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
    input = encoder.transform(input)
    # input = np.array(encoder.transform(input))
    print(input)
    input = x_sc.transform(input)
    prediction = model.predict(input)
    print("Prediction (scaled):", prediction)
    # salary = y_sc.inverse_transform(prediction.reshape(-1,1))
    # print("Prediction after inverse:", salary)
    salary = prediction[0][0] if prediction.ndim > 1 else prediction[0]
    salary = float(salary)  # now it's a plain Python float

    return {"predicted_price": salary}


