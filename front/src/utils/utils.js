export const Utils = () => {
  // This function handles getting images from the specified website url
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
