from flask import Blueprint, request, jsonify, Response
from models.users import Users
from extentions import db
from werkzeug.security import generate_password_hash, check_password_hash

users = Blueprint('users', __name__)


"""Get all userName in the db

Returns:
    JSON: a list of user names
"""


@users.get('/')
def all_users() -> Response:
    all_users: list[Users] = Users.query.all()
    return jsonify([u.user_name for u in all_users])


"""Create a user

Returns:
    Response: 200 for successful
"""


@users.post('/')
def create_user() -> Response:
    new_user = Users(user_name=request.json['userName'],
                     password=generate_password_hash(request.json['password']))
    db.session.add(new_user)
    db.session.commit()
    return Response(status=200, response="User Created")


@users.post('/login')
def login_auth() -> Response:
    user_name = request.json['userName']
    password = request.json['password']
    target_user: Users = Users.query.get(user_name)
    if (target_user != None and check_password_hash(target_user.password, password)):
        return Response(status=200, response='Successful')
    else:
        return Response(status=401, response='Failed')
