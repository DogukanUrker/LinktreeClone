from pydantic import BaseModel


class LoginItem(BaseModel):
    username: str
    password: str


class Link(BaseModel):
    author: str
    link: str
    text: str
    bgColor: str
    textColor: str


class User(BaseModel):
    username: str
    email: str
    password: str
