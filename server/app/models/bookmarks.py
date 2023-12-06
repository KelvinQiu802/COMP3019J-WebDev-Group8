from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, INTEGER, ForeignKey, DOUBLE, Enum
from extentions import db


class Status:
    WANNA = 'WANNA'
    WATCHED = 'WATCHED'


class Bookmarks(db.Model):
    user_name: Mapped[str] = mapped_column(
        String(255), ForeignKey('users.user_name', ondelete='cascade', onupdate='cascade'), nullable=False, primary_key=True)
    movie_id: Mapped[int] = mapped_column(
        INTEGER, ForeignKey('movies.movie_id', ondelete='cascade', onupdate='cascade'), nullable=False, primary_key=True)
    status: Mapped[str] = mapped_column(
        Enum(Status.WANNA, Status.WATCHED), nullable=False)

    def toDict(self) -> dict[str, str]:
        return dict(userName=self.user_name, movieId=self.movie_id, status=self.status)
