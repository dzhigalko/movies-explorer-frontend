import { Link as RouterLink } from 'react-router-dom';

import './Link.css';
import '../../../utils/utils.css';

export default function Link({ children, ...rest }) {
  return (<RouterLink className="controls__link link-style" {...rest}>{children}</RouterLink>);
}