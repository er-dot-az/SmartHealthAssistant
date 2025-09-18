# SmartHealthAssistant Architecture Diagram

```mermaid
flowchart TD
   User[User]
   Frontend[React Frontend]
   Backend[FastAPI Backend]
   OpenAI[Azure OpenAI (RAG, GPT-4.1)]
   BioGPT[BioGPT (Hugging Face)]
   Imaging[MedImageInsight]
   KeyVault[Azure Key Vault]
   HealthcareSites[Healthcare Sites]

   User --> Frontend
   Frontend --> Backend
   Backend --> OpenAI
   Backend --> BioGPT
   Backend --> MedImagagingInsight
   Backend --> KeyVault
   Backend --> HealthcareSites

   subgraph Deployment
      AKS[Azure AKS (Kubernetes)]
      Docker[Docker Containers]
   end
   Backend --> AKS
   Frontend --> AKS
   AKS --> Docker
```

**Components:**
- User: End user (patient, clinician)
- React Frontend: UI for symptom input, context selection, image upload
- FastAPI Backend: REST APIs for all features
- Azure OpenAI: RAG, GPT-4 for chat and context
- BioGPT: Biomedical NLP
- Azure ML Imaging Model: Medical image analysis
- Azure Key Vault: Secure secrets management
- Healthcare Sites: External reputable sources
- Azure AKS: Orchestrates containers
- Docker: Containerization for backend/frontend
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
