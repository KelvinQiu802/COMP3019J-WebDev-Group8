from flask import Blueprint, request, jsonify, Response
from models.user import User
from extentions import db

user = Blueprint('user', __name__)


"""Get all userName in the db

Returns:
    JSON: a list of user names
"""


@user.get('/')
def all_users() -> Response:
    users: list[User] = User.query.all()
    return jsonify([u.user_name for u in users])


"""Create a user

Returns:
    Response: 200 for successful
"""


@user.post('/')
def create_user() -> Response:
    new_user = User(user_name=request.json['userName'],
                    password=request.json['password'])
    db.session.add(new_user)
    db.session.commit()
    return Response(status=200, response="User Created")


@user.post('/login')
def login_auth() -> Response:
    user_name = request.json['userName']
    password = request.json['password']
    target_user: User = User.query.get(user_name)
    if (target_user.password == password):
        return Response(status=200, response='Successful')
    else:
        return Response(status=401, response='Failed')
