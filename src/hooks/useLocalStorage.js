import { useState, useEffect } from "react";

const PREFIX = "codepen-clone";
export const useLocalStorage = (key, iniValue) => {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof iniValue === "function") {
      return iniValue();
    } else {
      return iniValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
};
