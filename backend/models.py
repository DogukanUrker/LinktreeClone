from pydantic import BaseModel

class LoginItem(BaseModel):
    username: str
    password: str

class User(BaseModel):
    username: str
    email: str
    password: str