import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Id } from 'react-toastify';
import style from './edit.module.css';
import API_HOST from '../../../../utils/host';

interface Props {
  openEdit: boolean;
  setOpenEdit: Dispatch<SetStateAction<boolean>>;
  movie: Movie;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  notifyEdited: (name: string) => Id;
}

type Inputs = {
  movie_title: string;
  country: string;
  intro: string;
  starring: string;
  language: string;
  directedBy: string;
  runtime: string;
  release_date: string;
  genre: string;
  img_url: string;
  abstract: string;
};

function MovieEditDialog({
  openEdit,
  setOpenEdit,
  movie,
  setUpdate,
  notifyEdited,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { ...movie } });

  const handleCancel = () => {
    setOpenEdit(false);
  };

  const handleSave: SubmitHandler<Inputs> = async (data) => {
    await fetch(`${API_HOST}/movies`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        movie_id: movie.movie_id,
      }),
    });
    setOpenEdit(false);
    setUpdate((prev) => !prev);
    notifyEdited(data.movie_title);
  };

  return (
    <Dialog open={openEdit} fullWidth>
      <DialogTitle>Edit Movie</DialogTitle>
      <DialogContent>
        <form className={style.form}>
          <TextField
            {...register('movie_title', { required: true })}
            label="Movie Title"
            fullWidth
          />
          <TextField
            {...register('img_url', { required: true })}
            label="Cover Image URL"
            fullWidth
          />
          <TextField {...register('abstract')} label="Abstract" fullWidth />
          <TextField
            {...register('intro', { required: true })}
            label="Introduction"
            fullWidth
            multiline
          />
          <TextField
            {...register('directedBy', { required: true })}
            label="Directors"
            fullWidth
          />
          <TextField
            {...register('genre', { required: true })}
            label="Genre"
            fullWidth
          />
          <TextField
            {...register('runtime', { required: true })}
            label="Runtime"
            fullWidth
          />
          <TextField
            {...register('release_date', { required: true })}
            label="Release Date"
            fullWidth
          />
          <TextField
            {...register('country', { required: true })}
            label="Country"
            fullWidth
          />
          <TextField
            {...register('language', { required: true })}
            label="Languages"
            fullWidth
          />
          <TextField
            {...register('starring', { required: true })}
            label="Movie Stars"
            fullWidth
            multiline
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSubmit(handleSave)}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default MovieEditDialog;
