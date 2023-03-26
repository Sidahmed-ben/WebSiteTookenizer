// This function handles all api calls
export const dbApi = () => {
  // The function that starts indexation
  const indexation = async () => {
    return fetch("/api/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        const data = resp.text();
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // The function that searchs for word
  const searchWord = async (word) => {
    return fetch("/api/search_word", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        word,
      }),
    })
      .then((resp) => {
        const data = resp.text();
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return {
    searchWord,
    indexation,
  };
};
