import { useEffect, useState } from "react";

interface Joke {
  id: number | string;
  jokeId: number;
  type: string;
  setup: string;
  punchline: string;
}

function TenJokesPage() {
  const [data, setData] = useState<Joke[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://official-joke-api.appspot.com/random_ten")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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

        setData(transformedData);
        setIsLoading(false);
      });
  }, []);
  return (
    <ul>
      {isLoading && <p>Loading...</p>}
      {data &&
        data.map((joke: Joke) => {
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

export default TenJokesPage;

// Dummy api -> https://official-joke-api.appspot.com/random_ten
