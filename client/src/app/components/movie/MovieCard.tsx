'use client';

import React, { useEffect, useState } from 'react';
import styles from './movie.module.css';
import Image from 'next/image';
import { Rating } from '@mui/material';
import Link from 'next/link';
import BookmarksBtn from '../BookmarksBtn';
import { getMovieScore } from '../../../../utils/movieUtil';

function MovieCard({ movie, isLogin, bookmarks, setBookmarks }) {
  const [score, setScore] = useState('0.0');

  useEffect(() => {
    (async () => {
      setScore(await getMovieScore(movie.movieId));
    })();
  }, [movie]);

  return (
    <div className={styles.card}>
      <Link href={`/movie/${movie.movieId}`}>
        <Image src={movie.imgUrl} alt='img' width={100} height={150} />
      </Link>
      <div className={styles.right}>
        <Link href={`/movie/${movie.movieId}`}>
          <h1>{movie.movieTitle}</h1>
        </Link>
        <p className={styles.director}>
          {`Director: ${movie.director} / Starring: ${movie.starring}`}
        </p>
        <p
          className={styles.info}
        >{`${movie.releaseDate} / ${movie.country} / ${movie.genre}`}</p>
        <div className={styles.rating}>
          <Rating
            value={score / 2}
            size='small'
            precision={0.5}
            readOnly
            className={styles.stars}
          />
          <div className={styles.score}>{score}</div>
        </div>
        <p className={styles.abstract}>{`"${movie.abstractInfo}"`}</p>
        <BookmarksBtn
          isLogin={isLogin}
          bookmarks={bookmarks}
          setBookmarks={setBookmarks}
          movie={movie}
        />
      </div>
    </div>
  );
}

export default MovieCard;