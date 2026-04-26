from sqlalchemy import Column, Integer, String, Float
from app.db.database import Base
from sqlalchemy import ForeignKey

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    price = Column(Float)
    quantity = Column(Integer)
    user_id = Column(Integer, ForeignKey("users.id"))

