from flask import Blueprint, request, jsonify, Response
from models.bookmarks import Bookmarks
from extentions import db
from loguru import logger

bookmarks = Blueprint('bookmarks', __name__)


@bookmarks.get('/<user_name>')
def get_by_user(user_name) -> Response:
    all_bookmarks: list[Bookmarks] = Bookmarks.query.where(
        Bookmarks.user_name == user_name).all()
    logger.success("Get Bookmakrs for User: {}", user_name)
    return jsonify([bm.toDict() for bm in all_bookmarks])


@bookmarks.post('/<user_name>/<int:movie_id>/<status>')
def add_bookmark(user_name, movie_id, status) -> Response:
    new_bm = Bookmarks(user_name=user_name, movie_id=movie_id, status=status)
    db.session.add(new_bm)
    db.session.commit()
    logger.success("Add New Bookmakrs to User: {}, MovieId: {}, Status: {}",
                   user_name, movie_id, status)
    return Response(status=204, response='Bookmark Added!')


@bookmarks.put('/<user_name>/<int:movie_id>/<status>')
def update_bookmark(user_name, movie_id, status) -> Response:
    old_bm = Bookmarks.query.where(Bookmarks.user_name == user_name).where(
        Bookmarks.movie_id == movie_id).first()
    old_bm.status = status
    db.session.commit()
    logger.success("Update Bookmakrs for User: {}, MovieId: {}, Status: {}",
                   user_name, movie_id, status)
    return Response(status=204, response='Bookmark Updated!')


@bookmarks.delete('/<user_name>/<int:movie_id>')
def delete_bookmark(user_name, movie_id) -> Response:
    to_del = Bookmarks.query.where(Bookmarks.user_name == user_name).where(
        Bookmarks.movie_id == movie_id).first()
    db.session.delete(to_del)
    db.session.commit()
    logger.success("Delete Bookmakrs for User: {}, MovieId: {}, Status: {}",
                   user_name, movie_id)
    return Response(status=204, response='Bookmark Deleted!')
