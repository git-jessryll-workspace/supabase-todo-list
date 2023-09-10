export const decodeJwt = () => {
  const accessToken = window.localStorage.getItem("access_token");
  if (!accessToken) return null;
  let decodedToken;
  import("jwt-decode").then((module) => {
    decodedToken = module.jwt_decode(accessToken);
  });

  return decodedToken;
};

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const generateUuid = async () => {
  let uuIdv4;
  await import("uuid")
    .then((module) => {
      return module.v4();
    })
    .then((uuid) => (uuIdv4 = uuid));
  return uuIdv4;
};

