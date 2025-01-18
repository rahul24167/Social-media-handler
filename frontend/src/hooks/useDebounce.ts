import {useEffect } from "react";

export const useDebounce = (callback:()=>void, values: any[], delay:number=500) => {
  useEffect(() => {
    let timerId = setTimeout(callback, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [values, delay]);
};
