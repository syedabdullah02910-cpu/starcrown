"""
Star Crown Tour - Quote Request Model
Stores customer consultation/quote requests submitted via the frontend form.
"""

from sqlalchemy import Column, Integer, String, Text, Date, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from database.db import Base


class QuoteRequest(Base):
    """Customer quote/consultation request model."""

    __tablename__ = "quote_requests"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    request_id = Column(
        String(20), unique=True, index=True, nullable=False
    )  # SR-XXXXXX format
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(50), nullable=False)
    service_id = Column(Integer, ForeignKey("services.id"), nullable=False)
    destination = Column(String(255), nullable=True)
    travel_date = Column(Date, nullable=False)
    passengers = Column(Integer, nullable=False, default=1)
    special_requirements = Column(Text, nullable=True)
    status = Column(
        String(50), default="pending", nullable=False, index=True
    )  # pending, quoted, booked, contacted
    admin_notes = Column(Text, nullable=True)
    created_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    # Relationship to Service
    service = relationship("Service", backref="quote_requests")

    def __repr__(self) -> str:
        return f"<QuoteRequest(id={self.id}, request_id='{self.request_id}', status='{self.status}')>"
