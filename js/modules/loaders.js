function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}

function loadLevel(name) {
  return new Promise(resolve => {
    const json = require(`../levels/${name}.json`);
    resolve(json);
  });
}

module.exports = {
  loadImage: loadImage,
  loadLevel: loadLevel
};
