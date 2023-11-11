import './Input.css';

export default function Input({ name, label, ...rest }) {
  return (
    <div className='form-input'>
      <label className="form-input__label" htmlFor={name}>{label}</label>
      <input
        className="form-input__field"
        name={name}
        {...rest}
      />
      <span className="form-input__error"></span>
    </div>
  );
}