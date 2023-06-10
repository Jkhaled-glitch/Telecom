import './notFound.css'
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate()
  return (
    <div className='notFound'>
      <h1>Oops! Page not found.</h1>
      <p>The requested page does not exist.</p>
      <span
       onClick={()=>navigate('/')}>Retour</span>
    </div>
  );
}

export default NotFound;
