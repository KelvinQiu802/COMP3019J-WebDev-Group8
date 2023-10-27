'use client';

import {useEffect, useState, Dispatch, SetStateAction} from 'react';
import styles from './movie.module.css';
import Image from 'next/image';
import {Rating} from '@mui/material';
import Link from 'next/link';
import {getMovieScore} from '../../../../utils/movieUtil';

/* Define the interface for props used in the MovieCard component */
interface Props {
    movie: Movie;
    isLogin: boolean;
    bookmarks: Bookmark[];
    setBookmarks: Dispatch<SetStateAction<Bookmark[]>>;
}

/* MovieCard component definition */
function MovieCard({movie, isLogin, bookmarks, setBookmarks}: Props) {
    const [score, setScore] = useState('0.0');

    useEffect(() => {
        (async () => {
            setScore(await getMovieScore(movie.movie_id));
        })();
    }, [movie]);

    return (
        <div className={styles.card}>
            <Link href={`/movie/${movie.movie_id}`}>
                <Image src={movie.img_url} alt="img" width={100} height={150}/>
            </Link>
            <div className={styles.right}>
                <Link href={`/movie/${movie.movie_id}`}>
                    <h1>{movie.movie_title}</h1>
                </Link>
                <p className={styles.director}>
                    {`Director: ${movie.directors} / Starring: ${movie.starring}`}
                </p>
                <p
                    className={styles.info}
                >{`${movie.release_date} / ${movie.country} / ${movie.genre}`}</p>
                <div className={styles.rating}>
                    <Rating
                        value={parseFloat(score) / 2}
                        size="small"
                        precision={0.5}
                        readOnly
                        className={styles.stars}
                    />
                    <div className={styles.score}>{score}</div>
                </div>
                <p className={styles.abstract}>{`"${movie.abstract}"`}</p>
                {/* <BookmarksBtn
          isLogin={isLogin}
          bookmarks={bookmarks}
          setBookmarks={setBookmarks}
          movie={movie}
        /> */}
            </div>
        </div>
    );
}

export default MovieCard;
