import React from 'react';
import green_light from '../../../assets/img/active_light.gif';
import red_light from "../../../assets/img/unactive_light.gif";
import '../../../css/led.css';
import PermsPanel from "../PermsPanel";

function PartnerCard(props) {
  const partner = props.children
  const id = partner.id_partner;

  return (
    <>
      <li>
        <div id={"heading" + id}>
          <button className="bg-secondary w-75 h-25 m-auto mt-3 rounded d-flex flex-column" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse"+id}
                  aria-expanded="true" aria-controls={"collapse" + id}>
            <img src={partner.is_active_partner ? green_light : red_light} alt="Partenaire actif" className="led-img m-0 p-0"/>
            <h3 className="mx-auto">{partner.lastname_partner.toUpperCase()} {partner.firstname_partner}</h3>
            <p className="mx-auto">{partner.email_partner}</p>
          </button>
        </div>
        <div id={"collapse" + id} className="accordion-collapse collapse" aria-labelledby={"heading" + id}
             data-bs-parent="#partners-list">
          <div>
            <PermsPanel type="partner" my_id={id}>{partner}</PermsPanel>
          </div>
        </div>
      </li>
    </>
  );
}

export default PartnerCard;
