"""
Star Crown Tour - User Pydantic Schemas
Request/response validation for authentication endpoints.
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


# ─── Request Schemas ─────────────────────────────────────────────────


class UserCreate(BaseModel):
    """Schema for creating a new user account."""

    email: str = Field(
        ..., min_length=5, max_length=255, description="User email address"
    )
    full_name: str = Field(
        ..., min_length=2, max_length=255, description="User's full name"
    )
    password: str = Field(
        ..., min_length=6, max_length=100, description="Account password"
    )


class UserLogin(BaseModel):
    """Schema for user login request."""

    email: str = Field(..., description="User email address")
    password: str = Field(..., description="Account password")


# ─── Response Schemas ────────────────────────────────────────────────


class UserResponse(BaseModel):
    """Schema for user data in responses."""

    id: int
    email: str
    full_name: str
    is_admin: bool
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    """Schema for JWT token response."""

    access_token: str
    token_type: str = "bearer"
    user_id: int
    full_name: str
    is_admin: bool


class TokenData(BaseModel):
    """Schema for decoded JWT token data."""

    user_id: Optional[int] = None
    email: Optional[str] = None
