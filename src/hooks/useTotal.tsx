import React, {useState, SetStateAction, Dispatch} from 'react';

export const useTotal = (): [
  number,
  (n: number) => void,
  (n: number) => void,
] => {
  const [total, setTotal] = useState(0);

  function increment(n: number) {
    setTotal(total + n);
  }

  function decrement(n: number) {
    setTotal(total - n);
  }
  console.warn(total);
  return [total, increment, decrement];
};

export default useTotal;
