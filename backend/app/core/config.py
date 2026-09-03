import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "POLY Multilingual Assistance Platform"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Environment
    ENV: str = os.getenv("ENV", "development")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "poly-agora-secret-key-change-in-production")
    
    # Database URL
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "sqlite:///./poly.db"
    )
    
    # Agora Configuration
    AGORA_APP_ID: str = os.getenv("AGORA_APP_ID", "")
    AGORA_APP_CERTIFICATE: str = os.getenv("AGORA_APP_CERTIFICATE", "")
    
    # AI Config
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    
    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
