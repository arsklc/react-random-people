import { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GrPowerCycle } from 'react-icons/gr';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';

const fetchRandomUsers = async (peopleCount: number, countryCode: string) => {
  const response = await axios.get(
    `https://randomuser.me/api/?results=${peopleCount}&nat=${countryCode}`
  );
  return response.data.results.map((person: any) => ({
    image: person.picture.large,
    name: person.name.first,
    surname: person.name.last,
    country: person.location.country,
    phone: person.phone,
    email: person.email,
    birthDate: person.dob.date,
  }));
};

const Location = () => {
  const [countryCode, setCountryCode] = useState<string>('tr');
  const [peopleCount, setPeopleCount] = useState<number>(1);

  const { data: people = [], refetch, isLoading, error } = useQuery({
    queryKey: ['randomUsers', peopleCount, countryCode],
    queryFn: () => fetchRandomUsers(peopleCount, countryCode),
    enabled: false, 
  });

  const showAlert = useCallback(() => {
    alert('1 den 100e kadar sayı giriniz!');
  }, []);

  const handleIncrement = useCallback(() => {
    if (peopleCount < 100) {
      setPeopleCount((prev) => prev + 1);
    } else {
      showAlert();
    }
  }, [peopleCount, showAlert]);

  const handleDecrement = useCallback(() => {
    if (peopleCount > 1) {
      setPeopleCount((prev) => prev - 1);
    } else {
      showAlert();
    }
  }, [peopleCount, showAlert]);

  const handleCountryClick = useCallback((code: string) => {
    setCountryCode(code);
  }, []);

  const peopleList = useMemo(() => {
    return people.map((person: any, index: number) => (
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
      </div>
    ));
  }, [people]);

  return (
    <div>
      <div>
        <h1 style={{ color: 'blue', marginTop: '10px' }}>Nationalities</h1>
        <div>
          <button style={{ marginRight: '10px' }} onClick={() => refetch()}>
            <GrPowerCycle style={{ fontSize: '18px' }} /> Random User
          </button>

          <button onClick={handleDecrement} style={{ padding: '10px 20px', fontSize: '18px' }}>
            -
          </button>
          <input
            type="text"
            value={peopleCount}
            readOnly
            style={{
              width: '50px',
              textAlign: 'center',
              fontSize: '18px',
              padding: '5px',
              border: 'none',
            }}
          />
          <button onClick={handleIncrement} style={{ padding: '10px 20px', fontSize: '18px', marginRight: '10px' }}>
            +
          </button>

          <button
            style={{
              backgroundColor: countryCode === 'tr' ? 'darkblue' : 'lightblue',
              margin: '10px 0px',
              padding: '10px',
              height: '40px',
              width: '80px',
            }}
            onClick={() => handleCountryClick('tr')}
          >
            Türkiye
          </button>
          <button
            style={{
              backgroundColor: countryCode === 'gb' ? 'darkblue' : 'lightblue',
              margin: '10px 0px',
              padding: '10px',
              height: '40px',
              width: '80px',
            }}
            onClick={() => handleCountryClick('gb')}
          >
            İngiltere
          </button>
          <button
            style={{
              backgroundColor: countryCode === 'us' ? 'darkblue' : 'lightblue',
              margin: '10px 0px',
              padding: '10px',
              height: '40px',
              width: '80px',
            }}
            onClick={() => handleCountryClick('us')}
          >
            ABD
          </button>
        </div>
      </div>

      <div className="container">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <p>Error occurred: {error.message}</p>
        ) : (
          peopleList
        )}
      </div>
    </div>
  );
};

export default Location;
