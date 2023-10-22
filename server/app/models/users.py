from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String
from extentions import db


class Users(db.Model):
    user_name: Mapped[str] = mapped_column(
        String(255), nullable=False, primary_key=True)
    password: Mapped[str] = mapped_column(String(255), nullable=False)

    def toDict(self) -> dict[str, str]:
        return dict(userName=self.user_name, email=self.password)
