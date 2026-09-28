"""
Star Crown Tour - Quote Request Routes
Handles customer consultation/quote form submissions and retrieval.
"""

import random
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.db import get_db
from models.quote_request import QuoteRequest
from models.service import Service
from schemas.quote_request import (
    QuoteRequestCreate,
    QuoteRequestUpdate,
    QuoteRequestResponse,
)

# ─── Router Setup ────────────────────────────────────────────────────
router = APIRouter(prefix="/quote-requests", tags=["Quote Requests"])


def generate_request_id() -> str:
    """Generate a unique request ID in the format SR-XXXXXX."""
    return f"SR-{random.randint(100000, 999999)}"


# ─── Endpoints ───────────────────────────────────────────────────────


@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
def create_quote_request(quote_data: QuoteRequestCreate, db: Session = Depends(get_db)):
    """
    Submit a new quote/consultation request.

    This is the main form submission endpoint for the frontend.

    Required fields:
    - **name**: Customer's full name
    - **email**: Customer's email
    - **phone**: Phone number
    - **service_id**: ID of the selected service
    - **travel_date**: Desired travel date (YYYY-MM-DD)
    - **passengers**: Number of passengers (default: 1)

    Optional fields:
    - **destination**: Travel destination
    - **special_requirements**: Any special notes or requirements
    """
    # Validate that the service exists
    service = db.query(Service).filter(Service.id == quote_data.service_id).first()
    if not service:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Service with ID {quote_data.service_id} does not exist",
        )

    # Generate unique request ID (ensure uniqueness)
    request_id = generate_request_id()
    while db.query(QuoteRequest).filter(QuoteRequest.request_id == request_id).first():
        request_id = generate_request_id()

    # Create the quote request
    new_quote = QuoteRequest(
        request_id=request_id,
        name=quote_data.name,
        email=quote_data.email,
        phone=quote_data.phone,
        service_id=quote_data.service_id,
        destination=quote_data.destination,
        travel_date=quote_data.travel_date,
        passengers=quote_data.passengers,
        special_requirements=quote_data.special_requirements,
        status="pending",
    )
    db.add(new_quote)
    db.commit()
    db.refresh(new_quote)

    return {
        "status": "success",
        "message": "Your consultation request has been submitted successfully! Our team will contact you shortly.",
        "data": {
            "request_id": new_quote.request_id,
            "name": new_quote.name,
            "service": service.name,
            "status": new_quote.status,
        },
    }


@router.get("", response_model=List[QuoteRequestResponse])
def get_all_quote_requests(db: Session = Depends(get_db)):
    """
    Get all quote requests.
    Returns all requests ordered by creation date (newest first).
    """
    quotes = db.query(QuoteRequest).order_by(QuoteRequest.created_at.desc()).all()
    return quotes


@router.get("/{quote_id}", response_model=QuoteRequestResponse)
def get_quote_request(quote_id: int, db: Session = Depends(get_db)):
    """
    Get a single quote request by ID.

    - **quote_id**: The unique database ID of the quote request
    """
    quote = db.query(QuoteRequest).filter(QuoteRequest.id == quote_id).first()
    if not quote:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Quote request with ID {quote_id} not found",
        )
    return quote


@router.put("/{quote_id}", response_model=dict)
def update_quote_request(
    quote_id: int,
    update_data: QuoteRequestUpdate,
    db: Session = Depends(get_db),
):
    """
    Update a quote request's status and/or admin notes.

    - **quote_id**: The unique database ID of the quote request
    - **status**: New status (pending, quoted, booked, contacted)
    - **admin_notes**: Admin notes about this request
    """
    quote = db.query(QuoteRequest).filter(QuoteRequest.id == quote_id).first()
    if not quote:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Quote request with ID {quote_id} not found",
        )

    # Validate status if provided
    valid_statuses = ["pending", "quoted", "booked", "contacted"]
    if update_data.status and update_data.status not in valid_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}",
        )

    # Update fields
    if update_data.status is not None:
        quote.status = update_data.status
    if update_data.admin_notes is not None:
        quote.admin_notes = update_data.admin_notes

    db.commit()
    db.refresh(quote)

    return {
        "status": "success",
        "message": "Quote request updated successfully",
        "data": {
            "id": quote.id,
            "request_id": quote.request_id,
            "status": quote.status,
            "admin_notes": quote.admin_notes,
        },
    }
