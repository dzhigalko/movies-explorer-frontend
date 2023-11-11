import Preloader from '../../Preloader';
import './Base.css';

export default function Base({isLoading, children}) {
  if (isLoading) {
    return (<Preloader/>)
  }

  return (
    <div className="page__content">
      {children}
    </div>
  );
}