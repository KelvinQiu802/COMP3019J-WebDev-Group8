from flask import Blueprint, Response, request, jsonify
from models.movies import Movies

movies = Blueprint('movies', __name__)


"""Get movie by ID

Returns:
    JSON: target movie
"""


@movies.get('/<int:id>')
def get_movie(id) -> Response:
    movie: Movies = Movies.query.get(id)
    return jsonify(movie.to_dict())


"""Get the count of movies

Returns:
    JSON: {"count": count} 
"""


@movies.get('/count')
def get_count() -> Response:
    count = Movies.query.count()
    return jsonify({"count": count})


"""Get movies by page and limit

Returns:
    JSON: list of movies
"""


@movies.get('/')
def get_by_page() -> Response:
    page = int(request.args['page'])
    limit = int(request.args['limit'])
    all_movies: list[Movies] = Movies.query.offset(
        (page - 1) * limit).limit(limit)
    return jsonify([m.to_dict() for m in all_movies])
