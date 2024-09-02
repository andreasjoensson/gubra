from datetime import datetime
from pydantic import BaseModel


class TodoBase(BaseModel):
    content: str
    due: datetime


class TodoCreate(TodoBase):
    pass


class Todo(TodoBase):
    id: int
    done: bool = False

    class config:
        orm_mode = True


class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    username: str
    password: str