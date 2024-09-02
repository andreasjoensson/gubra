from sqlalchemy.orm import Session
from passlib.context import CryptContext
from . import models, schemas

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_todos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Todo).offset(skip).limit(limit).all()

def get_user(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(username=user.username, email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, username: str, password: str):
    user = get_user(db, username)
    if user and pwd_context.verify(password, user.hashed_password):
        return user
    return None

def create_todo(db: Session, todo: schemas.TodoCreate):
    db_todo = models.Todo(content=todo.content, due=todo.due)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo


def update_todo(db: Session, todo_id: int, done: bool):
    db_todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    db_todo.done = done
    db.commit()
    db.refresh(db_todo)
    return db_todo
