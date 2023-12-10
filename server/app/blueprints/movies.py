from flask import Blueprint, Response, request, jsonify
from models.movies import Movies
from extentions import db

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


@movies.delete('/<int:id>')
def remove_movie(id) -> Response:
    to_del = Movies.query.get(id)
    db.session.delete(to_del)
    db.session.commit()
    return Response(status=201, response='Movie Deleted!')


@movies.put('/')
def update_movie() -> Response:
    to_update: Movies = Movies.query.get(request.json['movie_id'])
    to_update.abstract = request.json['abstract']
    to_update.country = request.json['country']
    to_update.directors = request.json['directedBy']
    to_update.genre = request.json['genre']
    to_update.img_url = request.json['img_url']
    to_update.intro = request.json['intro']
    to_update.language = request.json['language']
    to_update.movie_title = request.json['movie_title']
    to_update.release_date = request.json['release_date']
    to_update.runtime = request.json['runtime']
    to_update.starring = request.json['starring']
    db.session.commit()
    return Response(status=201, response='Movie Updated!')


@movies.post('/')
def add_movie() -> Response:
    new_movie = Movies(**request.json)
    db.session.add(new_movie)
    db.session.commit()
    return Response(status=201, response='Movie Added!')
