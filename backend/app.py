from fastapi import FastAPI, HTTPException
import jwt
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from secrets import token_urlsafe
from models import LoginItem, User
from database import createUser,fetchUser
from passlib.hash import sha256_crypt
app = FastAPI()

origins = ["*"]

SECERT_KEY = token_urlsafe(32)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRES_MINUTES = 600


app.add_middleware(
    CORSMiddleware,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_origins=origins,
    allow_credentials=True,   
)

@app.post("/userRegister/", response_model=User)
async def userRegister(user: User):
    userCheck = await fetchUser(user.username)
    if not userCheck:
        user.password = sha256_crypt.hash(user.password)
        return await createUser(user.dict())
    raise HTTPException(400, "This user already exists.")

@app.post("/login")
async def login(loginitem:LoginItem):
    data = jsonable_encoder(loginitem)
    response = await fetchUser(data['username'])
    if response:
        match data['username'] == response['username']:
            case True:
                match sha256_crypt.verify(data['password'], response['password']):
                    case True:
                        encodedJWT = jwt.encode(data, SECERT_KEY, algorithm=ALGORITHM)
                        return {"token": encodedJWT}
                    case False:
                        raise HTTPException(404, f"wrong password")
    raise HTTPException(404, f"user not found")
