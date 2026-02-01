import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine
from sqlmodel.pool import StaticPool
from ..main import app
from ..database import get_session

# Setup in-memory SQLite for testing
sqlite_url = "sqlite://"
engine = create_engine(
    sqlite_url,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

def override_get_session():
    with Session(engine) as session:
        yield session

app.dependency_overrides[get_session] = override_get_session

@pytest.fixture(name="client")
def client_fixture():
    SQLModel.metadata.create_all(engine)
    with TestClient(app) as client:
        yield client
    SQLModel.metadata.drop_all(engine)

def test_create_task(client: TestClient):
    response = client.post("/tasks/", json={"title": "Test Task", "description": "Test Description"})
    data = response.json()
    assert response.status_code == 201
    assert data["title"] == "Test Task"
    assert data["description"] == "Test Description"
    assert data["is_completed"] is False
    assert "id" in data

def test_read_tasks(client: TestClient):
    client.post("/tasks/", json={"title": "Task 1"})
    client.post("/tasks/", json={"title": "Task 2"})
    
    response = client.get("/tasks/")
    data = response.json()
    assert response.status_code == 200
    assert len(data) == 2
    assert data[0]["title"] == "Task 1"
    assert data[1]["title"] == "Task 2"

def test_read_task_by_id(client: TestClient):
    response = client.post("/tasks/", json={"title": "Specific Task"})
    task_id = response.json()["id"]
    
    response = client.get(f"/tasks/{task_id}")
    assert response.status_code == 200
    assert response.json()["title"] == "Specific Task"

def test_read_task_not_found(client: TestClient):
    response = client.get("/tasks/999")
    assert response.status_code == 404
