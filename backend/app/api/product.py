from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.product import Product
from app.schemas.product import ProductCreate
from app.api.deps import get_current_user

router = APIRouter(
     tags=["Products"]
)


@router.post("/products/")
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    new_product = Product(
        name=product.name,
        description=product.description,
        price=product.price,
        quantity=product.quantity,
        user_id=current_user.id
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


@router.get("/products/")
def get_products(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return db.query(Product).filter(
        Product.user_id == current_user.id
    ).all()


@router.get("/products/{id}")
def get_product(
    id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    product = db.query(Product).filter(
        Product.id == id,
        Product.user_id == current_user.id
    ).first()

    if not product:
        raise HTTPException(status_code=404, detail="Not found")

    return product


@router.put("/products/{id}")
def update_product(
    id: int,
    updated: ProductCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    product = db.query(Product).filter(
        Product.id == id,
        Product.user_id == current_user.id
    ).first()

    if not product:
        raise HTTPException(status_code=404, detail="Not found")

    product.name = updated.name
    product.description = updated.description
    product.price = updated.price
    product.quantity = updated.quantity

    db.commit()
    return product


@router.delete("/products/{id}")
def delete_product(
    id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    product = db.query(Product).filter(
        Product.id == id,
        Product.user_id == current_user.id
    ).first()

    if not product:
        raise HTTPException(status_code=404, detail="Not found")

    db.delete(product)
    db.commit()

    return {"message": "Product Deleted !"}
