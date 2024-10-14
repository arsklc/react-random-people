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
            <Link to="/login">Select Gender</Link>
          </li>
          <li>
            {genderContext?.gender ? (
              <Link to="/home">Random</Link>
            ) : (
              <span style={{ color: 'gray', cursor: 'not-allowed' }}>Random</span>
            )}
          </li>
          <li>
            <Link to="/random">Popular</Link>
          </li>
          <li>
            <Link to="/location">Nationalities</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
