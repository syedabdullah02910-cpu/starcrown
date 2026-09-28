"""
Star Crown Tour - Application Configuration
Loads settings from environment variables with sensible defaults.
"""

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Settings:
    """Application settings loaded from environment variables."""

    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./star_crown.db")

    # JWT Authentication
    SECRET_KEY: str = os.getenv("SECRET_KEY", "starcrown-super-secret-key-2024-change-in-production")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))

    # CORS
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")

    # Admin defaults
    ADMIN_EMAIL: str = "admin@starcrowntoursofficial.com"
    ADMIN_PASSWORD: str = "admin123"
    ADMIN_NAME: str = "Star Crown Admin"


# Global settings instance
settings = Settings()
