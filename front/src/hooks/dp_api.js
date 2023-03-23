export const dbApi = () => {
  const sendText = async (titre, text) => {
    return fetch("/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titre, text }),
    })
      .then((resp) => {
        const data = resp.text();
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const searchWord = async (word) => {
    return fetch("/search_word", {
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
    sendText,
  };
};
