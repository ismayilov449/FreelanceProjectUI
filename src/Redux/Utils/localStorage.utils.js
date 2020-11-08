export const saveToLocalStorage = (name, data) => {
  const stringified = JSON.stringify(data);
  localStorage.setItem(name, stringified);
};

export const loadFromLocalStorage = (name) => {
  const data = localStorage.getItem(name);
  if (data) {
    return JSON.parse(data);
  } else {
    return false;
  }
};

export const clearLocalStorage = (name) => {
  localStorage.removeItem(name);
};
