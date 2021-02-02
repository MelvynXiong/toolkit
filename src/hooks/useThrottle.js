import { useRef, useEffect, useCallback } from "react";

function throttle(fn, delay) {
  let active = true;
  return function(...args) {
    if (active) {
      fn(...args);
      active = false;
      setTimeout(function() {
        active = true;
      }, delay);
    }
  };
}

export default function useThrottle(fn, delay, dep = []) {
  const { current } = useRef({ fn, active: true });

  useEffect(() => {
    current.fn = fn;
  });

  return useCallback((...args) => {
    if (current.active) {
      current.fn(...args);
      current.active = false;
      setTimeout(function() {
        current.active = true;
      }, delay);
    }
  }, dep);
}
