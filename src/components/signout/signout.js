import { useNavigate } from 'react-router-dom';

export const Signout = () => {
    const navigate = useNavigate(); 

    const handleSignOut = () => {
        sessionStorage.clear(); // Clear session storage
        navigate('/'); // Navigate to home page
    };

    return (
        <button className="btn" onClick={handleSignOut}>
            Sign Out
        </button>
    );
};

export default Signout;