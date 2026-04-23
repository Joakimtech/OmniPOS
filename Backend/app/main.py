from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas
from database import SessionLocal, engine

# Create the database tables on startup
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# --- CORS Middleware (The Network Bridge) ---
# This allows your Frontend and Mobile devices to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {"status": "OmniPOS Backend is Live", "database": "Connected"}

# CREATE: Add a new product to the database
@app.post("/products/")
def create_or_update_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    # Check if barcode exists in DB
    existing = db.query(models.Product).filter(models.Product.barcode == product.barcode).first()
    if existing:
        existing.stock += 1
        db.commit()
        return existing
    
    # Otherwise create new
    new_p = models.Product(**product.dict())
    db.add(new_p)
    db.commit()
    return new_p
# READ: Get all products
@app.get("/products/", response_model=list[schemas.Product])
def read_products(db: Session = Depends(get_db)):
    return db.query(models.Product).all()
