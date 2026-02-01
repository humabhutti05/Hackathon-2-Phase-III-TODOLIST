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

def test_update_task(client: TestClient):
    response = client.post("/tasks/", json={"title": "Original Title"})
    task_id = response.json()["id"]
    
    response = client.patch(f"/tasks/{task_id}", json={"title": "Updated Title", "is_completed": True})
    data = response.json()
    assert response.status_code == 200
    assert data["title"] == "Updated Title"
    assert data["is_completed"] is True

def test_update_task_partial(client: TestClient):
    response = client.post("/tasks/", json={"title": "Original Title", "description": "Original Desc"})
    task_id = response.json()["id"]
    
    response = client.patch(f"/tasks/{task_id}", json={"is_completed": True})
    data = response.json()
    assert response.status_code == 200
    assert data["title"] == "Original Title"
    assert data["description"] == "Original Desc"
    assert data["is_completed"] is True

def test_delete_task(client: TestClient):
    response = client.post("/tasks/", json={"title": "To Delete"})
    task_id = response.json()["id"]
    
    response = client.delete(f"/tasks/{task_id}")
    assert response.status_code == 200
    assert response.json() == {"ok": True}
    
    response = client.get(f"/tasks/{task_id}")
    assert response.status_code == 404
