# ⭐ Star Crown Tour - Backend API

> FastAPI + SQLite + SQLAlchemy + JWT Authentication

Production-ready backend for the Star Crown Tour travel platform.

---

## 📋 Prerequisites

- **Python 3.11+** (download from [python.org](https://www.python.org/downloads/))
- **pip** (comes with Python)

---

## 🚀 Installation & Setup

### 1. Navigate to backend folder

```bash
cd backend
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

### 3. Activate the virtual environment

**Windows (PowerShell):**

```bash
venv\Scripts\activate
```

**Windows (CMD):**

```bash
venv\Scripts\activate.bat
```

**macOS/Linux:**

```bash
source venv/bin/activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Set up environment variables

```bash
copy .env.example .env
```

The default values work out of the box. Edit `.env` for production.

### 6. Run the server

```bash
python main.py
```

**OR:**

```bash
uvicorn main:app --reload --port 8000
```

---

## 🌐 Server URLs

| URL                            | Description               |
| ------------------------------ | ------------------------- |
| `http://localhost:8000`        | API Root                  |
| `http://localhost:8000/docs`   | Swagger API Documentation |
| `http://localhost:8000/redoc`  | ReDoc API Documentation   |
| `http://localhost:8000/health` | Health Check              |

---

## 🗄️ Database

- **Engine:** SQLite (file-based, zero configuration)
- **File:** `star_crown.db` (auto-created on first run)
- **Tables:** Auto-created on startup
- **Initial Data:** Seeded automatically (4 services + 1 admin user)

---

## 👤 Admin Login

| Field        | Value                              |
| ------------ | ---------------------------------- |
| **Email**    | `admin@starcrowntoursofficial.com` |
| **Password** | `admin123`                         |
| **Endpoint** | `POST /api/auth/login`             |

---

## 📡 API Endpoints

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint             | Description              | Auth Required |
| ------ | -------------------- | ------------------------ | :-----------: |
| POST   | `/api/auth/login`    | Login & get JWT token    |      ❌       |
| POST   | `/api/auth/register` | Create new account       |      ❌       |
| POST   | `/api/auth/logout`   | Logout                   |      ❌       |
| GET    | `/api/auth/me`       | Get current user profile |      ✅       |

### ✈️ Services (`/api/services`)

| Method | Endpoint                            | Description        | Auth Required |
| ------ | ----------------------------------- | ------------------ | :-----------: |
| GET    | `/api/services`                     | Get all services   |      ❌       |
| GET    | `/api/services/{id}`                | Get service by ID  |      ❌       |
| GET    | `/api/services/category/{category}` | Filter by category |      ❌       |

### 📋 Quote Requests (`/api/quote-requests`)

| Method | Endpoint                   | Description              | Auth Required |
| ------ | -------------------------- | ------------------------ | :-----------: |
| POST   | `/api/quote-requests`      | Submit consultation form |      ❌       |
| GET    | `/api/quote-requests`      | Get all requests         |      ❌       |
| GET    | `/api/quote-requests/{id}` | Get request by ID        |      ❌       |
| PUT    | `/api/quote-requests/{id}` | Update request status    |      ❌       |

### 🛡️ Admin Dashboard (`/api/admin`)

| Method | Endpoint                            | Description                | Auth Required |
| ------ | ----------------------------------- | -------------------------- | :-----------: |
| GET    | `/api/admin/quotes`                 | Get all quotes (paginated) |   ✅ Admin    |
| GET    | `/api/admin/quotes/status/{status}` | Filter by status           |   ✅ Admin    |
| PUT    | `/api/admin/quotes/{id}`            | Update quote status        |   ✅ Admin    |
| DELETE | `/api/admin/quotes/{id}`            | Delete a quote             |   ✅ Admin    |
| GET    | `/api/admin/analytics`              | Dashboard analytics        |   ✅ Admin    |

---

## 🔑 Authentication Flow

### Login Request

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@starcrowntoursofficial.com", "password": "admin123"}'
```

### Response

```json
{
  "access_token": "eyJhbGciOiJIUzI1...",
  "token_type": "bearer",
  "user_id": 1,
  "full_name": "Star Crown Admin",
  "is_admin": true
}
```

### Using the Token

```bash
curl -X GET http://localhost:8000/api/admin/analytics \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."
```

---

## 📝 Submit a Quote Request

```bash
curl -X POST http://localhost:8000/api/quote-requests \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Muhammad Ali",
    "email": "ali@example.com",
    "phone": "+92-300-1234567",
    "service_id": 2,
    "destination": "Makkah & Madinah",
    "travel_date": "2025-03-15",
    "passengers": 4,
    "special_requirements": "Wheelchair accessible hotel needed"
  }'
```

### Response

```json
{
  "status": "success",
  "message": "Your consultation request has been submitted successfully!",
  "data": {
    "request_id": "SR-847291",
    "name": "Muhammad Ali",
    "service": "Umrah Packages",
    "status": "pending"
  }
}
```

---

## 🔗 Frontend Integration

| Setting          | Value                         |
| ---------------- | ----------------------------- |
| **Frontend URL** | `http://localhost:3000`       |
| **Backend URL**  | `http://localhost:8000`       |
| **API Base URL** | `http://localhost:8000/api`   |
| **CORS**         | Configured for localhost:3000 |

In your Next.js frontend, set the Axios base URL:

```typescript
// lib/axios.ts
const API = axios.create({
  baseURL: "http://localhost:8000/api",
});
```

---

## ⚙️ Environment Variables

| Variable                      | Default                      | Description                |
| ----------------------------- | ---------------------------- | -------------------------- |
| `DATABASE_URL`                | `sqlite:///./star_crown.db`  | Database connection string |
| `SECRET_KEY`                  | `starcrown-super-secret-...` | JWT signing key            |
| `ALGORITHM`                   | `HS256`                      | JWT algorithm              |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `1440`                       | Token expiry (24 hours)    |

---

## 📁 Project Structure

```
backend/
├── main.py                    # FastAPI app entry point
├── config.py                  # Settings & environment config
├── requirements.txt           # Python dependencies
├── .env                       # Environment variables
├── .env.example               # Environment template
├── star_crown.db              # SQLite database (auto-created)
├── models/
│   ├── __init__.py
│   ├── user.py                # User/Admin model
│   ├── service.py             # Travel service model
│   └── quote_request.py       # Quote request model
├── schemas/
│   ├── __init__.py
│   ├── user.py                # Auth request/response schemas
│   ├── service.py             # Service schemas
│   └── quote_request.py       # Quote request schemas
├── routes/
│   ├── __init__.py
│   ├── auth.py                # Login, register, JWT
│   ├── services.py            # Service endpoints
│   ├── quotes.py              # Quote request endpoints
│   └── admin.py               # Admin dashboard endpoints
├── database/
│   ├── __init__.py
│   └── db.py                  # SQLAlchemy engine & session
└── README.md                  # This file
```

---

## 🛠️ Tech Stack

- **Framework:** FastAPI 0.104.1
- **Database:** SQLite (via SQLAlchemy 2.0)
- **Auth:** JWT (python-jose) + bcrypt
- **Validation:** Pydantic v2
- **Server:** Uvicorn (ASGI)

---

Built with ❤️ for Star Crown Tour
