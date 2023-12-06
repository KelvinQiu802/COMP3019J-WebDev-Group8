from flask import Blueprint, request, jsonify, Response
from models.scores import Scores
from extentions import db

scores = Blueprint('scores', __name__)


@scores.get('/<int:movie_id>')
def get_by_id(movie_id) -> Response:
    all_scores: list[Scores] = Scores.query.where(
        Scores.movie_id == movie_id).all()
    return jsonify([s.toDict() for s in all_scores])


@scores.post('/<user_name>/<int:movie_id>/<score>')
def create_score(user_name, movie_id, score) -> Response:
    new_score = Scores(user_name=user_name,
                       movie_id=movie_id, score=float(score))
    db.session.add(new_score)
    db.session.commit()
    return Response(status=204, response='Score Created!')


@scores.put('/<user_name>/<int:movie_id>/<score>')
def update_score(user_name, movie_id, score) -> Response:
    old_score: Scores = Scores.query.where(Scores.user_name == user_name).where(
        Scores.movie_id == movie_id).first()
    old_score.score = float(score)
    db.session.commit()
    return Response(status=204, response='Score Updated!')


@scores.delete('/<user_name>/<int:movie_id>')
def remove_score(user_name, movie_id) -> Response:
    to_remove = Scores.query.where(Scores.user_name == user_name).where(
        Scores.movie_id == movie_id).first()
    db.session.delete(to_remove)
    db.session.commit()
    return Response(status=204, response='Delete Successfully!')
