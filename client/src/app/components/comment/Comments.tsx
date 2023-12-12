'use client';

import React, { useEffect, useState } from 'react';
import style from './comments.module.css';
import Comment from './Comment';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const ORDER = {
  POPULAR: 'popular',
  LATEST: 'latest',
};

interface Vote {
  userName: string;
  status: 'UP' | 'DOWN';
}

async function getVotes(id: String) {
  const result = await fetch(`${API_HOST}/commentvotes/${id}`).then((result) =>
    result.json()
  );
  return result;
}

async function sortByPolular(comments: any[]) {
  const resultPromise = comments.map(async (comment) => {
    const votes = await getVotes(comment.commentId);
    const up = votes.filter((vote: Vote) => vote.status == 'UP').length;
    const down = votes.filter((vote: Vote) => vote.status == 'DOWN').length;
    return {
      ...comment,
      popular: up - down,
    };
  });
  const commentWitPopular = await Promise.all(resultPromise);
  commentWitPopular.sort((a, b) => b.popular - a.popular);
  return commentWitPopular;
}

function sortByTime(comments: any[]) {
  const commentsCopy = [...comments];
  commentsCopy.sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );
  return commentsCopy;
}

async function getComments(id: number) {
  if (!id) {
    return [];
  }
  const result = await fetch(`${API_HOST}/comments/movie/${id}`).then(
    (result) => result.json()
  );
  return result;
}

interface CommentsProps {
  movie: Movie;
  isLogin: boolean;
}

function Comments({ movie, isLogin }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [order, setOrder] = useState(ORDER.POPULAR);

  const handlePopular = () => {
    setOrder(ORDER.POPULAR);
  };

  const handleLatest = () => {
    setOrder(ORDER.LATEST);
  };

  useEffect(() => {
    (async () => {
      setComments(
        (await sortByPolular(await getComments(movie.movie_id))) as any
      );
    })();
  }, [movie]);

  useEffect(() => {
    (async () => {
      if (order == ORDER.POPULAR) {
        setComments((await sortByPolular(comments)) as any);
      } else {
        setComments(sortByTime(comments) as any);
      }
    })();
  }, [order]);

  return (
    <div className={style.content}>
      <div className={style.order}>
        <div className={style.label}>Order: </div>
        <div
          className={order == ORDER.POPULAR ? style.select : ''}
          onClick={handlePopular}
        >
          Popular
        </div>
        <div
          className={order == ORDER.LATEST ? style.select : ''}
          onClick={handleLatest}
        >
          Latest
        </div>
      </div>
      {comments.map((comment) => (
        <Comment key={comment.commentId} comment={comment} isLogin={isLogin} />
      ))}
    </div>
  );
}

export default Comments;
