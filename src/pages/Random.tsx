import { useMemo, useCallback, Profiler } from 'react';
import axios from 'axios';
import { GrPowerCycle } from "react-icons/gr";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';

interface Person {
  image: string;
  name: string;
  surname: string;
  country: string;
  phone: string;
  email: string;
  birthDate: string;
}

const fetchPeople = async (): Promise<Person[]> => {
  const response = await axios.get('https://randomuser.me/api/?results=50');
  return response.data.results.map((person: any) => ({
    image: person.picture.large,
    name: person.name.first,
    surname: person.name.last,
    country: person.location.country,
    phone: person.phone,
    email: person.email,
    birthDate: person.dob.date
  }));
};

const Random = () => {
  const { data: people = [], refetch } = useQuery({
    queryKey: ['people'], 
    queryFn: fetchPeople, 
    enabled: false, 
  });

  const memoizedPeople = useMemo(() => {
    return people.map((person) => ({
      ...person,
    }));
  }, [people]);

  const handleFetchData = useCallback(() => {
    refetch();
  }, [refetch]);

  const onRender = (id: string, phase: string, actualDuration: number, baseDuration: number, startTime: number, commitTime: number) => {
    console.log({ id, phase, actualDuration, baseDuration, startTime, commitTime });
  };

  return (
    <Profiler id="Random" onRender={onRender}>
      <div>
        <div>
          <h1 style={{ color: 'blue', margin: '10px 10px' }}>Popular</h1>
          <button style={{ marginBottom: '15px' }} onClick={handleFetchData}>
            <GrPowerCycle style={{ fontSize: '18px' }} /> Random 50 User
          </button>
        </div>
        <div className="container">
          {memoizedPeople.map((person: Person, index) => (
            <div key={index} className="person-card">
              <img src={person.image} alt={`${person.name} ${person.surname}`} />
              <div className="info">
                <p style={{ marginBottom: '30px' }}>
                  <FaCalendarAlt /> {new Date(person.birthDate).toLocaleDateString()}
                  <FaMapMarkerAlt /> {person.country} <FaUser /> {person.name} {person.surname}
                </p>
                <p>
                  <FaPhone /> {person.phone} <FaEnvelope /> {person.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Profiler>
  );
};

export default Random;
