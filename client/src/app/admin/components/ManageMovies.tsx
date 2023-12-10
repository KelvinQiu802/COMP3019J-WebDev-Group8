import { useEffect, useState, ChangeEvent } from 'react';
import style from './movies.module.css';
import API_HOST from '../../../../utils/host';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button, Pagination } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

const LIMIT = 15;

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
  const [update, setUpdate] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const notifyDeleted = (userName: string) =>
    toast(`Movie: ${userName} Deleted!`);

  function handlePageChange(e: ChangeEvent<unknown>, pageNum: number) {
    router.push(`${pathName}?page=${pageNum}`);
  }

  useEffect(() => {
    (async () => {
      setPageCount(await getPageCount());
    })();
  }, [update]);

  useEffect(() => {
    (async () => {
      const page = Number.parseInt(searchParams.get('page') as string);
      setPage(page ? page : 1);
      setMovies(await getMovies(page ? page : 1, LIMIT));
    })();
  }, [searchParams, update]);

  const handleRemove = async (id: number, name: string) => {
    await fetch(`${API_HOST}/movies/${id}`, { method: 'DELETE' });
    setUpdate((prev) => !prev);
    notifyDeleted(name);
  };

  const handleEdit = (id: number) => {};

  return (
    <div className={style.moviesList}>
      {movies.map((m) => (
        <div key={m.movie_id} className={style.movie}>
          <div>{m.movie_title}</div>
          <div className={style.btns}>
            <Button
              onClick={() => handleRemove(m.movie_id, m.movie_title)}
              variant="contained"
              color="error"
            >
              DEL
            </Button>
            <Button
              onClick={() => handleEdit(m.movie_id)}
              variant="contained"
              color="warning"
            >
              EDIT
            </Button>
          </div>
        </div>
      ))}
      <Pagination
        count={pageCount}
        shape="rounded"
        className={style.pagination}
        page={page}
        onChange={handlePageChange}
      />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default ManageMovies;
