import React, {useState, useEffect} from 'react';
import SearchBar from "./ui/SearchBar";
import GymCard from "./ui/cards/GymCard";
import axios from "axios";

function GymsList(props) {
  const [gyms, setGyms] = useState(null);
  const [filterActive, setFilterActive] = useState('Toute');

  function handleChange(filter) {
    axios.get('https://ecf-decembre-2022.herokuapp.com/?page=front/gyms/' + filter)
      .then(response => {
        setGyms(response.data);
      })
  }

  useEffect(() => {
    if (!gyms) {
      axios.get('https://ecf-decembre-2022.herokuapp.com/?page=front/gyms')
        .then(response => {
          setGyms(response.data);
        })
    }
  }, []);

  return (
    <>
      <SearchBar key={0} handleChange={handleChange}/>
      <div className="dropdown-center d-flex align-content-center m-auto mt-2">
        <button className="btn btn-secondary dropdown-toggle w-75 m-auto" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
          {filterActive}
        </button>
        <ul className="dropdown-menu">
          <li className="dropdown-item" onClick={(e) => setFilterActive(e.currentTarget.innerHTML)}>Toute</li>
          <li className="dropdown-item" onClick={(e) => setFilterActive(e.currentTarget.innerHTML)}>Active</li>
          <li className="dropdown-item" onClick={(e) => setFilterActive(e.currentTarget.innerHTML)}>Non active</li>
        </ul>
      </div>
      <ul className="m-0 p-0 accordion" id="gyms-list">
        {
          gyms ? (gyms.map((gym) => {
            if (filterActive === 'Toute') {
              return (
                <GymCard key={gym.id_gym}>{gym}</GymCard>
              );
            } else if (filterActive === 'Active') {
              if (gym.is_active_gym) {
                return (
                  <GymCard key={gym.id_gym}>{gym}</GymCard>
                );
              }
            } else if (filterActive === 'Non active') {
              if (!gym.is_active_gym) {
                return (
                  <GymCard key={gym.id_gym}>{gym}</GymCard>
                );
              }
            }
          })) : ''
        }
      </ul>
    </>
  );
}

export default GymsList;