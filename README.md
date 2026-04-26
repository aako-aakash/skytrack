# 🚀 SkyTrack – Product Inventory & Analytics System

SkyTrack is a full-stack web application that allows users to manage products, track inventory, and visualize analytics through an interactive dashboard.

---

## 🌐 Live Demo
Frontend: https://your-vercel-link
Backend: https://your-render-link

---

## ✨ Features

- 🔐 User Authentication (JWT-based)
- 📦 Product Management (CRUD)
- 🔍 Search & Filter Products
- 📊 Interactive Dashboard (Charts & Analytics)
- 💰 Total Inventory Value Calculation
- 🎨 Modern UI (Glassmorphism + Gradient Design)
- ⚡ Fast API with PostgreSQL Database

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Recharts (Charts)
- Axios

### Backend
- FastAPI
- PostgreSQL (Supabase)
- SQLAlchemy ORM
- JWT Authentication

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Supabase

---

## 📂 Project Structure
```
frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── App.jsx

backend/
├── app/
│ ├── routes/
│ ├── models/
│ ├── schemas/
│ └── main.py
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/skytrack.git
cd skytrack
```
2️⃣ Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

🔐 Environment Variables
Backend (.env)
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60


# 👨‍💻 Author

## Akash Kumar Saw
🔗 LinkedIn: https://www.linkedin.com/in/akash-kumar-saw-bb1630258
