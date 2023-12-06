'use client';

import React, { useEffect, useState } from 'react';
import style from './yourscore.module.css';
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';
import { getMovieScore } from '../../../../utils/movieUtil';
import API_HOST from '../../../../utils/host';

/***
 * create score record
 */
async function createScoreRecord(
  userName: string,
  movieId: number,
  score: number
) {
  await fetch(`${API_HOST}/scores/${userName}/${movieId}/${score}`, {
    method: 'POST',
  });
}

/***
 * update score record
 */
async function updateScoreRecord(
  userName: string,
  movieId: number,
  score: number
) {
  await fetch(`${API_HOST}/scores/${userName}/${movieId}/${score}`, {
    method: 'PUT',
  });
}

/***
 * delete score record
 */
async function deleteScoreRecord(userName: string, movieId: number) {
  await fetch(`${API_HOST}/scores/${userName}/${movieId}`, {
    method: 'DELETE',
  });
}

async function getScoreIfExist(userName: string, movieId: number) {
  if (!movieId) {
    return 0;
  }
  const scores = await fetch(`${API_HOST}/scores/${movieId}`).then((result) =>
    result.json()
  );
  for (let i = 0; i < scores.length; i++) {
    if (scores[i].userName == userName) {
      return scores[i].score;
    }
  }
  return 0;
}

/***
 * your score
 */
function YourScore({
  movie,
  setScore,
}: {
  movie: Movie;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isLogin, setIsLogin] = useState(false);
  const [myScore, setMyScore] = useState(0);
  const router = useRouter();

  const handleChange = async (
    e: React.ChangeEvent<{}>,
    value: number | null
  ) => {
    if (!isLogin) {
      router.push('/login');
      return;
    }
    const userName = localStorage.getItem('userName') ?? '';
    if (myScore === 0) {
      if (value !== null) {
        await createScoreRecord(userName, movie.movie_id, value);
      }
    } else if (value === null) {
      await deleteScoreRecord(userName, movie.movie_id);
    } else {
      await updateScoreRecord(userName, movie.movie_id, value);
    }
    setMyScore(value ?? 0);
    setScore(+(await getMovieScore(movie.movie_id)));
  };

  useEffect(() => {
    (async () => {
      const userName = localStorage.getItem('userName');
      setIsLogin(userName !== null);
      setMyScore(await getScoreIfExist(userName ?? '', movie.movie_id));
    })();
  }, [movie]);

  return (
    <div className={style.yourscore}>
      <span>Your Score: </span>
      <Rating
        name="no-value"
        value={myScore}
        onChange={handleChange}
        className={style.rate}
        precision={0.5}
      />
    </div>
  );
}

export default YourScore;
