import './Controls.css';
import '../../../utils/utils.css';

export default function Controls({children}) {
  return (
    <div className="form-controls">
      {children}
    </div>
  )
}