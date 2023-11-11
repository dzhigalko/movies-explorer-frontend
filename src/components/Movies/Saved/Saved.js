import Container from '../Container';
import Card from '../Card';
import SeachForm from '../SearchForm';

import data from '../example.json';

export default function Saved() {
  const movies = data.slice(0, 3)

  return (
    <>
      <SeachForm/>
      <Container>
        {movies.map((m, i) => <Card key={i} image={m.image} name={m.name} duration={m.duration} showDislike/>)}
      </Container>
    </>
  )
} 