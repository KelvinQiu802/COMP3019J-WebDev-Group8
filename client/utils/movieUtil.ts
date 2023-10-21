export async function getMovieScore(id: number) {
  if (!id) {
    return '0.0';
  }
  const scores: [{ score: number }] = await fetch(
    `http://localhost:7070/api/scores/${id}`
  ).then((result) => result.json());
  const scoreSum = scores.reduce(
    (accum: number, score) => accum + score.score,
    0
  );
  if (scores.length) {
    return ((scoreSum / scores.length) * 2).toFixed(1);
  }
  return '0.0';
}
