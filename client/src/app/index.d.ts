interface Movie {
  movie_id: number;
  country: string;
  intro: string;
  movie_title: string;
  starring: string;
  language: string;
  directors: string;
  runtime: string;
  release_date: string;
  genre: string;
  img_url: string;
  abstract: string;
  score: number;
}

interface Bookmark {
  userName: string;
  movieId: number;
  status: BookmarkStatus;
}

type BookmarkStatus = 'WANNA' | 'WATCHED';

interface Comment {
  userName: string;
  movieId: number;
  commentId: number;
  content: string;
  time: string;
}
