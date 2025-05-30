## 🎥 DigitalPrint - Your YouTube Content Analyzer
A full-stack application that analyzes your YouTube liked videos, categorizes them intelligently (AI planned), and visualizes your content preferences with interactive dashboards.

## 🚀 Features
✅ OAuth2 Google Sign-in for secure access to liked videos

📊 Dynamic Dashboard with category-wise statistics

🔄 Real-time like-removal with badge update

🧩 Modular Angular + Flask architecture

🐳 Dockerized for easy deployment


🧠 Planned: AI-Powered Categorization using video transcript, title, and metadata

🔁 Planned: Redis support for caching and scalability

## 🖥️ Tech Stack
Layer	Technology
Frontend	Angular 15, HTML5, CSS3
Backend	Python Flask, REST API
AI Layer	(Planned) spaCy / Transformers
Caching	(Planned) Redis
Database	Local JSON store (for session/token)
Deployment	Docker, Docker Compose
Auth	Google OAuth2

## 📁 Folder Structure
```
digital-print/
├── backend/
│   ├── api/                  # Core logic for YouTube API
│   ├── config/               # OAuth and settings
│   ├── utils/                # NLP/AI categorization logic
│   └── app.py                # Flask entry point
├── frontend/
│   └── digiPrint-Frontend/   # Angular UI
├── docker-compose.yml        # Full-stack container orchestration
└── README.md
```
## 🛠️ Setup & Installation
🔧 Prerequisites
Node.js and Angular CLI

Python 3.10+

Docker and Docker Compose

Google OAuth2 Credentials (Client ID & Secret)

## 🚀 Installation
```bash
### 1. Clone the repo
git clone https://github.com/your-username/digital-print.git
cd digital-print

### 2. Add your OAuth credentials
cp your-google-client-secret.json backend/config/client_secret.json

### 3. Build & run with Docker
docker-compose up --build
```

Visit:

Frontend: http://localhost:4200

Backend: http://localhost:5000

## 🔐 Security & Privacy
🔒 OAuth2 tokens are stored locally, encrypted per user

🔐 FLASK_SECRET_KEY secures session cookies

✅ No YouTube data is permanently stored — all processing is session-based

🏷️ Keywords
```
youtube, analytics, dashboard, angular, flask, docker, redis, nlp, ai, oauth2, video-intelligence, spaCy, category-classifier
```
