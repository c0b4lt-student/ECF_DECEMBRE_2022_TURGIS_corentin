import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import HeaderGoSport from "../../../components/ui/HeaderGoSport";
import axios from "axios";
import ButtonCard from "../../../components/ui/cards/ButtonCard";

function GymPage(props) {
  let location = useLocation();
  const gym = location.state.my_user;
  const [manager, setManager] = useState(null);
  const [partner, setPartner] = useState(null);

  useEffect( () => {
    axios.get('https://ecf-decembre-2022.herokuapp.com/?page=front/gym/' + gym.id_gym + '/manager')
      .then(response => {
        setManager(response.data);
      })
    axios.get('https://ecf-decembre-2022.herokuapp.com/?page=front/gym/' + gym.id_gym + '/partner')
      .then(response => {
        setPartner(response.data)
      })
    },[]
  );

  const gym_infos = gym ? (
    <>
      <HeaderGoSport>Salle {gym.name_gym}</HeaderGoSport>
      <div className="bg-secondary rounded d-flex flex-column mt-4">
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

        <ButtonCard path="/new-gym" item={gym} />
      </div>
    </>
  ) : '';

  const manager_info = manager ? (
    <>
      <div className="header-go-sport bg-primary d-flex flex-column border border-dark mt-5">
        <h2 className="align-self-center h2">Manager</h2>
      </div>
      <div className="bg-secondary rounded d-flex flex-column mt-1">
        <div className="d-flex justify-content-between">
          <p className="h3">Nom</p><p className="h3 align-self-center">{manager.lastname_manager.toUpperCase()}</p>
        </div>

        <div className="d-flex justify-content-between">
          <p className="h3">Prenom</p><p className="h3 align-self-center">{manager.firstname_manager}</p>
        </div>

        <div className="d-flex justify-content-between">
          <p className="h3">Email</p><p className="h3 align-self-center">{manager.email_manager}</p>
        </div>

        <div className="d-flex justify-content-between">
          <p className="h3">Depuis</p><p className="h3 align-self-center">{new Date(manager.create_date_manager).toLocaleDateString()}</p>
        </div>
      </div>
    </>
  ) : '';

  const partner_info = partner ? (
    <>
      <div className="header-go-sport bg-primary d-flex flex-column border border-dark mt-5">
        <h2 className="align-self-center h2">Partenaire</h2>
      </div>
      <div className="bg-secondary rounded d-flex flex-column mt-1">
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
          <p className="h3">Actif</p><p className="h3 align-self-center">{partner.is_actif_partner ? 'OUI' : 'NON'}</p>
        </div>
        <ButtonCard path="/new-partner" item={partner}>Modifier le partenaire</ButtonCard>
      </div>
    </>
  ) : '';

  return (
    <>
      {gym ? gym_infos : ''}

      {manager ? manager_info : ''}

      {partner ? partner_info: ''}
    </>
  );
}

export default GymPage;
