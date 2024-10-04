import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GenderContext } from '../context/GenderContext';
import axios from 'axios';
import { IoAddCircleOutline } from "react-icons/io5";
import { AiFillCloseSquare } from "react-icons/ai";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";

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
        image: fetchedPerson.picture.large,
        name: fetchedPerson.name.first,
        surname: fetchedPerson.name.last,
        country: fetchedPerson.location.country,
        phone: fetchedPerson.phone,
        email: fetchedPerson.email,
        birthDate: fetchedPerson.dob.date
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
    <div>
      <div>
        <h1 style={{margin:'10px 0px'}}>{genderContext?.gender === 'female' ? 'Kadınlar' : 'Erkekler'} Listesi</h1>
        <button onClick={fetchData}><IoAddCircleOutline style={{ fontSize: '18px' }} /> Add Random User</button>
      </div>
      <div className="container">
        {people.map((person, index) => (
            <div key={index} className="person-card">
            <img src={person.image} />
            <div className="info">
              <p style={{marginBottom:'30px'}}><FaCalendarAlt/>{new Date(person.birthDate).toLocaleDateString()}  <FaMapMarkerAlt/>{person.country} <FaUser/>{person.name} {person.surname}</p>
              <p><FaPhone /> {person.phone}  <FaEnvelope /> {person.email}</p>
            </div>
            <div className="delete-icon">
              <AiFillCloseSquare onClick={() => handleDelete(index)} style={{ cursor: 'pointer', color: 'red', fontSize: '35px',borderRadius: '20px' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
