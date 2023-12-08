import React, { useState } from 'react';
import style from './textarea.module.css';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { isBlank } from '../../../../utils/stringUtil';
import API_HOST from '../../../../utils/host';

interface TextAreaProps {
  movie: Movie;
  isLogin: boolean;
}

function TextArea({ movie, isLogin }: TextAreaProps) {
  const router = useRouter();
  const [text, setText] = useState('');

  const handleSubmit = async () => {
    await fetch(`${API_HOST}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: localStorage.getItem('userName'),
        movieId: movie.movie_id,
        content: text,
      }),
    });
    setText('');
    location.reload();
  };

  return (
    <div className={style.content}>
      {isLogin ? (
        <>
          <textarea
            placeholder="Write your comment here..."
            className={style.text}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div className={style.btnbox}>
            <Button
              variant="outlined"
              color="success"
              disabled={isBlank(text)}
              className={style.submit}
              onClick={handleSubmit}
            >
              Comment
            </Button>
          </div>
        </>
      ) : (
        <Button
          variant="outlined"
          color="success"
          onClick={() => router.push('/login')}
          size="small"
        >
          Login to Comment
        </Button>
      )}
    </div>
  );
}

export default TextArea;
