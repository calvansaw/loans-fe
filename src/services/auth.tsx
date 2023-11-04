import axios from "axios";
import { CLIENT_ID, REDIRECT_URL, TOKEN_URL } from "../constants/urls";

export const token = (code: string) => {
  return axios.post(
    TOKEN_URL,
    {
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URL,
      client_id: CLIENT_ID,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
};
