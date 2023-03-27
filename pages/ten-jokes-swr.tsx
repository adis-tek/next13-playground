import { useEffect, useState } from "react";
import useSWR from "swr";
interface Joke {
  id: number | string;
  jokeId: number;
  type: string;
  setup: string;
  punchline: string;
  //   jokeData: Joke[];
}

function TenJokesSwrPage(props: Joke) {
  const [jokeData, setJokeData] = useState<Joke[]>(props.jokeData);
  //   const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    "https://official-joke-api.appspot.com/random_ten",
    (url) => fetch(url).then((res) => res.json())
  ); // uses fetch as default identifier

  useEffect(() => {
    if (data) {
      const transformedData: Joke[] = [];

      for (const key in data) {
        transformedData.push({
          id: key,
          jokeId: data[key].id,
          type: data[key].type,
          setup: data[key].setup,
          punchline: data[key].punchline,
        });
      }

      setJokeData(transformedData);
    }
  }, [data]);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch("https://official-joke-api.appspot.com/random_ten")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //         const transformedData: Joke[] = [];

  //         for (const key in data) {
  //           transformedData.push({
  //             id: key,
  //             jokeId: data[key].id,
  //             type: data[key].type,
  //             setup: data[key].setup,
  //             punchline: data[key].punchline,
  //           });
  //         }

  //         setData(transformedData);
  //         setIsLoading(false);
  //       });
  //   }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data && !jokeData) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {/* {isLoading && <p>Loading...</p>} */}
      {jokeData.map((joke: Joke) => {
        return (
          <li key={joke.id}>
            <h3>{joke.setup}</h3>
            <p>{joke.punchline}</p>
          </li>
        );
      })}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://official-joke-api.appspot.com/random_ten"
  );
  const data = await response.json();

  const transformedData: Joke[] = [];

  for (const key in data) {
    transformedData.push({
      id: key,
      jokeId: data[key].id,
      type: data[key].type,
      setup: data[key].setup,
      punchline: data[key].punchline,
    });
  }

  return {
    props: {
      jokeData: transformedData,
    },
  };
}

// Dummy api -> https://official-joke-api.appspot.com/random_ten

export default TenJokesSwrPage;
