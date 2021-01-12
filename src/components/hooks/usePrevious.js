import React, { useEffect, useRef } from "react";

export default function usePrevious(state) {
  const pre = useRef(null);

  useEffect(() => {
    pre.current = state;
  }, [value]);

  return pre.current;
}
