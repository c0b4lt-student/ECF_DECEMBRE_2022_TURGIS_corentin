import React, {useState, useEffect} from 'react';
import SearchBar from "./ui/SearchBar";
import PartnerCard from "./ui/cards/PartnerCard";
import axios from "axios";

function PartnersList(props) {
  const [partners, setPartners] = useState(null);
  const [filterActive, setFilterActive] = useState('Tous');
  function handleSearch(filter) {
    axios.get('https://ecf-decembre-2022.herokuapp.com/?page=front/partners/' + filter)
      .then(response => {
        setPartners(response.data);
      })
  }

  useEffect(() => {
    if (!partners) {
      axios.get('https://ecf-decembre-2022.herokuapp.com/?page=front/partners')
        .then(response => {
          setPartners(response.data);
        })
    }
  }, []);

  return (
    <>
      <SearchBar key={0} handleChange={handleSearch} />
      <div className="dropdown-center d-flex align-content-center m-auto mt-2">
        <button className="btn btn-secondary dropdown-toggle w-75 m-auto" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
          {filterActive}
        </button>
        <ul className="dropdown-menu">
          <li className="dropdown-item" onClick={(e) => setFilterActive(e.currentTarget.innerHTML)}>Tous</li>
          <li className="dropdown-item" onClick={(e) => setFilterActive(e.currentTarget.innerHTML)}>Actif</li>
          <li className="dropdown-item" onClick={(e) => setFilterActive(e.currentTarget.innerHTML)}>Non actif</li>
        </ul>
      </div>
      <ul className="m-0 p-0 accordion" id="partners-list">
      {
        partners ? (partners.map((partner) => {
          if (filterActive === 'Tous') {
            return (
              <PartnerCard key={partner.id_partner}>{partner}</PartnerCard>
            );
          } else if (filterActive === 'Actif') {
            if (partner.is_active_partner) {
              return (
                <PartnerCard key={partner.id_partner}>{partner}</PartnerCard>
              );
            }
          } else if (filterActive === 'Non actif') {
            if (!partner.is_active_partner) {
              return (
                <PartnerCard key={partner.id_partner}>{partner}</PartnerCard>
              );
            }
          }
        })) : ''
      }
      </ul>
    </>
  );
}

export default PartnersList;

