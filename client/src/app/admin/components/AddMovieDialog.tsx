import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { Id } from 'react-toastify';
import { useForm } from 'react-hook-form';
import style from './edit.module.css';
import API_HOST from '../../../../utils/host';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  notify: (name: string) => Id;
}

type Inputs = {
  movie_title: string;
  country: string;
  intro: string;
  starring: string;
  language: string;
  directors: string;
  runtime: string;
  release_date: string;
  genre: string;
  img_url: string;
  abstract: string;
};

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function AddMovieDialog({ open, setOpen, setUpdate, notify }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleAdd = async (data: Inputs) => {
    await fetch(`${API_HOST}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        score: 0,
        movie_id: getRandomInt(0, 100000),
      }),
    });
    setOpen(false);
    setUpdate((prev) => !prev);
    notify(data.movie_title);
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Add New Movie</DialogTitle>
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
          <TextField
            {...register('abstract', { required: true })}
            label="Abstract"
            fullWidth
          />
          <TextField
            {...register('intro', { required: true })}
            label="Introduction"
            fullWidth
            multiline
          />
          <TextField
            {...register('directors', { required: true })}
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
        <Button onClick={handleSubmit(handleAdd)}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddMovieDialog;
