import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GenderContext } from '../context/GenderContext';
import axios from 'axios';

const Home = () => {
  const [people, setPeople] = useState<any[]>([]);
  const genderContext = useContext(GenderContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!genderContext?.gender) {
      navigate('/login');
    }
  }, [genderContext, navigate]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://randomuser.me/api/?results=1&gender=${genderContext?.gender}`);
      const fetchedPerson = response.data.results[0];
      const newPerson = {
        gender: fetchedPerson.gender,
        name: fetchedPerson.name.first,
        surname: fetchedPerson.name.last,
        age: fetchedPerson.registered.age,
        city: fetchedPerson.location.city,
        country: fetchedPerson.location.country,
      };
      setPeople(prevPeople => [...prevPeople, newPerson]);
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  const handleDelete = (index: number) => {
    setPeople(prevPeople => prevPeople.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>{genderContext?.gender === 'female' ? 'Kadınlar' : 'Erkekler'} Listesi</h1>
      <button onClick={fetchData}>Yeni Kişi Getir</button>
      {people.map((person, index) => (
        <div key={index} className="person-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2>
            Fullname: {person.name} {person.surname} | Gender: {person.gender} | Age: {person.age} | Location: {person.city}, {person.country}
          </h2>
          <button onClick={() => handleDelete(index)}>Sil</button>
        </div>
      ))}
    </div>
  );
};

export default Home;
