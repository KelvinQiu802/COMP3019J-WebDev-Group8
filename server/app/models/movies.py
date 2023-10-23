from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, BIGINT, TEXT, DOUBLE
from extentions import db


class Movies(db.Model):
    movie_id: Mapped[int] = mapped_column(BIGINT, primary_key=True)
    country: Mapped[str] = mapped_column(String(1024))
    intro: Mapped[str] = mapped_column(TEXT)
    movie_title: Mapped[str] = mapped_column(String(1024))
    starring: Mapped[str] = mapped_column(String(1024))
    language: Mapped[str] = mapped_column(String(1024))
    directors: Mapped[str] = mapped_column(String(1024))
    runtime: Mapped[str] = mapped_column(String(1024))
    release_date: Mapped[str] = mapped_column(String(1024))
    genre: Mapped[str] = mapped_column(String(1024))
    img_url: Mapped[str] = mapped_column(String(1024))
    abstract: Mapped[str] = mapped_column(String(1024))
    score: Mapped[float] = mapped_column(DOUBLE)

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
