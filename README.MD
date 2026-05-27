*****  NOTES APP BACKEND

A production-oriented backend application built with Node.js, Express.js, MongoDB, Redis, BullMQ, Docker, and NGINX.

This project was built with a focus on learning real backend engineering concepts like caching, queues, containerization, monitoring, health checks, and scaling architecture.

*  Features

1. Authentication
2. User Registration
3. User Login
4. JWT Authentication
5. Password Hashing using bcrypt
6. Notes Management
7. Create Note
8. Get All Notes
9. Get Note By ID
10. Update Note
11. Delete Note
12. Archive / Unarchive Notes
13. Share Notes with Users

* Backend Engineering Features

Production Backend Engineering

Logging
Rate Limiting
Redis Caching
BullMQ Queues
Background Jobs
Email Queue Processing
DevOps + Scalability
Dockerized Application
Docker Compose Setup
NGINX Reverse Proxy
Horizontal Scaling Concepts
Health Check APIs
Monitoring APIs

*  Tech Stack

Backend
Node.js
Express.js
Database
MongoDB
Mongoose
Cache
Redis
Queue System
BullMQ
DevOps
Docker
Docker Compose
NGINX


📁 Project Structure
src/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── queues/
├── routes/
├── services/
├── utils/
└── workers/

⚙️ Installation
1️⃣ Clone Repository
git clone https://github.com/SACHIN-TIWARI6343/NotesApp_updated_feature.git
2️⃣ Move Into Project
cd NotesApp_updated_feature

🐳 Run With Docker
Start Application
docker compose up --build

🌐 Application Architecture

Client
   │
   ▼
NGINX
   │
   ▼
Backend Containers
   │
   ├── MongoDB
   ├── Redis
   └── BullMQ


* Health Check Endpoint

GET /health

 Response:
{
  "status": "OK",
  "redis": "Connected",
  "database": "Connected"
}


* Monitoring Information

Monitoring endpoint provides:

CPU Usage
Memory Usage
System Information
Redis Status
MongoDB Status


⚡ Scaling

The project supports horizontal scaling using Docker containers and NGINX load balancing.

Example:

docker compose up --scale app=3

📈 Future Improvements


Repository Pattern
DTO Pattern
Validation Architecture
Global Error Middleware
Retry Mechanism
CI/CD Pipeline
Advanced Distributed Systems Concepts


* Author

Sachin Tiwari
