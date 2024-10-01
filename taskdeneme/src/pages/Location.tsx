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
      const fetchedPeople: any[] = [];
      const requests = [];

      for (let i = 0; i < peopleCount; i++) {
        requests.push(axios.get(`https://randomuser.me/api/?nat=${countryCode}`));
      }

      const responses = await Promise.all(requests);

      responses.forEach((response) => {
        const fetchedPerson = response.data.results[0];

        fetchedPeople.push({
          gender: fetchedPerson.gender,
          name: fetchedPerson.name.first,
          surname: fetchedPerson.name.last,
          age: fetchedPerson.registered.age,
          city: fetchedPerson.location.city,
          country: fetchedPerson.location.country,
        });
      });

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
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        people.map((person, index) => (
          <div className="person-card" key={index}>
            <h2>
              Fullname: {person.name} {person.surname} | Gender: {person.gender} | Age: {person.age} | Location: {person.city}, {person.country}
            </h2>
          </div>
        ))
      )}
    </div>
  );
};

export default Location;
