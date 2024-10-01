import { useState } from 'react';
import axios from 'axios';

const Random = () => {
  const [people, setPeople] = useState<any[]>([]);

  const fetchData = async () => {
    try {

      const response = await axios.get('https://randomuser.me/api/?results=200');
      console.log(response.data);

      const fetchedPeople = response.data.results
        .filter((person: any) => person.gender === 'female')
        .map((person: any) => ({
          gender: person.gender,
          name: person.name.first,
          surname: person.name.last,
          age: person.registered.age,
          city: person.location.city,
          country: person.location.country,
        }));

      setPeople(fetchedPeople);
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>50 Yeni Kişi Getir</button>
      {people.length > 0 ? (
        people.map((person, index) => (
          <div className="person-card" key={index}>
            <h2>
              Fullname: {person.name} {person.surname} | Gender: {person.gender} | Age: {person.age} | Location: {person.city}, {person.country}
            </h2>
          </div>
        ))
      ) : (
        <p>Kişi bulunamadı.</p>
      )}
    </div>
  );
}

export default Random;