"""
Star Crown Tour - Quote Request Pydantic Schemas
Request/response validation for consultation/quote request endpoints.
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import date, datetime


# ─── Request Schemas ─────────────────────────────────────────────────


class QuoteRequestCreate(BaseModel):
    """Schema for submitting a new quote request (from frontend form)."""

    name: str = Field(
        ..., min_length=2, max_length=255, description="Customer full name"
    )
    email: str = Field(..., min_length=5, max_length=255, description="Customer email")
    phone: str = Field(..., min_length=5, max_length=50, description="Phone number")
    service_id: int = Field(..., ge=1, description="ID of the selected service")
    destination: Optional[str] = Field(
        None, max_length=255, description="Travel destination"
    )
    travel_date: date = Field(..., description="Desired travel date")
    passengers: int = Field(1, ge=1, le=100, description="Number of passengers")
    special_requirements: Optional[str] = Field(
        None, description="Special requirements or notes"
    )


class QuoteRequestUpdate(BaseModel):
    """Schema for updating a quote request (admin use)."""

    status: Optional[str] = Field(
        None, description="Status: pending, quoted, booked, contacted"
    )
    admin_notes: Optional[str] = Field(
        None, description="Admin notes about this request"
    )


# ─── Response Schemas ────────────────────────────────────────────────


class QuoteRequestResponse(BaseModel):
    """Schema for quote request data in responses."""

    id: int
    request_id: str
    name: str
    email: str
    phone: str
    service_id: int
    destination: Optional[str] = None
    travel_date: date
    passengers: int
    special_requirements: Optional[str] = None
    status: str
    admin_notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
