// Auth
export const BASE_URL = "http://localhost:3000";
export const BASE_API_URL =
  "https://8snvybl28g.execute-api.ap-southeast-1.amazonaws.com/dev";
export const DOMAIN_URL = "https://csaw.auth.ap-southeast-1.amazoncognito.com";
export const CLIENT_ID = "7au4ti4oj44090o8uqoueins3s";
export const REDIRECT_URL = `${BASE_URL}/login`;
export const AUTHORIZE_URL = `${DOMAIN_URL}/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URL}`;
export const LOGOUT_URL = `${DOMAIN_URL}/logout?client_id=${CLIENT_ID}&logout_uri=${REDIRECT_URL}`;
export const TOKEN_URL = `${DOMAIN_URL}/oauth2/token`;
