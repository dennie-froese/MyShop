import React, {useState, useEffect} from 'react';

export default function useFetch(url: string) {
  const [results, setResults] = useState();

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setResults(result);
      })
      .catch((error) => {
        throw new Error(`Error loading results from fetch! Error: ${error}`);
      });
  }, []);

  return results;
}
