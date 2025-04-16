
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, validator
import re

app = FastAPI()

# Updated CORS configuration to handle all domains including subdomains
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, you might want to be more specific
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SignUpRequest(BaseModel):
    email: EmailStr
    cardNumber: str
    expiry: str
    cvc: str
    plan: str = "Free"
    
    @validator('cardNumber')
    def validate_card_number(cls, v):
        v = v.replace(' ', '')
        if not v.isdigit() or len(v) < 13 or len(v) > 19:
            raise ValueError('Invalid card number')
        return v
    
    @validator('expiry')
    def validate_expiry(cls, v):
        pattern = r'^(0[1-9]|1[0-2])\/([0-9]{2})$'
        if not re.match(pattern, v):
            raise ValueError('Invalid expiry date. Format should be MM/YY')
        return v
    
    @validator('cvc')
    def validate_cvc(cls, v):
        if not v.isdigit() or len(v) < 3 or len(v) > 4:
            raise ValueError('Invalid CVC')
        return v

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

@app.post("/api/signup")
async def signup(request: SignUpRequest):
    try:
        # Here you would typically:
        # 1. Process the payment through Stripe or another payment processor
        # 2. Create a user account
        # 3. Store subscription information
        
        # For now, we'll just return a success response
        print(f"Signup request received: Email={request.email}, Plan={request.plan}")
        
        return {
            "status": "success",
            "message": f"Successfully signed up for {request.plan} plan",
            "user": {
                "email": request.email,
                "plan": request.plan
            }
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
