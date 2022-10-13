import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import axios from "axios";
import ButtonCard from "../../../components/ui/cards/ButtonCard";
import HeaderGoSport from "../../../components/ui/HeaderGoSport";

function PartnerPage(props) {
  let location = useLocation();
  const partner = location.state.my_user;
  const [gyms, setGyms] = useState(null);

  useEffect( () => {
    axios.get('https://ecf-decembre-2022.herokuapp.com/?page=front/partner/' + partner.id_partner + '/gyms')
    .then(response => {
      setGyms(response.data);
    })}, []);

  const partner_info = partner ? (
    <>
      <div className="bg-secondary rounded d-flex flex-column mt-4">
        <div className="d-flex justify-content-between">
          <p className="h3">Nom</p><p className="h3 align-self-center">{partner.lastname_partner.toUpperCase()}</p>
        </div>

        <div className="d-flex justify-content-between">
          <p className="h3">Prenom</p><p className="h3 align-self-center">{partner.firstname_partner}</p>
        </div>

        <div className="d-flex justify-content-between">
          <p className="h3">Email</p><p className="h3 align-self-center">{partner.email_partner}</p>
        </div>

        <div className="d-flex justify-content-between">
          <p className="h3">Actif</p><p className="h3 align-self-center">{partner.is_active_partner ? 'OUI' : 'NON'}</p>
        </div>
        <ButtonCard path="/new-partner" item={partner}>Modifier le partenaire</ButtonCard>
      </div>
    </>
  ) : '';

  const gyms_info = gyms ? gyms.map((gym) => {
    return (
        <div key={gym.id_gym}>
          <div className="header-go-sport bg-primary d-flex flex-column border border-dark mt-5">
            <h2 className="align-self-center h2">Salle {gym.name_gym}</h2>
          </div>
          <div className="bg-secondary rounded d-flex flex-column mt-1">
            <div className="d-flex justify-content-between">
              <p className="h3">Adresse</p><p className="h3 align-self-center">{gym.addr_gym}</p>
            </div>

            <div className="d-flex justify-content-between">
              <p className="h3">Ville</p><p className="align-self-center h3">{gym.city_gym}</p>
            </div>

            <div className="d-flex justify-content-between">
              <p className="h3">Creation</p><p className="align-self-center h3">{new Date(gym.create_date_gym).toLocaleDateString()}</p>
            </div>

            <div className="d-flex justify-content-between">
              <p className="h3">Active</p><p className="align-self-center h3">{gym.is_active_gym ? 'OUI' : 'NON'}</p>
            </div>

            <ButtonCard path="/new-gym" item={gym}>Modifier la Salle</ButtonCard>
          </div>
        </div>
    )
  }) : ''

  return (
    <>
      <HeaderGoSport>Partenaire {partner.name_partner}</HeaderGoSport>
      {partner ? partner_info : ''}
      {gyms ? gyms_info : ''}
    </>
  );
}

export default PartnerPage;
