FROM python:3.13.1
WORKDIR /app

COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt


COPY salary_agent /app/salary_agent
COPY dataset /app/dataset
COPY models /app/models
COPY static /app/static
COPY templates /app/templates


EXPOSE 8000

# Run the App
CMD ["uvicorn", "salary_agent.main:app", "--host", "0.0.0.0", "--port", "8000"]
