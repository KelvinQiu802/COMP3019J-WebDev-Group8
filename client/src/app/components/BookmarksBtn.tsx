import React from 'react';
import styles from './bookmarkbtn.module.css';
import Link from 'next/link';
import STATUS from '../../../utils/bookmarkStatus';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

/*** check if the movie is included in the bookmark list
 * @param list: bookmark list
 */
function includeMovie(list: any[], id: string) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].movieId == id) {
      return true;
    }
  }
  return false;
}

/*** get bookmark list
 * @param userName: user name
 */
async function getBookmarks(userName: string) {
  const result = await fetch(`${API_HOST}/bookmarks/${userName}`).then(
    (result) => result.json()
  );
  return result;
}

/*** bookmark button
 * @param isLogin: is login
 */
function BookmarksBtn({
  isLogin,
  bookmarks,
  setBookmarks,
  movie,
}: {
  isLogin: boolean;
  bookmarks: any;
  setBookmarks: React.Dispatch<React.SetStateAction<any>>;
  movie: Movie;
}) {
  const watched = bookmarks.filter(
    (mark: any) => mark.status == STATUS.WATCHED
  );
  const wanna = bookmarks.filter((mark: any) => mark.status == STATUS.WANNA);
  const isWanna = includeMovie(wanna, movie.movie_id.toString());
  const isWatched = includeMovie(watched, movie.movie_id.toString());

  /**
   * handle wanna watch button
   */
  const handleWannaWatch = async () => {
    const userName = localStorage.getItem('userName');
    if (!isWanna && !isWatched) {
      // create new bookmark
      await fetch(
        `${API_HOST}/bookmarks/${userName}/${movie.movie_id}/${STATUS.WANNA}`,
        { method: 'POST' }
      );
    } else if (!isWanna && isWatched) {
      // update status
      await fetch(
        `${API_HOST}/bookmarks/${userName}/${movie.movie_id}/${STATUS.WANNA}`,
        { method: 'PUT' }
      );
    } else if (isWanna && !isWatched) {
      // delete bookmark
      await fetch(`${API_HOST}/bookmarks/${userName}/${movie.movie_id}`, {
        method: 'DELETE',
      });
    }
    setBookmarks(await getBookmarks(userName!));
  };

  /**
   * handle watched button
   */
  const handleWatched = async () => {
    const userName = localStorage.getItem('userName');
    if (!isWanna && !isWatched) {
      // create new bookmark
      await fetch(
        `${API_HOST}/bookmarks/${userName}/${movie.movie_id}/${STATUS.WATCHED}`,
        { method: 'POST' }
      );
    } else if (isWanna && !isWatched) {
      // update status
      await fetch(
        `${API_HOST}/bookmarks/${userName}/${movie.movie_id}/${STATUS.WATCHED}`,
        { method: 'PUT' }
      );
    } else if (!isWanna && isWatched) {
      // delete bookmark
      await fetch(`${API_HOST}/bookmarks/${userName}/${movie.movie_id}`, {
        method: 'DELETE',
      });
    }
    setBookmarks(await getBookmarks(userName!));
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
          <Link href="/login">Wanna Watch</Link>
          <Link href="/login">Watched</Link>
        </div>
      )}
    </div>
  );
}

export default BookmarksBtn;
