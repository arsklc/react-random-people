import { useEffect, useContext, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GenderContext } from '../context/GenderContext';
import { useQuery } from '@tanstack/react-query';
import { IoAddCircleOutline } from "react-icons/io5";
import { AiFillCloseSquare } from "react-icons/ai";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
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

  const fetchRandomUser = async () => {
    const response = await axios.get(`https://randomuser.me/api/?results=1&gender=${genderContext?.gender}`);
    const fetchedPerson = response.data.results[0];
    return {
      image: fetchedPerson.picture.large,
      name: fetchedPerson.name.first,
      surname: fetchedPerson.name.last,
      country: fetchedPerson.location.country,
      phone: fetchedPerson.phone,
      email: fetchedPerson.email,
      birthDate: fetchedPerson.dob.date
    };
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['randomUser', genderContext?.gender],
    queryFn: fetchRandomUser,
    enabled: false, 
  });

  
  useEffect(() => {
    if (data) {
      setPeople(prevPeople => [...prevPeople, data]);
    }
  }, [data]);

  
  const handleDelete = useCallback((index: number) => {
    setPeople(prevPeople => prevPeople.filter((_, i) => i !== index));
  }, [setPeople]);

  
  const peopleList = useMemo(() => {
    return people.map((person, index) => (
      <div key={index} className="person-card">
        <img src={person.image} alt="profile" />
        <div className="info">
          <p style={{ marginBottom: '30px' }}>
            <FaCalendarAlt /> {new Date(person.birthDate).toLocaleDateString()} 
            <FaMapMarkerAlt /> {person.country} 
            <FaUser /> {person.name} {person.surname}
          </p>
          <p>
            <FaPhone /> {person.phone}  
            <FaEnvelope /> {person.email}
          </p>
        </div>
        <div className="delete-icon">
          <AiFillCloseSquare onClick={() => handleDelete(index)} style={{ cursor: 'pointer', color: 'red', fontSize: '35px', borderRadius: '20px' }} />
        </div>
      </div>
    ));
  }, [people, handleDelete]);

  return (
    <div>
      <div>
        <h1 style={{ margin: '10px 0px' }}>
          {genderContext?.gender === 'female' ? 'Kadınlar' : 'Erkekler'} Listesi
        </h1>
        <button onClick={() => refetch()}>
          <IoAddCircleOutline style={{ fontSize: '18px' }} /> Add Random User
        </button>
      </div>
      <div className="container">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error occurred: {error.message}</p>}
        {peopleList}
      </div>
    </div>
  );
};

export default Home;
