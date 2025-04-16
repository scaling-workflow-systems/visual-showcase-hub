
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your actual domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/api/subdomain/{subdomain}")
async def get_subdomain_data(subdomain: str):
    # Example endpoint that returns different data based on subdomain
    if subdomain == "admin":
        return {"type": "admin", "features": ["dashboard", "users", "settings"]}
    elif subdomain == "app":
        return {"type": "app", "features": ["profile", "messages", "documents"]}
    else:
        return {"type": "main", "features": ["home", "about", "contact"]}
