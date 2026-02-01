# Backend - API Service

This is a Python-based backend using **FastAPI**. unlike the frontend, it does not use `npm`.

## Prerequisites

- Python 3.8+
- pip

## Setup

1.  **Create a virtual environment** (optional but recommended):
    ```bash
    python -m venv venv
    # Windows
    .\venv\Scripts\activate
    # Mac/Linux
    source venv/bin/activate
    ```

2.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

## Running the Server

Run this command from the **project root** (`Phase2/`):

```bash
uvicorn backend.main:app --reload
```

## Running Tests

```bash
pytest
```
