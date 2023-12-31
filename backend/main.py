from fastapi import FastAPI, HTTPException
import jwt
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from models import LoginItem, User, Link
from passlib.hash import sha256_crypt
from dependencies import *
from database.user import UserDB
from database.link import LinkDB

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_origins=origins,
    allow_credentials=True,
)


@app.post("/userRegister/", response_model=User)
async def addUser(user: User):
    if not UserDB.fetchUser(user.username):
        user.password = sha256_crypt.hash(user.password)
        UserDB.addUser(user.dict())
        return user
    raise HTTPException(400, "This user already exists.")


@app.post("/login")
async def login(loginitem: LoginItem):
    data = jsonable_encoder(loginitem)
    response = UserDB.fetchUser(data["username"])
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


@app.post("/addLink", response_model=Link)
async def addLink(link: Link):
    LinkDB.addLink(link.dict())


@app.delete("/deleteLink/{text}")
async def deleteLink(text):
    LinkDB.deleteLink(text)


@app.get("/fetchLinks/{username}")
async def fetchLinks(username):
    response = LinkDB.fetchLink(username)
    if response:
        links = []
        for i in response:
            del i["_id"]
            links.append(i)
        return links
    raise HTTPException(404, f"data not found")
