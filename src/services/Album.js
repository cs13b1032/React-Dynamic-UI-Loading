import axios from "axios";

const BASE_API_URL = `https://jsonplaceholder.typicode.com`;

function getAlbums() {
  return axios.get(BASE_API_URL + `/albums`, {});
}

function getPhotos(albumId) {
  return axios.get(BASE_API_URL + `/photos?albumId=` + albumId);
}

export default {
  getAlbums,
  getPhotos,
};
