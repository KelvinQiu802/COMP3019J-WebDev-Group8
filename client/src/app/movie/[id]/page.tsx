'use client';

import { useEffect, useState } from 'react';
import MovieInfo from '../../components/movie/MovieInfo';
import style from './page.module.css';
import YourScore from '../../components/movie/YourScore';
import BookmarksBtn from '../../components/BookmarksBtn';
import API_HOST from '../../../../utils/host';
import Comments from '../../components/comment/Comments';
import TextArea from '../../components/comment/TextArea';

async function getBookmarks(userName: string) {
  const result = await fetch(`${API_HOST}/bookmarks/${userName}`).then(
    (result) => result.json()
  );
  return result;
}

export default function Page({ params }: { params: { id: any } }) {
  const [movie, setMovie] = useState<Movie>();
  const [score, setScore] = useState(0.0);
  const [isLogin, setIsLogin] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    (async () => {
      const userName = localStorage.getItem('userName');
      if (userName) {
        setBookmarks(await getBookmarks(userName));
      }
      setIsLogin(userName ? true : false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const movie = await fetch(`${API_HOST}/movies/${params.id}`).then(
        (result) => result.json()
      );
      setMovie(movie);
    })();
  }, [params.id]);

  return (
    <div className={style.content}>
      {movie && (
        <>
          <MovieInfo movie={movie} score={score} setScore={setScore} />
          <div className={style.rate}>
            <div className={style.btns}>
              <BookmarksBtn
                isLogin={isLogin}
                bookmarks={bookmarks}
                setBookmarks={setBookmarks}
                movie={movie}
              />
            </div>
            <YourScore movie={movie} setScore={setScore} />
          </div>
          <div className={style.introtitle}>Introduction · · · · · ·</div>
          <div className={style.intro}>{movie.intro}</div>
          <div className={style.introtitle}>Comments · · · · · ·</div>
          <TextArea movie={movie} isLogin={isLogin} />
          <Comments movie={movie} isLogin={isLogin} />
          <div className={style.blank}></div>
        </>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const ids = await getAllIds();
  return ids.map((id) => ({
    id: id.toString(),
  }));
}

async function getAllIds() {
  const movieNumber = await fetch('${API_HOST}/movies/count').then((result) =>
    result.json()
  );
  const allMovies = await fetch(
    `${API_HOST}/movies?page=1&limit=${movieNumber.count}`
  ).then((result) => result.json());
  const ids: number[] = []; // Specify the type of 'ids' as number[]
  allMovies.forEach((movie: { movieId: number }) => {
    // Specify the type of 'movie' as { movieId: number }
    ids.push(movie.movieId);
  });
  return ids;
}
