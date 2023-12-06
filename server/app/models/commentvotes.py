from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, INTEGER, ForeignKey, DOUBLE, Enum
from extentions import db


class Status:
    UP = 'UP'
    DOWN = 'DOWN'


class Commentvotes(db.Model):
    user_name: Mapped[str] = mapped_column(
        String(255), ForeignKey('users.user_name', ondelete='cascade', onupdate='cascade'), nullable=False, primary_key=True)
    comment_id: Mapped[int] = mapped_column(
        INTEGER, ForeignKey('comments.comment_id', ondelete='cascade', onupdate='cascade'), nullable=False, primary_key=True)
    status: Mapped[str] = mapped_column(
        Enum(Status.UP, Status.DOWN), nullable=False)

    def toDict(self) -> dict[str, str]:
        return dict(userName=self.user_name, commentId=self.comment_id, status=self.status)
