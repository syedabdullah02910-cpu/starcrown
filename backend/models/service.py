"""
Star Crown Tour - Service Model
Stores travel service offerings (Air Ticketing, Umrah, Tourism, Insurance).
"""

from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from database.db import Base


class Service(Base):
    """Travel service offering model."""

    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(100), nullable=False, index=True)
    price = Column(String(100), nullable=False)
    image_url = Column(String(500), nullable=True)
    features = Column(Text, nullable=True)  # Stored as JSON string
    created_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    def __repr__(self) -> str:
        return (
            f"<Service(id={self.id}, name='{self.name}', category='{self.category}')>"
        )
