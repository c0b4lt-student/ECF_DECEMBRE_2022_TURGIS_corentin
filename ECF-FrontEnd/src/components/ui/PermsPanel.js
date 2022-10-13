import React, {useState, useEffect} from 'react';
import axios from "axios";
import switch_on from "../../assets/img/switchOn.svg";
import switch_off from "../../assets/img/switchOff.svg";
import "../../css/switch-icn.css";
import {NavLink} from "react-router-dom";

function PermsPanel(props) {
  const user = props.children;

  const [globalPerms, setGlobalPerms] = useState(null);
  const [perms, setPerms] = useState(null);

  useEffect(() => {
    axios.get('https://ecf-decembre-2022.herokuapp.com/?page=front/perms')
      .then (response => {
        setGlobalPerms(response.data);
      })
    axios.get('https://ecf-decembre-2022.herokuapp.com/?page=front/partner/' + user.id_partner + '/perms')
      .then(response => {
        setPerms(response.data);
      })
      .catch(() => {
        setPerms(null)
      });
    if (props.type === 'gym') {
      axios.get('https://ecf-decembre-2022.herokuapp.com/?page=front/gym' + user.id_gym + '/perms')
        .then(response => {
          setPerms(response.data);
        })
        .catch(() => {
          setPerms(null)
        });
    }
  }, []);

  return (
      <div className="accordion-body bg-dark-secondary w-75 h-25 m-auto mb-3 rounded p-0 d-flex flex-column">
        <ul className="m-0 p-0" id="perms-list">
          {
            globalPerms ? (globalPerms.map((globalPerm) => {
              let str = null;
              if (perms) {
                perms.forEach((perm) => {
                  if (globalPerm.id_perm === perm.id_perm) {
                    str = (
                      <li key={perm.id_perm} className='d-flex list-unstyled align-content-center'>
                        <img src={switch_on} alt="Bouton switch oui" className="switch-icn mx-3"/>
                        <p className="m-0 align-self-center">{perm.short_desc_perm}</p>
                      </li>
                    );
                  }
                });
              }
              if (!str) {
                str = (
                  <li key={globalPerm.id_perm} className="list-unstyled d-flex">
                    <img src={switch_off} alt="Bouton switch oui" className="switch-icn mx-3"/>
                    <p className="m-0 align-self-center">{globalPerm.short_desc_perm}</p>
                  </li>
                );
              }
              return str;
            })) : ''
          }
        </ul>
        <NavLink
          to={'/' + props.type + '/'}
          state={{my_user: props.children}}
          type="button"
          className="nav-link bg-succes rounded w-50 align-self-center">
          ...</NavLink>
      </div>
  );
}

export default PermsPanel;
