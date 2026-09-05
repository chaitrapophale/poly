# Production Dockerfile for POLY FastAPI Backend
FROM python:3.12-slim

WORKDIR /app

# Prevent Python from writing pyc files to disc and enable unbuffered stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn uvicorn pydantic-settings

# Copy application source code
COPY . .

# Expose port
EXPOSE 8000

# Run with Gunicorn using Uvicorn workers for production concurrency
CMD ["gunicorn", "app.main:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8000"]
