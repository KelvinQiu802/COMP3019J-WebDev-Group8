'use client';

import {Pagination} from '@mui/material';
import {ChangeEvent, useEffect, useState} from 'react';
import styles from './page.module.css';
import MovieCard from './components/movie/MovieCard';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import API_HOST from '../../utils/host';

const LIMIT = 10;

async function getPageCount() {
    const result = await fetch(`${API_HOST}/movies/count`);
    const json = await result.json();
    const count = json.count;
    return Math.ceil(count / LIMIT);
}

async function getMovies(page: number, limit: number) {
    const result = await fetch(`${API_HOST}/movies?page=${page}&limit=${limit}`);
    const json = await result.json();
    return json;
}

async function getBookmarks(userName: string) {
    const result = await fetch(`${API_HOST}/bookmarks/${userName}`).then(
        (result) => result.json()
    );
    return result;
}

export default function Home() {
    const [pageCount, setPageCount] = useState(1);
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLogin, setIsLogin] = useState(false);
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    function handlePageChange(e: ChangeEvent<unknown>, pageNum: number) {
        router.push(`${pathName}?page=${pageNum}`);
    }

    useEffect(() => {
        (async () => {
            setPageCount(await getPageCount());
            const userName = localStorage.getItem('userName');
            if (userName) {
                setBookmarks(await getBookmarks(userName));
            }
            setIsLogin(!!userName);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const page = Number.parseInt(searchParams.get('page') as string);
            setPage(page ? page : 1);
            setMovies(await getMovies(page ? page : 1, LIMIT));
        })();
    }, [searchParams]);

    useEffect(() => {
        setIsLogin(!!localStorage.getItem('userName'));
    }, [pathName]);

    return (
        <main className={styles.main}>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.movie_id}
                    movie={movie}
                    isLogin={isLogin}
                    bookmarks={bookmarks}
                    setBookmarks={setBookmarks}
                />
            ))}
            <Pagination
                count={pageCount}
                shape="rounded"
                className={styles.pagination}
                page={page}
                onChange={handlePageChange}
            />
        </main>
    );
}
