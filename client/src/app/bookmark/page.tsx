'use client';

import React, { useEffect, useState } from 'react';
import style from './page.module.css';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import STATUS from '../../../utils/bookmarkStatus';
import MovieCard from '../components/movie/MovieCard';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

async function getBookmarks(userName: string) {
  const result = await fetch(`${API_HOST}/bookmarks/${userName}`).then(
    (result) => result.json()
  );
  return result;
}

async function getMovieById(id: number) {
  const result = await fetch(`${API_HOST}/movies/${id}`).then((result) =>
    result.json()
  );
  return result;
}

export default function Page() {
  const [isLogin, setIsLogin] = useState(true);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [wanna, setWanna] = useState<any[]>([]);
  const [watched, setWatched] = useState<any[]>([]);
  const router = useRouter();

  const wannaMarks = bookmarks.filter((mark) => mark.status == STATUS.WANNA);
  const watchedMarks = bookmarks.filter(
    (mark) => mark.status == STATUS.WATCHED
  );

  useEffect(() => {
    (async () => {
      const userName = localStorage.getItem('userName');
      if (userName) {
        setBookmarks(await getBookmarks(userName));
      }
      setIsLogin(!!userName);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const promisesWanna = wannaMarks.map((mark) =>
        getMovieById(mark.movieId)
      );
      const promisesWatched = watchedMarks.map((mark) =>
        getMovieById(mark.movieId)
      );
      setWanna(await Promise.all(promisesWanna));
      setWatched(await Promise.all(promisesWatched));
    })();
  }, [bookmarks]);

  return (
    <div className={style.content}>
      {isLogin ? (
        <div className={style.logined}>
          <h1 className={style.category}>Want to Watch: </h1>
          {wanna.map((movie) => (
            <MovieCard
              key={movie.movieId}
              movie={movie}
              isLogin={true}
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
            />
          ))}
          <h1 className={style.category}>Already Watched: </h1>
          {watched.map((movie) => (
            <MovieCard
              key={movie.movieId}
              movie={movie}
              isLogin={true}
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
            />
          ))}
        </div>
      ) : (
        <div className={style.notlogin}>
          <h1>Please log in to check your bookmarks!</h1>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => router.push('/login')}
          >
            To Login
          </Button>
        </div>
      )}
    </div>
  );
}
