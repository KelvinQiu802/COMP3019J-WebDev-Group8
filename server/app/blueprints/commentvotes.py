from flask import Blueprint, request, jsonify, Response
from models.commentvotes import Commentvotes
from extentions import db
from loguru import logger

commentvotes = Blueprint('commentvotes', __name__)


@commentvotes.get('/<int:comment_id>')
def get_by_comment(comment_id) -> Response:
    all_votes: list[Commentvotes] = Commentvotes.query.where(
        Commentvotes.comment_id == comment_id).all()
    logger.success('Get Votes by Coment ID: {}', comment_id)
    return jsonify([v.toDict() for v in all_votes])


@commentvotes.post('/<user_name>/<int:comment_id>/<status>')
def add_vote(user_name, comment_id, status) -> Response:
    new_vote = Commentvotes(user_name=user_name,
                            comment_id=comment_id, status=status)
    db.session.add(new_vote)
    db.session.commit()
    logger.success("Add Vote for Comment ID: {}, UserName: {}, Status: {}",
                   comment_id, user_name, status)
    return Response(status=201, response='New Vote Added!')


@commentvotes.put('/<user_name>/<int:comment_id>/<status>')
def update_vote(user_name, comment_id, status) -> Response:
    old_vote: Commentvotes = Commentvotes.query.where(Commentvotes.user_name == user_name).where(
        Commentvotes.comment_id == comment_id).first()
    old_vote.status = status
    db.session.commit()
    logger.success("Update Vote for Comment ID: {}, UserName: {}, Status: {}",
                   comment_id, user_name, status)
    return Response(status=201, response='Vote Updated!')


@commentvotes.delete('/<user_name>/<int:comment_id>')
def delete_vote(user_name, comment_id) -> Response:
    to_del: Commentvotes = Commentvotes.query.where(Commentvotes.user_name == user_name).where(
        Commentvotes.comment_id == comment_id).first()
    db.session.delete(to_del)
    db.session.commit()
    logger.success("Delete Vote for Comment ID: {}, UserName: {}",
                   comment_id, user_name)
    return Response(status=201, response='Vote Deleted!')
