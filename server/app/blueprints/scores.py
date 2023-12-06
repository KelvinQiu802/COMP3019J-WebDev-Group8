from flask import Blueprint, request, jsonify, Response
from models.scores import Scores
from extentions import db

scores = Blueprint('scores', __name__)


@scores.get('/<int:movie_id>')
def get_by_id(movie_id) -> Response:
    all_scores: list[Scores] = Scores.query.where(
        Scores.movie_id == movie_id).all()
    return jsonify([s.toDict() for s in all_scores])
