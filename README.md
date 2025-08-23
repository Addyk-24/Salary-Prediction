# 💼 Salary Prediction API  

This project is a **Machine Learning-based Salary Prediction API** built with **FastAPI**.  
It uses a trained ML model to predict salaries based on input features such as experience, education, job title, and other relevant attributes.  

---

## 🚀 Features  
- Fast and efficient REST API using **FastAPI**  
- Salary prediction with a trained ML model  
- JSON-based request/response for easy integration  
- Lightweight and easy to deploy  

## 📂 Project Structure  

```bash
├── app/
│   ├── main.py            # FastAPI application
│   ├── model.pkl          # Trained ML model
│   ├── preprocessing.py   # Data preprocessing utilities (if any)
│   └── schemas.py         # Pydantic models for request/response
├── requirements.txt       # Dependencies
├── README.md              # Project documentation
└── notebook.ipynb         # Model training notebook (optional)
```

## ⚙️ Installation  

1. Clone the repository  
```bash
git clone https://github.com/your-username/salary-prediction-api.git
cd salary-prediction-api

python -m venv venv
source venv/bin/activate   # On Linux/Mac
venv\Scripts\activate      # On Windows

pip install -r requirements.txt

uvicorn app.main:app --reload
uvicorn main:app --host localhost// --port 8000 --reload
```
### 📈 Example:
```
{
   "Employee_ID": 1,
   "Name": "Addy",
   "Age": 25,
   "Gender": "Male",
   "Department": "Engineer",
   "Job_Title": "Ai engineer",
   "Experience_Years": 3,
   "Education_Level": "MASTERS",
   "Location": "SF"
}
```
## 🛠 Tech Stack

1. *Python*
2. *FastAPI*
3. *Scikit-learn / XGBoost*
4. *Uvicorn*

## 📈 Future Improvements

Add authentication (JWT tokens)

Deploy on cloud (AWS/GCP/Heroku)

Add more features for better accuracy

## Team Member
Aditya Katkar

## 🤝 Contribution
Contributions are welcome! Please fork the repo and submit a PR.

