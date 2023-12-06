from flask import Flask
from blueprints import users, movies, scores, bookmarks, comments
from extentions import db
from db.db_config import dialect, user_name, password, host, database, port
from flask_cors import CORS


app = Flask(__name__)
app.url_map.strict_slashes = False
CORS(app)

db_url = f'{dialect}://{user_name}:{password}@{host}:{port}/{database}'
app.config["SQLALCHEMY_DATABASE_URI"] = db_url
db.init_app(app)

app.register_blueprint(users.users, url_prefix='/api/users')
app.register_blueprint(movies.movies, url_prefix='/api/movies')
app.register_blueprint(scores.scores, url_prefix='/api/scores')
app.register_blueprint(bookmarks.bookmarks, url_prefix='/api/bookmarks')
app.register_blueprint(comments.comments, url_prefix='/api/comments')

# Init the DB
with app.app_context():
    db.create_all()


if __name__ == '__main__':
    app.run(debug=True, port=5001)
