import { useState } from 'react';
import axios from 'axios';

const Random = () => {
  const [people, setPeople] = useState<any[]>([]);

  const fetchData = async () => {
    try {

      const response = await axios.get('https://randomuser.me/api/?results=50');
      console.log(response.data);

      const fetchedPeople = response.data.results
        .map((person: any) => ({
          image: person.picture.large,
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
      <div>
        <button onClick={fetchData}>50 Yeni Kişi Getir</button>
      </div>
      <div className="container">      
        {people.map((person, index) => (
          <div key={index} className="person-card">
            <img src={person.image} alt="Person's image" />
            <h2>{person.name} {person.surname}</h2>
            <p>Gender: {person.gender}</p>
            <p>Age: {person.age}</p>
            <p>Location: {person.city}, {person.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Random;