import axios from "axios";
import { BASE_API_URL } from "../constants/urls";
import { UpdateLoanInterface } from "../@types/loan";

export const getLoans = () => {
  return axios.get(`${BASE_API_URL}/loans`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const updateLoan = (data: UpdateLoanInterface) => {
  return axios.put(`${BASE_API_URL}/loans`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};
