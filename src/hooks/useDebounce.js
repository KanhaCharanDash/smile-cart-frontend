import { useState, useEffect } from "react";

const useDebounce = value => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, 350); // Wait for 350ms

    return () => {
      clearTimeout(timerId); // Cancel timer if value changes early
    };
  }, [value]);

  return debouncedValue; // fn return the value after delay
};

export default useDebounce;
