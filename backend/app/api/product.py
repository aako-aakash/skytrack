from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from sqlalchemy import or_

from app.db.database import SessionLocal
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductResponse
from app.api.deps import get_current_user

router = APIRouter(prefix="/products", tags=["Products"])


# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


#  GET ALL PRODUCTS + SEARCH + PAGINATION
@router.get("/", response_model=List[ProductResponse])
def get_products(
    search: str = Query(None),
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db),
    user: str = Depends(get_current_user)
):
    query = db.query(Product)

    if search:
        query = query.filter(
            or_(
                Product.name.ilike(f"%{search}%"),
                Product.description.ilike(f"%{search}%")
            )
        )

    products = query.offset(skip).limit(limit).all()
    return products


# GET PRODUCT BY ID
@router.get("/{id}", response_model=ProductResponse)
def get_product_by_id(
    id: int,
    db: Session = Depends(get_db),
    user: str = Depends(get_current_user)
):
    product = db.query(Product).filter(Product.id == id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product


#  CREATE PRODUCT
@router.post("/", response_model=ProductResponse)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    user: str = Depends(get_current_user)
):
    new_product = Product(**product.model_dump())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


#  UPDATE PRODUCT
@router.put("/{id}", response_model=ProductResponse)
def update_product(
    id: int,
    product: ProductCreate,
    db: Session = Depends(get_db),
    user: str = Depends(get_current_user)
):
    db_product = db.query(Product).filter(Product.id == id).first()

    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    for key, value in product.model_dump().items():
        setattr(db_product, key, value)

    db.commit()
    db.refresh(db_product)

    return db_product


# DELETE PRODUCT
@router.delete("/{id}")
def delete_product(
    id: int,
    db: Session = Depends(get_db),
    user: str = Depends(get_current_user)
):
    db_product = db.query(Product).filter(Product.id == id).first()

    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(db_product)
    db.commit()

    return {"message": "Product deleted successfully"}
