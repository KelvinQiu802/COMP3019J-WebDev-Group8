from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Enum
from extentions import db


class Role:
    USER = 'USER'
    ADMIN = 'ADMIN'


class Users(db.Model):
    user_name: Mapped[str] = mapped_column(
        String(255), nullable=False, primary_key=True)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(
        Enum(Role.USER, Role.ADMIN), nullable=False, default=Role.USER)

    def toDict(self) -> dict[str, str]:
        return dict(userName=self.user_name, email=self.password, role=self.role)
