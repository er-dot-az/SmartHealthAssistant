# Architecture Diagram

```
[User]
   |
[Frontend UI] (React)
   | REST API
[Backend Server] (FastAPI)
   |-- [Symptom Checker Service]
   |-- [Risk Assessment Service]
   |-- [Image Analysis Service]
   |-- [Database] (optional)
   |
[ML Models / Rule Engines]
```

- Users interact via the UI, sending data to the backend.
- Backend routes requests to appropriate services.
- Services process data (using ML models or rules) and return results.
- Results are stored and shown in the dashboard.
