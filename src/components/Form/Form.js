import './Form.css'

export default function Form({children, ...rest}) {
  return (
    <form className="form" noValidate={true} {...rest}>
      {children}
    </form>
  );
}