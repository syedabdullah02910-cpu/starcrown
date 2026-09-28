"""
Star Crown Tour - Service Pydantic Schemas
Request/response validation for service endpoints.
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


# ─── Request Schemas ─────────────────────────────────────────────────


class ServiceCreate(BaseModel):
    """Schema for creating a new service."""

    name: str = Field(..., min_length=2, max_length=255, description="Service name")
    description: str = Field(..., min_length=10, description="Service description")
    category: str = Field(
        ..., min_length=2, max_length=100, description="Service category"
    )
    price: str = Field(..., description="Price or price range")
    image_url: Optional[str] = Field(None, max_length=500, description="Image URL")
    features: Optional[str] = Field(None, description="Features as JSON string")


class ServiceUpdate(BaseModel):
    """Schema for updating a service."""

    name: Optional[str] = Field(None, min_length=2, max_length=255)
    description: Optional[str] = Field(None, min_length=10)
    category: Optional[str] = Field(None, min_length=2, max_length=100)
    price: Optional[str] = None
    image_url: Optional[str] = None
    features: Optional[str] = None


# ─── Response Schemas ────────────────────────────────────────────────


class ServiceResponse(BaseModel):
    """Schema for service data in responses."""

    id: int
    name: str
    description: str
    category: str
    price: str
    image_url: Optional[str] = None
    features: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
