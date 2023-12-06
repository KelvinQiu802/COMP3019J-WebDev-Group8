from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, INTEGER, ForeignKey, DOUBLE
from extentions import db


class Scores(db.Model):
    user_name: Mapped[str] = mapped_column(
        String(255), ForeignKey('users.user_name', ondelete='cascade', onupdate='cascade'), nullable=False, primary_key=True)
    movie_id: Mapped[int] = mapped_column(
        INTEGER, ForeignKey('movies.movie_id', ondelete='cascade', onupdate='cascade'), nullable=False, primary_key=True
    )
    score: Mapped[float] = mapped_column(
        DOUBLE, nullable=False
    )

    def toDict(self) -> dict[str, str]:
        return dict(userName=self.user_name, movieId=self.movie_id, score=self.score)
