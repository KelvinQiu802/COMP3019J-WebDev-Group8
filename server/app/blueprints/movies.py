from flask import Blueprint, Response, request, jsonify
from models.movies import Movies

movies = Blueprint('movies', __name__)


@movies.get('/<int:id>')
def get_movie(id) -> Response:
    movie: Movies = Movies.query.get(id)
    return jsonify(movie.to_dict())
