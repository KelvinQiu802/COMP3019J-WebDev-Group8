from flask import Flask
from blueprints import user
from extentions import db
from db.db_config import dialect, user_name, password, host, database, port
from flask_cors import CORS


app = Flask(__name__)
app.url_map.strict_slashes = False
CORS(app)

db_url = f'{dialect}://{user_name}:{password}@{host}:{port}/{database}'
app.config["SQLALCHEMY_DATABASE_URI"] = db_url
db.init_app(app)

app.register_blueprint(user.user, url_prefix='/api/users')

# Init the DB
with app.app_context():
    db.create_all()


if __name__ == '__main__':
    app.run(debug=True, port=5001)
