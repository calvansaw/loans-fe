import axios from "axios";
import { BASE_API_URL } from "../constants/urls";
import {
  CreateRequestInterface,
  UpdateRequestInterface,
} from "../@types/request";

export const getRequests = () => {
  return axios.get(`${BASE_API_URL}/requests`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const updateRequests = (data: UpdateRequestInterface) => {
  return axios.put(`${BASE_API_URL}/requests`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const createRequests = (data: CreateRequestInterface) => {
  return axios.post(`${BASE_API_URL}/requests`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};
