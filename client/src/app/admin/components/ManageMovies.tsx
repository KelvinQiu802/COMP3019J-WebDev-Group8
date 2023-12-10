import { useEffect, useState, ChangeEvent } from 'react';
import style from './movies.module.css';
import API_HOST from '../../../../utils/host';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Pagination } from '@mui/material';

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

function ManageMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  function handlePageChange(e: ChangeEvent<unknown>, pageNum: number) {
    router.push(`${pathName}?page=${pageNum}`);
  }

  useEffect(() => {
    (async () => {
      setPageCount(await getPageCount());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const page = Number.parseInt(searchParams.get('page') as string);
      setPage(page ? page : 1);
      setMovies(await getMovies(page ? page : 1, LIMIT));
    })();
  }, [searchParams]);

  return (
    <div className={style.moviesList}>
      {movies.map((m) => (
        <div key={m.movie_id}>{m.movie_title}</div>
      ))}
      <Pagination
        count={pageCount}
        shape="rounded"
        className={style.pagination}
        page={page}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default ManageMovies;
