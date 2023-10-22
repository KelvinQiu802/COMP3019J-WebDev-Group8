# COMP3019J WebDev Server

## Getting Started

0. Create an **virtual environment** and **activate** the env
1. Create a MySQL database called **flask**
2. Change the **user_name** and **password** in the `db.db_config.py`
3. Install the dependencies via pip
4. Run the Flask server

```shell
$ python3 -m venv .venv
> .venv\Scripts\activate (for Windows)
$ source .venv/bin/activate (for macOS)
```

```shell
% pip install -r requirements.txt
$ python3 app/app.py
```

## API Endpoints

```
Endpoint            Methods  Rule
------------------  -------  -----------------------
movies.get_by_page  GET      /api/movies/
movies.get_count    GET      /api/movies/count
movies.get_movie    GET      /api/movies/<int:id>
users.all_users     GET      /api/users/
users.create_user   POST     /api/users/
users.login_auth    POST     /api/users/login
```
