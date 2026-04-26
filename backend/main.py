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

#  Allowed origins
origins = [
    "http://localhost:5173",
    "https://skytrack-beta.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#  Create DB tables
Base.metadata.create_all(bind=engine)

#  Include routers
app.include_router(auth.router)
app.include_router(product_routes.router)

#  Root route
@app.get("/")
def root():
    return {"message": "SkyTrack API Running !!!"}
