from pydantic import BaseModel
from typing import Optional


class LoginItem(BaseModel):
    username: str
    password: str


class Link(BaseModel):
    author: str
    link: str
    bgColor: str
    textColor: str


class User(BaseModel):
    username: str
    email: str
    password: str
