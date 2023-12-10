from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, BIGINT, TEXT, DOUBLE
from extentions import db


class Movies(db.Model):
    movie_id: Mapped[int] = mapped_column(
        BIGINT, primary_key=True, autoincrement=True)
    country: Mapped[str] = mapped_column(String(1024), nullable=False)
    intro: Mapped[str] = mapped_column(TEXT, nullable=False)
    movie_title: Mapped[str] = mapped_column(String(1024), nullable=False)
    starring: Mapped[str] = mapped_column(String(1024), nullable=False)
    language: Mapped[str] = mapped_column(String(1024), nullable=False)
    directors: Mapped[str] = mapped_column(String(1024), nullable=False)
    runtime: Mapped[str] = mapped_column(String(1024), nullable=False)
    release_date: Mapped[str] = mapped_column(String(1024), nullable=False)
    genre: Mapped[str] = mapped_column(String(1024), nullable=False)
    img_url: Mapped[str] = mapped_column(String(1024), nullable=False)
    abstract: Mapped[str] = mapped_column(String(1024), nullable=False)
    score: Mapped[float] = mapped_column(DOUBLE, default=0, nullable=False)

    def to_dict(self) -> dict:
        return dict(movie_id=self.movie_id,
                    country=self.country,
                    intro=self.intro,
                    movie_title=self.movie_title,
                    starring=self.starring,
                    language=self.language,
                    directedBy=self.directors,
                    runtime=self.runtime,
                    release_date=self.release_date,
                    genre=self.genre,
                    img_url=self.img_url,
                    abstract=self.abstract,
                    score=self.score)
