import cookie from "js-cookie";
import jwt_decode from "jwt-decode";

export const setToken = (data) => {
  cookie.set("tokenString", data);
};

export const getRoles = () => {
  var token = getToken();

  if (token) {
    try {
      var decoded = jwt_decode(token);
      var roles =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if (roles) {
        return roles.map((r) => r.toUpperCase());
      }
    } catch {
      return [];
    }
  } else {
    return [];
  }
};

export const getUserId = () => {
  var token = getToken();
  if (token) {
    try {
      var decoded = jwt_decode(token);
      if (decoded["UserId"]) {
        return decoded["UserId"];
      }
    } catch {
      return "";
    }
  }
};

export const isInRole = (role) => {
  let roles = getRoles();
  if (Array.isArray(roles)) {
    roles = roles.map((r) => r.toUpperCase());
    if (roles) {
      return roles.includes(role);
    }
    if (roles) {
      return roles.includes(role);
    }

    return false;
  }
  return roles == role;
};

export const isInRoles = (roles) => {
  let userRoles = getRoles();
  userRoles = userRoles.map((r) => r.toUpperCase());

  let hasRole = false;

  hasRole = roles.some(function (val) {
    return userRoles.includes(val);
  });

  return hasRole;
};

export const isInRoleforUI = (keys) => {
  let userRoles = getRoles();
  userRoles = userRoles.map((r) => r.toUpperCase());
  let roles = [];

  keys.map((r) => (userRoles.indexOf(r) >= 0 ? roles.push(r) : null));

  return roles;
};

export const getToken = () => {
  const token = cookie.get("tokenString") || "";
  return token;
};

export const signOut = () => {
  cookie.remove("tokenString");
  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now().toString());
};
