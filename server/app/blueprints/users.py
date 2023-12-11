from flask import Blueprint, request, jsonify, Response
from models.users import Users
from models.users import Role
from extentions import db
from werkzeug.security import generate_password_hash, check_password_hash
from loguru import logger

users = Blueprint('users', __name__)


"""Get all userName in the db

Returns:
    JSON: a list of user names
"""


@users.get('/')
def all_users() -> Response:
    all_users: list[Users] = Users.query.all()
    logger.success("Get All Users")
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
    logger.success("User Created. UserName[{}]", request.json['userName'])
    return Response(status=200, response="User Created")


@users.delete('/<user_name>')
def del_user(user_name) -> Response:
    to_del = Users.query.get(user_name)
    db.session.delete(to_del)
    db.session.commit()
    logger.success("User Deleted. UserName[{}]", user_name)
    return Response(status=201, response='User Deleted!')


@users.post('/login')
def login_auth() -> Response:
    user_name = request.json['userName']
    password = request.json['password']
    target_user: Users = Users.query.get(user_name)
    if (target_user != None and check_password_hash(target_user.password, password)):
        logger.success(
            "User Login Successfully. UserName[{}]", request.json['userName'])
        return Response(status=200, response='Successful')
    else:
        logger.info(
            "User Login Failed. UserName[{}]", request.json['userName']
        )
        return Response(status=401, response='Failed')


@users.get('/auth/<user_name>')
def admin_auth(user_name) -> Response:
    target: Users = Users.query.get(user_name)
    if (target.role == Role.ADMIN):
        logger.success("Admin Auth Check: User[{}] is Admin", user_name)
        return Response(status=200)  # is admin
    logger.info("Admin Auth Check: User[{}] is NOT Admin", user_name)
    return Response(status=401)
