import './Button.css';
import '../../../utils/utils.css';

export default function Button({ text, ...rest }) {
  return (
    <button className="button link-style" {...rest}>{text}</button>
  );
}