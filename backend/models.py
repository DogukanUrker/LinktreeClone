from pydantic import BaseModel
from typing import Optional

class LoginItem(BaseModel):
    username: str
    password: str

class User(BaseModel):
    username: str
    email: str
    password: str
    links: Optional[list]