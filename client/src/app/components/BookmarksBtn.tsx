import React from 'react';
import styles from './bookmarkbtn.module.css';
import Link from 'next/link';
import STATUS from '../../../utils/bookmarkStatus';

function includeMovie(list:{ movieId: number }[], id: number) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].movieId == id) {
      return true;
    }
  }
  return false;
}

async function getBookmarks(userName: String) {
  const result = await fetch(
    `http://localhost:7070/api/bookmarks/${userName}`
  ).then((result) => result.json());
  return result;
}

function BookmarksBtn({isLogin}:{isLogin:boolean}, bookmarks: {movieId:number, status: string}[], setBookmarks: (bookmarks: {movieId:number, status: string}[])=>void, movie:{movieId:number,title:string} ) {
  const watched = bookmarks.filter((mark) => mark.status == STATUS.WATCHED);
  const wanna = bookmarks.filter((mark) => mark.status == STATUS.WANNA);
  const isWanna = includeMovie(wanna, movie.movieId);
  const isWatched = includeMovie(watched, movie.movieId);

  const handleWannaWatch = async () => {
    const userName = localStorage.getItem('userName') as  string;
    if (!isWanna && !isWatched) {
      // create new bookmark
      await fetch(
        `http://localhost:7070/api/bookmarks/${userName}/${movie.movieId}/${STATUS.WANNA}`,
        { method: 'POST' }
      );
    } else if (!isWanna && isWatched) {
      // update status
      await fetch(
        `http://localhost:7070/api/bookmarks/${userName}/${movie.movieId}/${STATUS.WANNA}`,
        { method: 'PUT' }
      );
    } else if (isWanna && !isWatched) {
      // delete bookmark
      await fetch(
        `http://localhost:7070/api/bookmarks/${userName}/${movie.movieId}`,
        { method: 'DELETE' }
      );
    }
    setBookmarks(await getBookmarks(userName));
  };

  const handleWatched = async () => {
    const userName = localStorage.getItem('userName') as string;
    if (!isWanna && !isWatched) {
      // create new bookmark
      await fetch(
        `http://localhost:7070/api/bookmarks/${userName}/${movie.movieId}/${STATUS.WATCHED}`,
        { method: 'POST' }
      );
    } else if (isWanna && !isWatched) {
      // update status
      await fetch(
        `http://localhost:7070/api/bookmarks/${userName}/${movie.movieId}/${STATUS.WATCHED}`,
        { method: 'PUT' }
      );
    } else if (!isWanna && isWatched) {
      // delete bookmark
      await fetch(
        `http://localhost:7070/api/bookmarks/${userName}/${movie.movieId}`,
        { method: 'DELETE' }
      );
    }
    setBookmarks(await getBookmarks(userName));
  };
  return (
    <div>
      {isLogin ? (
        <div className={styles.btns}>
          <div
            className={isWanna ? styles.active : ''}
            onClick={handleWannaWatch}
          >
            Wanna Watch
          </div>
          <div
            className={isWatched ? styles.active : ''}
            onClick={handleWatched}
          >
            Watched
          </div>
        </div>
      ) : (
        <div className={styles.btns}>
          <Link href='/login'>Wanna Watch</Link>
          <Link href='/login'>Watched</Link>
        </div>
      )}
    </div>
  );
}

export default BookmarksBtn;