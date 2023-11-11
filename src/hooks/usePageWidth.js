import { useEffect, useState } from 'react';

import { PAGE_WIDTH } from '../utils/constants';


const findPageWidth = () => {
  const matches = Object.entries(PAGE_WIDTH).reverse().map(([size, width]) => {
    return [size, !!window.matchMedia(`(min-width: ${width})`).matches]
  })

  const match = matches.find(([_, match]) => match)
  return match
} 

export default function usePageWidth() {
  const [pageWidth, setPageWidth] = useState(findPageWidth());

  useEffect(() => {
    const listener = () => setPageWidth(findPageWidth());
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [])

  return { pageWidth }
}