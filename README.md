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
├── models/
│   ├── encoder.pkl        # Encoder model
│   ├── salary_prediction.py   # Exported Model
│   └── x_sc.pkl    
│   └── x_sc.pkl      
├── dataset/
│   ├── Employers_data.csv            
├── templates/
│   ├── index.html            
├── static/
│   ├── script.js        
│   ├── style.css   
├── salary_agent/
│   ├── main.py   # FastAPI Integration
│   ├── app.py    # Model Integration

```

## ⚙️ Installation  

1. Clone the repository  
```bash
git clone https://github.com/Addyk-24/Salary-Prediction.git
cd salary-prediction-api
```
```bash
python -m venv venv
source venv/bin/activate   # On Linux/Mac
venv\Scripts\activate      # On Windows
```
```bash
pip install -r requirements.txt
```
```bash
uvicorn app.main:app
```
## 🐳Run Using Docker
1. Build The Image
```bash
docker build -t salary-prediction .
```
2. Build The Container
```bash
docker run -d -p 8000:8000 salary-prediction
```
3. Run The Container
```bash
http://localhost:8000
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

## Author
Aditya Katkar

## 🤝 Contribution
Contributions are welcome! Please fork the repo and submit a PR.

