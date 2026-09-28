"""
╔══════════════════════════════════════════════════════════════╗
║           ⭐ STAR CROWN TOUR - Backend API ⭐               ║
║          FastAPI + SQLite + SQLAlchemy + JWT Auth            ║
║                                                              ║
║  Run:  python main.py                                        ║
║  Docs: http://localhost:8000/docs                            ║
╚══════════════════════════════════════════════════════════════╝
"""

import json
import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from config import settings
from database.db import engine, Base, SessionLocal
from models.user import User
from models.service import Service
from models.quote_request import QuoteRequest
from routes import auth, services, quotes, admin
from routes.auth import get_password_hash

# ─── FastAPI App ─────────────────────────────────────────────────────
app = FastAPI(
    title="Star Crown Tour API",
    description="Backend API for Star Crown Tour - Premium Travel Services Platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ─── CORS Middleware ─────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
)


# ─── Global Error Handler ───────────────────────────────────────────
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Catch all unhandled exceptions and return a clean JSON error response."""
    return JSONResponse(
        status_code=500,
        content={
            "status": "error",
            "message": "An internal server error occurred",
            "detail": str(exc),
        },
    )


# ─── Register Routes ────────────────────────────────────────────────
# All routes are prefixed with /api for clean namespace
app.include_router(auth.router, prefix="/api")
app.include_router(services.router, prefix="/api")
app.include_router(quotes.router, prefix="/api")
app.include_router(admin.router, prefix="/api")


# ─── Root & Health Endpoints ────────────────────────────────────────


@app.get("/", tags=["Root"])
def root():
    """Root endpoint - API information."""
    return {
        "status": "success",
        "message": "⭐ Star Crown Tour API is running!",
        "version": "1.0.0",
        "docs": "/docs",
        "endpoints": {
            "auth": "/api/auth",
            "services": "/api/services",
            "quote_requests": "/api/quote-requests",
            "admin": "/api/admin",
        },
    }


@app.get("/health", tags=["Health"])
def health_check():
    """Health check endpoint for monitoring."""
    return {
        "status": "healthy",
        "database": "connected",
        "version": "1.0.0",
    }


# ─── Database Initialization ────────────────────────────────────────


def seed_database():
    """
    Seed the database with initial data.
    This function is idempotent - safe to run multiple times.

    Creates:
    1. Admin user account
    2. Four travel services
    """
    db = SessionLocal()
    try:
        # ── Seed Admin User ──────────────────────────────────────
        existing_admin = (
            db.query(User).filter(User.email == settings.ADMIN_EMAIL).first()
        )
        if not existing_admin:
            admin_user = User(
                email=settings.ADMIN_EMAIL,
                full_name=settings.ADMIN_NAME,
                password_hash=get_password_hash(settings.ADMIN_PASSWORD),
                is_admin=True,
            )
            db.add(admin_user)
            db.commit()
            print("✅ Admin user created: admin@starcrowntoursofficial.com")
        else:
            print("ℹ️  Admin user already exists, skipping...")

        # ── Seed Services ────────────────────────────────────────
        existing_services = db.query(Service).count()
        if existing_services == 0:
            services_data = [
                {
                    "name": "Air Ticketing",
                    "description": "Book domestic and international flights worldwide with competitive prices. We partner with all major airlines to get you the best deals on economy, business, and first-class tickets. Whether it's a solo trip or group booking, our expert team ensures smooth ticketing with 24/7 support.",
                    "category": "worldwide",
                    "price": "PKR 5,000 - 500,000",
                    "image_url": "/images/air-ticketing.jpg",
                    "features": json.dumps(
                        [
                            "All major airlines",
                            "Domestic & international flights",
                            "Economy, Business & First Class",
                            "Group booking discounts",
                            "24/7 customer support",
                            "Flexible booking options",
                            "Best price guarantee",
                        ]
                    ),
                },
                {
                    "name": "Umrah Packages",
                    "description": "Premium Umrah packages including VIP, VVIP, and Economy options. Complete packages with visa processing, hotel accommodation near Haram, guided Ziyarat tours, transportation, and meals. Experience a spiritually fulfilling journey with our carefully curated packages.",
                    "category": "saudi",
                    "price": "PKR 150,000 - 500,000",
                    "image_url": "/images/umrah.jpg",
                    "features": json.dumps(
                        [
                            "VIP & VVIP packages available",
                            "Hotels near Haram Shareef",
                            "Visa processing included",
                            "Guided Ziyarat tours",
                            "Transport & meals included",
                            "Group & family packages",
                            "Ramadan special packages",
                        ]
                    ),
                },
                {
                    "name": "Tourism Packages",
                    "description": "Explore the world with our curated tourism packages covering 7+ countries across Asia and the Arab world. From the beaches of Thailand to the skyscrapers of Dubai, from the mountains of Turkey to the culture of Malaysia - we've got your dream vacation covered.",
                    "category": "asia-arab",
                    "price": "PKR 100,000 - 350,000",
                    "image_url": "/images/tourism.jpg",
                    "features": json.dumps(
                        [
                            "Dubai, Turkey, Malaysia tours",
                            "Thailand, Baku, Georgia packages",
                            "Hotel & transport included",
                            "Guided sightseeing tours",
                            "Visa assistance",
                            "Customizable itineraries",
                            "Honeymoon specials",
                        ]
                    ),
                },
                {
                    "name": "Travel Insurance",
                    "description": "Comprehensive travel insurance for worry-free journeys. Our insurance plans cover medical emergencies, trip cancellations, lost luggage, flight delays, and more. Travel with complete peace of mind knowing you're protected against the unexpected.",
                    "category": "worldwide",
                    "price": "PKR 2,000 - 25,000",
                    "image_url": "/images/insurance.jpg",
                    "features": json.dumps(
                        [
                            "Medical emergency coverage",
                            "Trip cancellation protection",
                            "Lost luggage coverage",
                            "Flight delay compensation",
                            "24/7 emergency assistance",
                            "COVID-19 coverage",
                            "Family plans available",
                        ]
                    ),
                },
            ]

            for service_data in services_data:
                service = Service(**service_data)
                db.add(service)

            db.commit()
            print(f"✅ {len(services_data)} services seeded successfully")
        else:
            print(f"ℹ️  {existing_services} services already exist, skipping...")

    except Exception as e:
        db.rollback()
        print(f"❌ Error seeding database: {e}")
        raise
    finally:
        db.close()


@app.on_event("startup")
async def startup_event():
    """Run on application startup: create tables and seed data."""
    print("\n" + "=" * 60)
    print("⭐ Star Crown Tour API - Starting Up...")
    print("=" * 60)

    # Create all database tables
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created/verified")

    # Seed initial data
    seed_database()

    print("=" * 60)
    print("🚀 Server ready at http://localhost:8000")
    print("📚 API Docs at http://localhost:8000/docs")
    print("👤 Admin: admin@starcrowntoursofficial.com / admin123")
    print("=" * 60 + "\n")


# ─── Run Server ──────────────────────────────────────────────────────
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )
