from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import your routers
from .routers import health, imaging, risk, symptoms
from .routers import biodictionary

app = FastAPI()

# Enable CORS for frontend at localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # You can use ["*"] for all origins if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router)
app.include_router(imaging.router)
#app.include_router(risk.router)
app.include_router(symptoms.router)
app.include_router(biodictionary.router)

@app.get("/")
def root():
    return {"message": "Smart Health Assistant API is running"}