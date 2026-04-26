from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from jose import jwt
from fastapi.security import OAuth2PasswordRequestForm
import os

from app.db.database import get_db
from app.models.user import User
from app.core.security import verify_password, get_password_hash

router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")


@router.post("/auth/signup")
def signup(user_data: dict, db: Session = Depends(get_db)):
    user = User(
        email=user_data["email"],
        hashed_password=get_password_hash(user_data["password"])
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "User created"}


@router.post("/auth/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == form_data.username).first()

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # 🔥 FIX: INCLUDE USER ID
    token = jwt.encode(
        {"user_id": user.id},
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {"access_token": token, "token_type": "bearer"}
