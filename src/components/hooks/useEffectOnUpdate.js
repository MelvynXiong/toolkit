import { useEffect, useRef } from "react";

export default function useEffectOnUpdate(effect, dep) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    let effectCleanFunc = function noop() {};
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effectCleanFunc = effect() || effectCleanFunc;
    }

    return () => {
      effectCleanFunc();
    };
  }, dep);
}
