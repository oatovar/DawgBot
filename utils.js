module.exports = {
  getImages: (res) => {
    const results = JSON.parse(res).data.children;
    const images = [];
    Object.values(results).forEach((value) => {
      images.push(value.data.url);
    });
    return images;
  },
};
