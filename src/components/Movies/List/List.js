import { useEffect, useState } from 'react';

import Container from '../Container';
import Card from '../Card';
import SeachForm from '../SearchForm';
import usePageWidth from '../../../hooks/usePageWidth';
import { PAGE_WIDTH_CARDS } from '../../../utils/constants';
import './List.css';
import '../../../utils/utils.css';

import data from '../example.json';

export default function List() {
  const { pageWidth: [pageWidthId, pageWidth] } = usePageWidth();
  const [cards, setCards] = useState(data);

  useEffect(() => {
    setCards(data.slice(0, PAGE_WIDTH_CARDS[pageWidthId]))
  }, [pageWidthId, pageWidth])

  return (
    <>
      <SeachForm/>
      <Container>
        {cards.map((m, i) => <Card key={i} image={m.image} name={m.name} duration={m.duration} isLiked={m.isLiked} showLike/>)}
      </Container>
      <section className="more">
        <button className="more__button link-style">Ещё</button>
      </section>
    </>
  )
} 