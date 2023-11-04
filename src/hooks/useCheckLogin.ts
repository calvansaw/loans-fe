import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../constants/routes";
import moment from "moment";

const useCheckLogin = () => {
  const navigate = useNavigate();

  const checkExpiry = (base64accessToken: string) => {
    let isExpired = true;
    try {
      const base64TokenSegments = base64accessToken.split(".");
      const exp = JSON.parse(atob(base64TokenSegments[1])).exp;
      const expMoment = moment.unix(exp);
      isExpired = moment().isAfter(expMoment);
    } catch (err) {
      console.log(err);
      navigate(LOGIN);
    }
    if (isExpired) {
      navigate(LOGIN);
    }
  };

  useEffect(() => {
    const base64accessToken = localStorage.getItem("access_token");
    if (base64accessToken) {
      checkExpiry(base64accessToken);
    } else {
      navigate(LOGIN);
    }
  }, []);
};

export default useCheckLogin;
