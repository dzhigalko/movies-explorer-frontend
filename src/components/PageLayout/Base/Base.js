import './Base.css';

export default function Base({children}) {
  return (
    <div className="page__content">
      {children}
    </div>
  );
}