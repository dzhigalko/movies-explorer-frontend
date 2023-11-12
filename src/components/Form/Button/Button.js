import './Button.css';
import '../../../utils/utils.css';

export default function Button({ text, disabled, ...rest }) {
  return (
    <button className={`button link-style ${disabled && 'button_disabled'}`} disabled={disabled} {...rest}>{text}</button>
  );
}