from flask import Blueprint, request, jsonify, Response
from models.comments import Comments
from extentions import db
from loguru import logger

comments = Blueprint('comments', __name__)


@comments.get('/<int:id>')
def get_by_id(id) -> Response:
    target: Comments = Comments.query.get(id)
    if (target == None):
        logger.warning("Comment ID: {} Not Found", id)
        return Response(status=404, response='Comment Not Found')
    logger.success("Get Comment by ID: {}", id)
    return target.toDict()


@comments.get('/movie/<int:movie_id>')
def get_by_movie_id(movie_id) -> Response:
    all_comments: list[Comments] = Comments.query.where(
        Comments.movie_id == movie_id).all()
    logger.success("Get Comments by Movie ID: {}", movie_id)
    return jsonify([c.toDict() for c in all_comments])


@comments.post('/')
def create() -> Response:
    new_comment = Comments(
        user_name=request.json['userName'], movie_id=request.json['movieId'], content=request.json['content'])
    db.session.add(new_comment)
    db.session.commit()
    logger.success("Create New Comment for Movie ID: {}, UserName: {}, Content: {}",
                   request.json['movieId'], request.json['userName'], request.json['content'])
    return Response(status=204, response='New Comment Created!')


@comments.delete('/<int:id>')
def del_comment(id) -> Response:
    to_del = Comments.query.get(id)
    db.session.delete(to_del)
    db.session.commit()
    logger.success("Delete Comment by ID: {}", id)
    return Response(status=204, response='Comment Deleted!')
