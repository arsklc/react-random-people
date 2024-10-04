import { useState } from 'react';
import axios from 'axios';
import { GrPowerCycle } from "react-icons/gr";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt,FaUser } from "react-icons/fa";


const Random = () => {
  const [people, setPeople] = useState<any[]>([]);

  const fetchData = async () => {
    try {

      const response = await axios.get('https://randomuser.me/api/?results=50');
      console.log(response.data);

      const fetchedPeople = response.data.results
        .map((person: any) => ({
          image: person.picture.large,
        name: person.name.first,
        surname: person.name.last,
        country: person.location.country,
        phone: person.phone,
        email: person.email,
        birthDate: person.dob.date
        }));

      setPeople(fetchedPeople);
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  return (
    <div>
      <div>
        <h1 style={{color:'blue',margin:'10px 10px'}}>Popular</h1>
        <button style={{marginBottom:'15px'}} onClick={fetchData}><GrPowerCycle style={{fontSize:'18px'}}/> Random 50 User </button>
      </div>
      <div className="container">      
        {people.map((person, index) => (
          <div key={index} className="person-card">
          <img src={person.image}/>
          <div className="info">
            <p style={{marginBottom:'30px'}}><FaCalendarAlt /> {new Date(person.birthDate).toLocaleDateString()}  <FaMapMarkerAlt />{person.country} <FaUser/>{person.name} {person.surname}</p>
            <p><FaPhone /> {person.phone}  <FaEnvelope /> {person.email}</p>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default Random;