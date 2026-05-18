# PrimeEdge Capital Backend API Documentation

## Overview

This is a comprehensive backend system for the PrimeEdge Capital investment website. It includes user authentication, contact management, consultation booking, and subscription handling.

## Database

All data is stored in `database.json` with the following collections:
- **users**: User accounts and authentication
- **leads**: Contact form submissions from visitors
- **consultations**: Scheduled consultations with advisors
- **subscriptions**: Active user subscriptions/plans
- **contact_submissions**: Tracked contact form submissions

## Installation & Running

### Start the Backend Server

```bash
cd Finalyearproject
npm run server
```

The server will run on `http://localhost:4000`

### Start the Frontend (in another terminal)

```bash
cd Finalyearproject
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## API Endpoints

### 1. Authentication

#### Login
```
POST /api/login
Content-Type: application/json

{
  "email": "akashtiwari7117@gmail.com",
  "password": "akashtiwari@123"
}

Response: {
  "success": true,
  "user": {
    "id": "user_1",
    "email": "akashtiwari7117@gmail.com",
    "name": "Akash Tiwari",
    "phone": "9607176340",
    "plan": "premium"
  }
}
```

#### Register
```
POST /api/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "secure@123",
  "name": "New User",
  "phone": "9999999999"
}

Response: {
  "success": true,
  "user": {
    "id": "user_xyz",
    "email": "newuser@example.com",
    "name": "New User",
    "phone": "9999999999",
    "plan": "basic"
  }
}
```

---

### 2. User Management

#### Get User Profile
```
GET /api/user?id=user_1

Response: {
  "success": true,
  "user": {
    "id": "user_1",
    "email": "akashtiwari7117@gmail.com",
    "name": "Akash Tiwari",
    "phone": "9607176340",
    "plan": "premium",
    "createdAt": "2025-01-01T10:00:00Z"
  }
}
```

---

### 3. Contact & Leads

#### Submit Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "requirement": "Looking for investment guidance"
}

Response: {
  "success": true,
  "lead": {
    "id": "lead_xyz",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "requirement": "Looking for investment guidance",
    "status": "new",
    "createdAt": "2025-05-08T12:00:00Z"
  }
}
```

#### Get All Leads (Admin)
```
GET /api/leads

Response: {
  "success": true,
  "leads": [
    {
      "id": "lead_1",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "requirement": "Looking for investment guidance",
      "status": "new",
      "createdAt": "2025-05-08T12:00:00Z"
    }
  ]
}
```

#### Get Contact Submissions (Admin)
```
GET /api/contact-submissions

Response: {
  "success": true,
  "submissions": [...]
}
```

---

### 4. Consultations

#### Request Consultation
```
POST /api/consultation
Content-Type: application/json

{
  "userId": "user_1",
  "type": "free",
  "date": "2025-05-15T14:00:00Z",
  "notes": "Initial consultation"
}

Response: {
  "success": true,
  "consultation": {
    "id": "consultation_xyz",
    "userId": "user_1",
    "type": "free",
    "status": "scheduled",
    "date": "2025-05-15T14:00:00Z",
    "notes": "Initial consultation",
    "createdAt": "2025-05-08T12:00:00Z"
  }
}
```

#### Get User Consultations
```
GET /api/consultation?userId=user_1

Response: {
  "success": true,
  "consultations": [...]
}
```

---

### 5. Subscriptions

#### Create Subscription
```
POST /api/subscription
Content-Type: application/json

{
  "userId": "user_1",
  "plan": "premium",
  "amount": 10000,
  "billingCycle": "monthly"
}

Response: {
  "success": true,
  "subscription": {
    "id": "sub_xyz",
    "userId": "user_1",
    "plan": "premium",
    "amount": 10000,
    "billingCycle": "monthly",
    "status": "active",
    "createdAt": "2025-05-08T12:00:00Z"
  }
}
```

#### Get User Subscriptions
```
GET /api/subscription?userId=user_1

Response: {
  "success": true,
  "subscriptions": [...]
}
```

---

### 6. Pricing

#### Get Pricing Plans
```
GET /api/pricing

Response: {
  "success": true,
  "plans": [
    {
      "id": "plan_1",
      "name": "Starter Plan",
      "price": 1000,
      "cycle": "monthly",
      "features": ["Intraday Cash", "Basic Support", "Weekly Updates"],
      "returns": {
        "weekly": 2000,
        "monthly": 8000,
        "quarterly": 25000,
        "halfYearly": 550000
      }
    },
    ...
  ]
}
```

---

### 7. Health Check

#### Server Status
```
GET /api/health

Response: {
  "success": true,
  "message": "Server is running"
}
```

---

## Test Credentials

The following users are pre-loaded in the database:

| Email | Password | Plan |
|-------|----------|------|
| akashtiwari7117@gmail.com | akashtiwari@123 | premium |
| test@gmail.com | test@123 | basic |
| user@primeedge.com | user@123 | growth |
| admin@primeedge.com | admin@123 | premium |

---

## File Structure

```
Finalyearproject/
├── server.js              # Main server entry point
├── routes.js              # API route handlers
├── db.js                  # Database manager
├── database.json          # JSON database file
├── vite.config.js         # Vite configuration with proxy
├── src/
│   └── HomePage.jsx       # Frontend integration
└── package.json
```

---

## Features

✅ User Authentication (Login/Register)
✅ Contact Form Submission
✅ Consultation Booking
✅ Subscription Management
✅ User Profile Management
✅ Lead Management (Admin)
✅ Persistent JSON Database
✅ CORS Enabled
✅ Error Handling
✅ RESTful API Design

---

## Error Responses

All API errors follow this format:

```json
{
  "success": false,
  "error": "Error description"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `405` - Method Not Allowed
- `409` - Conflict
- `500` - Server Error

---

## Notes

- All timestamps are in ISO 8601 format
- Passwords are stored in plain text (for demo purposes - use bcrypt in production)
- Database is reloaded from file on each request
- CORS is enabled for localhost:5173
- Maximum payload size: 1MB

---

## Future Enhancements

- [ ] Use actual database (PostgreSQL, MongoDB)
- [ ] Implement JWT authentication
- [ ] Add password hashing (bcrypt)
- [ ] Email verification
- [ ] Payment gateway integration
- [ ] Admin dashboard
- [ ] Rate limiting
- [ ] Request validation
- [ ] Logging system
