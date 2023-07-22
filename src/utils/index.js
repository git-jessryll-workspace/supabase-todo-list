import jwt_decode from "jwt-decode";

export const decodeJwt = () => {
  const accessToken = window.localStorage.getItem("access_token");
  if (!accessToken) return null;

  const decodedToken = jwt_decode(accessToken);

  return decodedToken;
};

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
