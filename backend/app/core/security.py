from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

#  Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#  Config
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = 60


# ================================
#  PASSWORD FUNCTIONS
# ================================

def get_password_hash(password: str) -> str:
    """
    Hash a plain password
    """
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify password during login
    """
    return pwd_context.verify(plain_password, hashed_password)


# ================================
#      TOKEN FUNCTIONS
# ================================

def create_token(data: dict):
    """
    Create JWT token with expiration
    """
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_token(token: str):
    """
    Decode JWT token and extract user_id
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        user_id = payload.get("user_id")
        if user_id is None:
            return None

        return user_id

    except JWTError:
        return None
