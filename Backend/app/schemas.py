from pydantic import BaseModel
from typing import Optional

# Common fields shared across all schemas
class ProductBase(BaseModel):
    name: str
    barcode: str
    price: float
    stock: int = 0
    reorder_level: int = 5

# Used when creating a new product
class ProductCreate(ProductBase):
    pass

# Used when returning data to the frontend (includes the ID)
class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True # Allows compatibility with SQLAlchemy models
