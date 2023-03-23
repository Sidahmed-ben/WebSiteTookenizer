export const Utils = () => {
  function readFile(path) {
    fetch(path)
      .then((r) => r.text())
      .then((text) => {
        return text;
      })
      .catch((err) => {
        console.log(" Error when reading file with path", path);
      });
  }

  return {
    readFile,
  };
};
