from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, INTEGER, ForeignKey, TEXT, DATETIME
from extentions import db
from datetime import datetime


class Comments(db.Model):
    comment_id: Mapped[int] = mapped_column(
        INTEGER, primary_key=True, autoincrement=True)
    user_name: Mapped[str] = mapped_column(
        String(255), ForeignKey('users.user_name', ondelete='cascade', onupdate='cascade'), nullable=False)
    movie_id: Mapped[int] = mapped_column(
        INTEGER, ForeignKey('movies.movie_id', ondelete='cascade', onupdate='cascade'), nullable=False)
    content: Mapped[str] = mapped_column(TEXT, nullable=False)
    time: Mapped[datetime] = mapped_column(
        DATETIME, nullable=False, default=datetime.now())

    def toDict(self) -> dict[str, str]:
        return dict(userName=self.user_name, movieId=self.movie_id, commentId=self.comment_id, content=self.content, time=self.time)
