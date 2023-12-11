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
Endpoint                     Methods  Rule
---------------------------  -------  -------------------------------------------------------
bookmarks.add_bookmark       POST     /api/bookmarks/<user_name>/<int:movie_id>/<status>
bookmarks.delete_bookmark    DELETE   /api/bookmarks/<user_name>/<int:movie_id>
bookmarks.get_by_user        GET      /api/bookmarks/<user_name>
bookmarks.update_bookmark    PUT      /api/bookmarks/<user_name>/<int:movie_id>/<status>
comments.create              POST     /api/comments/
comments.del_comment         DELETE   /api/comments/<int:id>
comments.get_by_id           GET      /api/comments/<int:id>
comments.get_by_movie_id     GET      /api/comments/movie/<int:movie_id>
commentvotes.add_vote        POST     /api/commentvotes/<user_name>/<int:comment_id>/<status>
commentvotes.delete_vote     DELETE   /api/commentvotes/<user_name>/<int:comment_id>
commentvotes.get_by_comment  GET      /api/commentvotes/<int:comment_id>
commentvotes.update_vote     PUT      /api/commentvotes/<user_name>/<int:comment_id>/<status>
movies.add_movie             POST     /api/movies/
movies.get_by_page           GET      /api/movies/
movies.get_count             GET      /api/movies/count
movies.get_movie             GET      /api/movies/<int:id>
movies.remove_movie          DELETE   /api/movies/<int:id>
movies.update_movie          PUT      /api/movies/
scores.create_score          POST     /api/scores/<user_name>/<int:movie_id>/<score>
scores.get_by_id             GET      /api/scores/<int:movie_id>
scores.remove_score          DELETE   /api/scores/<user_name>/<int:movie_id>
scores.update_score          PUT      /api/scores/<user_name>/<int:movie_id>/<score>
static                       GET      /static/<path:filename>
users.admin_auth             GET      /api/users/auth/<user_name>
users.all_users              GET      /api/users/
users.create_user            POST     /api/users/
users.del_user               DELETE   /api/users/<user_name>
users.login_auth             POST     /api/users/login
```
