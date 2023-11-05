import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../constants/routes";
import moment from "moment";

const useCheckLogin = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
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
  const getAdmin = (base64IdToken: string) => {
    try {
      const base64TokenSegments = base64IdToken.split(".");
      const admin = JSON.parse(atob(base64TokenSegments[1]))["custom:role"];
      return admin === "admin";
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const base64accessToken = localStorage.getItem("access_token");
    const base64idToken = localStorage.getItem("id_token");

    if (base64idToken) {
      setIsAdmin(!!getAdmin(base64idToken));
    }
    if (base64accessToken) {
      checkExpiry(base64accessToken);
    } else {
      navigate(LOGIN);
    }
  }, []);

  return { isAdmin };
};

export default useCheckLogin;
