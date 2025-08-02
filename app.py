from pydantic import BaseModel
from fastapi import FastAPI
import pandas as pd
import numpy as np
import joblib


df = pd.read_csv('Employers_data.csv')

X = df.drop('Salary', axis=1)
y = df['Salary']

class SalaryPredictionRequest(BaseModel):
    Age: int
    YearsExperience: float
    EducationLevel: int
    JobTitle: str
    Location: str

    

