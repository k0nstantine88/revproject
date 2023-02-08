export const getTopScores = () => {
  return fetch("/api/score").then((response) =>
    response.json()
  );
};

export const putScore = (data) => {
  return fetch("/api/score", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
