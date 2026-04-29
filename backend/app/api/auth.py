from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from dotenv import load_dotenv

from app.db.database import get_db
from app.models.user import User
from app.core.security import verify_password, get_password_hash, create_token

load_dotenv()

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


#  SIGNUP
@router.post("/signup")
def signup(user_data: dict, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user_data["email"]).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    user = User(
        email=user_data["email"],
        hashed_password=get_password_hash(user_data["password"])
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "User created successfully"}


#  LOGIN
@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == form_data.username).first()

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    #
    token = create_token({"user_id": str(user.id)})

    return {
        "access_token": token,
        "token_type": "bearer"
    }
