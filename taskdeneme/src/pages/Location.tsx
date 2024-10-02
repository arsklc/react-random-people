import { useState } from 'react';
import axios from 'axios';

const Location = () => {
  const [people, setPeople] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<string>('tr');
  const [peopleCount, setPeopleCount] = useState<number>(10);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const response = await axios.get(
        `https://randomuser.me/api/?results=${peopleCount}&nat=${countryCode}`
      );
      
      const fetchedPeople = response.data.results.map((person: any) => ({
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
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(event.target.value); 
  };

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value >= 1 && value <= 100) {
      setPeopleCount(value);
    } else {
      setPeopleCount(10);
    }
  };

  return (
    <div>
      <div>
        <h1>Rastgele Kişiler Getir</h1>
        <label htmlFor="country">Ülke Seçin:</label>
        <select id="country" onChange={handleCountryChange} value={countryCode}>
          <option value="tr">Türkiye</option>
          <option value="gb">İngiltere</option>
          <option value="us">ABD</option>
        </select>
        <br />
        <label htmlFor="count">Listelenecek kişi sayısı:</label>
        <input
          type="number"
          id="count"
          min="1"
          max="100"
          value={peopleCount}
          onChange={handleCountChange}
        />
        <button onClick={fetchData}>Seçilen Konumdan Kişileri Getir</button>
      </div>
      <div className='container'>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          people.map((person, index) => (
            <div key={index} className="person-card">
              <img src={person.image} alt="Person's image" />
              <h2>{person.name} {person.surname}</h2>
              <p>Gender: {person.gender}</p>
              <p>Age: {person.age}</p>
              <p>Location: {person.city}, {person.country}</p>
            </div>
          ))
        )}
      </div>      
    </div>
  );
};

export default Location;
