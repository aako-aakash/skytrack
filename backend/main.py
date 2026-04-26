from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import Base, engine
from app.models import user, product
from app.api import auth, product as product_routes

app = FastAPI(
    title="SkyTrack API",
    description="Secure API with JWT Auth",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    origins = [
        "http://localhost:5173",
        "https://your-vercel-url.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

# Include routes
app.include_router(auth.router, prefix="/auth")
app.include_router(product_routes.router)


@app.get("/")
def root():
    return {"message": "SkyTrack API Running !!!"}
