import os
from sqlmodel import create_engine, SQLModel, Session
from dotenv import load_dotenv

# Load .env from the root directory (one level up from this file) or current directory
load_dotenv()
# Also try loading from the current file's directory if run differently
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

DATABASE_URL = os.getenv("DATABASE_URL")

# Neon requires sslmode=require for connections
if DATABASE_URL:
    if "postgresql" in DATABASE_URL and "sslmode" not in DATABASE_URL:
        if "?" in DATABASE_URL:
            DATABASE_URL += "&sslmode=require"
        else:
            DATABASE_URL += "?sslmode=require"
    engine = create_engine(DATABASE_URL, echo=True)
else:
    # Fallback for testing or initialization if DATABASE_URL is not set
    engine = create_engine("sqlite:///", echo=True)

def init_db():
    print(f"Creating tables for metadata: {SQLModel.metadata.tables.keys()}")
    SQLModel.metadata.create_all(engine)
    print("Tables created.")

def get_session():
    with Session(engine) as session:
        yield session
