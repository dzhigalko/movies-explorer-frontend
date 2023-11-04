import './Form.css'

export default function Form({children, ...rest}) {
  return (
    <form className="form" {...rest}>
      {children}
    </form>
  );
}