from fastapi import FastAPI, HTTPException
import jwt
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from secrets import token_urlsafe
from models import LoginItem, User
from database import createUser,fetchUser

app = FastAPI()

origins = ["*"]

SECERT_KEY = token_urlsafe(32)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRES_MINUTES = 600


testUser = {
   "username": "admin",
    "password": "0000",

}

app.add_middleware(
    CORSMiddleware,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_origins=origins,
    allow_credentials=True,   
)

@app.post("/api/user/", response_model=User)
async def postUser(user: User):
    response = await createUser(user.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong")

@app.post("/login")
async def user_login(loginitem:LoginItem):
    data = jsonable_encoder(loginitem)
    response = await fetchUser(data['username'])
    if response:
        match data['username'] == response['username'] and data['password'] == response['password']:
            case True:
                print('logined')
                encodedJWT = jwt.encode(data, SECERT_KEY, algorithm=ALGORITHM)
                return {"token": encodedJWT}
            case False:
                raise HTTPException(404, f"login error")
