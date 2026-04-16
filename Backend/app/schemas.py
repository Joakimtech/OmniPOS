from pydantic import BaseModel
from typing import Optional

class ProductBase(BaseModel):
    name: str
    barcode: str
    price: float
    stock: int

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True