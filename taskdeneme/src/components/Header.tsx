import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { GenderContext } from '../context/GenderContext';

const Header = () => {
  const genderContext = useContext(GenderContext);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            {genderContext?.gender ? (
              <Link to="/home">Home</Link>
            ) : (
              <span style={{ color: 'gray', cursor: 'not-allowed' }}>Home</span>
            )}
          </li>
          <li>
            <Link to="/random">Random</Link>
          </li>
          <li>
            <Link to="/location">Location</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
