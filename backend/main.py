from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import init_db
from .models import User, Task
from .api import tasks, auth, users

app = FastAPI(
    title="Todo API",
    description="A simple Todo API using FastAPI, SQLModel, and Neon PostgreSQL",
    version="0.1.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo API. Visit /docs for documentation."}

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(tasks.router)
