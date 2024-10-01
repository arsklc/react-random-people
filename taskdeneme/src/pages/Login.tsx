import React, { useContext } from 'react';
import { GenderContext } from '../context/GenderContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const genderContext = useContext(GenderContext);
  const navigate = useNavigate();


  if (!genderContext) {
    return <div>Loading...</div>;
  }

  const { setGender } = genderContext;

  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
    navigate('/home');
  };

  return (
    <div>
      <h1>Listelemek istediğiniz kullanıcıların cinsiyetini seçin</h1>
      <button onClick={() => handleGenderSelect('male')}>Erkek</button>
      <button onClick={() => handleGenderSelect('female')}>Kadın</button>
    </div>
  );
};

export default Login;
