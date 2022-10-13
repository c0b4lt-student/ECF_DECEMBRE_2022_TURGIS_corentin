import React, {useEffect, useState} from 'react';
import HeaderGoSport from "../../../components/ui/HeaderGoSport";
import axios from "axios";

function NewPartner(props) {
  const [globalPerms, setGlobalPerms] = useState(null);
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [partnerPerms, setPartnerPerms] = useState(null);

  function onPermChange(e, id) {
    if (partnerPerms) {
      let newTab = [...partnerPerms];
      newTab[id].is_checked = !partnerPerms[id].is_checked
      setPartnerPerms(newTab);
    }
    if (!partnerPerms) {
      let tab = [];
      globalPerms.forEach((perm) => {
        tab[perm.id_perm] = {id:perm.id_perm, is_checked: false}
      })
      setPartnerPerms(tab);
    }
      console.log(partnerPerms)
  }

  function checkEmail() {
    if (!email)
      return '';
    const reg_email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (reg_email.test(email.toString()))
      return email.toLowerCase();
    return '';
  }
  function checkText(str) {
    if (!str)
      return '';
    const regex = /^[a-zA-Z]+$/g
    if (str === '' || str.length <= 2)
      return '';
    if (regex.test(str))
      return str.toLowerCase();
    return '';
  }
  function handleConfirmButton() {
    const email = checkEmail();
    const fname = checkText(firstName);
    const lname = checkText(lastName);

    if (email !== '' && fname !== '' && lname !== '')
      console.log("Infos valides");
    else
      console.log("Infos Invalides");
  }

  useEffect( () => {
    if (!globalPerms) {
      axios.get('https://ecf-decembre-2022.herokuapp.com/?page=front/perms')
        .then(response => {
          setGlobalPerms(response.data);
        })
    }
  }, []);

  const perm_panel = (
      <>
        <form>
          {
            (globalPerms) ? globalPerms.map((perm) => {
              return (
                <div className="form-check form-switch p-2" key={perm.id_perm}>
                  <input className="form-check-input h5 mx-4" type="checkbox" id={"i-perm-" + perm.id_perm}
                         onChange={(e) => onPermChange(e, perm.id_perm)}
                  />
                  <label className="form-check-label h5" htmlFor={"i-perm-" + perm.id_perm}>{perm.short_desc_perm}</label>
                </div>
              )
            }) : ''
          }
        </form>
      </>
    )

  return (
    <div>
      <HeaderGoSport>Nouveau Partenaire</HeaderGoSport>
      <div className="form-group">
        <label className="form-label mt-4 h3">Informations Partenaire :</label>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="i-name-partner" placeholder="DUPONT" onChange={(e) => setLastName(e.currentTarget.value)}/>
            <label htmlFor="input-name">Nom de famille</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="i-fname-partner" placeholder="Jean" onChange={(e) => setFirstName(e.currentTarget.value)} />
            <label htmlFor="input-fname">Prenom</label>
        </div>
        <div className="form-floating">
          <input type="email" className="form-control" id="i-email-partner" placeholder="jean.dupont@gosport.fr" onChange={(e) => setEmail(e.currentTarget.value)}/>
          <label htmlFor="floatingPassword">email</label>
        </div>

        <label className="form-label mt-4 h3">Permissions globales :</label>
        {perm_panel ? perm_panel : ''}

        <button type="button" className="btn btn-primary m-4" onClick={handleConfirmButton}>Valider</button>
      </div>
    </div>
  );
}

export default NewPartner;
