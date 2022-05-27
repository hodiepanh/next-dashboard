import axiosClient from "./axiosClient";

const url = "/items";
export const itemApi = {
  getItems: () => {
    return axiosClient.get(url);
  },
  addItems: (newItem) => {
    return axiosClient.post(`${url}`, newItem);
  },
  deleteItems: (index) => {
    return axiosClient.delete(`${url}/${index}`);
  },
  searchItems: (searchValue) => {
    return axiosClient.get(`${url}?title_like=${searchValue}`);
  },
  editItems: (id, editName) => {
    return axiosClient.patch(`${url}/${id}`, {
      title: editName,
    });
  },
};
