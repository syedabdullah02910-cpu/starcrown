"""
Star Crown Tour - Service Routes
Public endpoints for browsing travel services.
"""

from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.db import get_db
from models.service import Service
from schemas.service import ServiceResponse

# ─── Router Setup ────────────────────────────────────────────────────
router = APIRouter(prefix="/services", tags=["Services"])


# ─── Endpoints ───────────────────────────────────────────────────────


@router.get("", response_model=List[ServiceResponse])
def get_all_services(db: Session = Depends(get_db)):
    """
    Get all available travel services.

    Returns a list of all services offered by Star Crown Tour:
    - Air Ticketing
    - Umrah Packages
    - Tourism Packages
    - Travel Insurance
    """
    services = db.query(Service).all()
    return services


@router.get("/{service_id}", response_model=ServiceResponse)
def get_service_by_id(service_id: int, db: Session = Depends(get_db)):
    """
    Get a single service by its ID.

    - **service_id**: The unique ID of the service

    Returns 404 if service not found.
    """
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Service with ID {service_id} not found",
        )
    return service


@router.get("/category/{category}", response_model=List[ServiceResponse])
def get_services_by_category(category: str, db: Session = Depends(get_db)):
    """
    Get services filtered by category.

    - **category**: Category slug (e.g., 'worldwide', 'saudi', 'asia-arab')

    Returns an empty list if no services match the category.
    """
    services = db.query(Service).filter(Service.category == category).all()
    return services
