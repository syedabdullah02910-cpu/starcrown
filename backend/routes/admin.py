"""
Star Crown Tour - Admin Routes
Protected endpoints for the admin dashboard (requires JWT authentication).
"""

from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import func

from database.db import get_db
from models.quote_request import QuoteRequest
from models.user import User
from schemas.quote_request import QuoteRequestResponse, QuoteRequestUpdate
from routes.auth import get_current_admin

# ─── Router Setup ────────────────────────────────────────────────────
router = APIRouter(prefix="/admin", tags=["Admin Dashboard"])


# ─── Endpoints ───────────────────────────────────────────────────────


@router.get("/quotes", response_model=List[QuoteRequestResponse])
def get_all_quotes_admin(
    status_filter: Optional[str] = Query(
        None, alias="status", description="Filter by status"
    ),
    sort_by: Optional[str] = Query("created_at", description="Sort by field"),
    order: Optional[str] = Query("desc", description="Sort order: asc or desc"),
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(50, ge=1, le=200, description="Number of records to return"),
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    """
    Get all quote requests with pagination, filtering, and sorting.
    **Requires admin authentication.**

    Query parameters:
    - **status**: Filter by status (pending, quoted, booked, contacted)
    - **sort_by**: Sort field (created_at, status, name)
    - **order**: Sort order (asc, desc)
    - **skip**: Pagination offset
    - **limit**: Page size (max 200)
    """
    query = db.query(QuoteRequest)

    # Apply status filter
    if status_filter:
        valid_statuses = ["pending", "quoted", "booked", "contacted"]
        if status_filter not in valid_statuses:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid status filter. Must be one of: {', '.join(valid_statuses)}",
            )
        query = query.filter(QuoteRequest.status == status_filter)

    # Apply sorting
    sort_column = getattr(QuoteRequest, sort_by, QuoteRequest.created_at)
    if order == "asc":
        query = query.order_by(sort_column.asc())
    else:
        query = query.order_by(sort_column.desc())

    # Apply pagination
    quotes = query.offset(skip).limit(limit).all()
    return quotes


@router.get(
    "/quotes/status/{request_status}", response_model=List[QuoteRequestResponse]
)
def get_quotes_by_status(
    request_status: str,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    """
    Get quote requests filtered by status.
    **Requires admin authentication.**

    - **request_status**: One of: pending, quoted, booked, contacted
    """
    valid_statuses = ["pending", "quoted", "booked", "contacted"]
    if request_status not in valid_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}",
        )

    quotes = (
        db.query(QuoteRequest)
        .filter(QuoteRequest.status == request_status)
        .order_by(QuoteRequest.created_at.desc())
        .all()
    )
    return quotes


@router.put("/quotes/{quote_id}", response_model=dict)
def update_quote_admin(
    quote_id: int,
    update_data: QuoteRequestUpdate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    """
    Update a quote request's status and admin notes.
    **Requires admin authentication.**

    - **quote_id**: Quote request database ID
    - **status**: New status value
    - **admin_notes**: Notes about this request (e.g., "Sent quote via WhatsApp")
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
            "name": quote.name,
            "status": quote.status,
            "admin_notes": quote.admin_notes,
        },
    }


@router.delete("/quotes/{quote_id}", response_model=dict)
def delete_quote_admin(
    quote_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    """
    Delete a quote request.
    **Requires admin authentication.**

    - **quote_id**: Quote request database ID
    """
    quote = db.query(QuoteRequest).filter(QuoteRequest.id == quote_id).first()
    if not quote:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Quote request with ID {quote_id} not found",
        )

    request_id = quote.request_id
    db.delete(quote)
    db.commit()

    return {
        "status": "success",
        "message": f"Quote request {request_id} deleted successfully",
    }


@router.get("/analytics", response_model=dict)
def get_analytics(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    """
    Get dashboard analytics and statistics.
    **Requires admin authentication.**

    Returns:
    - Total requests count
    - Count by status (pending, quoted, booked, contacted)
    - Conversion rate (booked / total * 100)
    - Recent activity summary
    """
    # Total requests
    total = db.query(func.count(QuoteRequest.id)).scalar() or 0

    # Count by status
    pending = (
        db.query(func.count(QuoteRequest.id))
        .filter(QuoteRequest.status == "pending")
        .scalar()
        or 0
    )
    quoted = (
        db.query(func.count(QuoteRequest.id))
        .filter(QuoteRequest.status == "quoted")
        .scalar()
        or 0
    )
    booked = (
        db.query(func.count(QuoteRequest.id))
        .filter(QuoteRequest.status == "booked")
        .scalar()
        or 0
    )
    contacted = (
        db.query(func.count(QuoteRequest.id))
        .filter(QuoteRequest.status == "contacted")
        .scalar()
        or 0
    )

    # Conversion rate
    conversion_rate = round((booked / total * 100), 1) if total > 0 else 0.0

    # Response time placeholder (would need timestamp tracking for real data)
    avg_response_time = 2.5  # hours - placeholder

    return {
        "status": "success",
        "data": {
            "total_requests": total,
            "pending": pending,
            "quoted": quoted,
            "booked": booked,
            "contacted": contacted,
            "conversion_rate": conversion_rate,
            "avg_response_time": avg_response_time,
        },
    }
