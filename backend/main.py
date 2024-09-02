from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from sql_app import crud, models, schemas, auth
from sql_app.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.post("/register", response_model=schemas.User)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db, user)

@app.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/todos")
def read_todos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db),current_user: schemas.User = Depends(auth.get_current_user)):
    todos = crud.get_todos(db, skip, limit)
    return todos


@app.post("/todos")
def create_todo(todo: schemas.TodoCreate, db: Session = Depends(get_db), current_user: schemas.User = Depends(auth.get_current_user)):
    db_todo = crud.create_todo(db, todo)
    return db_todo


@app.put("/todos/{todo_id}")
def update_todo(todo_id: int, done: bool, db: Session = Depends(get_db), current_user: schemas.User = Depends(auth.get_current_user)):
    print(todo_id, done)
    db_todo = crud.update_todo(db, todo_id, done)
    return db_todo

