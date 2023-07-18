from fastapi import FastAPI, HTTPException
import jwt
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from secrets import token_urlsafe
from models import LoginItem, User, Link
from passlib.hash import sha256_crypt
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

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


client = MongoClient("mongodb://localhost:27017/", server_api=ServerApi("1"))
db = client.LinktreeClone
colUsers = db.user
colLinks = db.link


@app.post("/userRegister/", response_model=User)
async def userRegister(user: User):
    if not colUsers.find_one({"username": user.username}):
        user.password = sha256_crypt.hash(user.password)
        return colUsers.insert_one(user.dict())
    raise HTTPException(400, "This user already exists.")


@app.post("/login")
async def login(loginitem: LoginItem):
    data = jsonable_encoder(loginitem)
    response = colUsers.find_one({"username": data["username"]})
    if response:
        match data["username"] != "edit":
            case True:
                match data["username"] == response["username"]:
                    case True:
                        match sha256_crypt.verify(
                            data["password"], response["password"]
                        ):
                            case True:
                                encodedJWT = jwt.encode(
                                    data, SECERT_KEY, algorithm=ALGORITHM
                                )
                                return {"token": encodedJWT, "user": data["username"]}
                            case False:
                                raise HTTPException(404, f"wrong password")
            case False:
                raise HTTPException(404, f"user name cant be 'edit' ")
    raise HTTPException(404, f"user not found")


@app.put("/addLink", response_model=Link)
async def addLink(link: Link):
    colLinks.insert_one(link.dict())


@app.get("/fetchLinks/{username}")
async def fetchLinks(username):
    response = colLinks.find({"author": username})
    data = []
    for i in response:
        del i["_id"]
        data.append(dict(i))
    if data:
        return data
    raise HTTPException(404, f"data not found")
