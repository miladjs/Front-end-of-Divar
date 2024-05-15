const saveCookie = ({ accessToken, refreshToken }) => {
  document.cookie = `accessToken=${accessToken}; max-age=${1 * 24 * 60 * 60}`;
  document.cookie = `refreshToken=${refreshToken} ; max-age=${
    30 * 24 * 60 * 60
  }`;
};

const getCookie = (name) => {
  return document.cookie
    .split(";")
    .find((token) => token.trim().split("=")[0] === name)
    ?.split("=")[1];
};

export { saveCookie, getCookie };
