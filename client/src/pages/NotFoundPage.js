import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000); 
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 ">
      Page Not Found!
    </ div>
  );
}

export default NotFoundPage;