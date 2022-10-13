import React from 'react';
import green_light from '../../../assets/img/active_light.gif';
import red_light from "../../../assets/img/unactive_light.gif";
import '../../../css/led.css';
import PermsPanel from "../PermsPanel";

function GymCard(props) {
  const gym = props.children
  const id = gym.id_gym;

  return (
    <>
      <li>
        <div id={"heading" + id}>
          <button className="bg-secondary w-75 h-25 m-auto mt-3 rounded d-flex flex-column" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse"+id}
                  aria-expanded="true" aria-controls={"collapse" + id}>
            <img src={gym.is_active_gym ? green_light : red_light} alt="Salle active" className="led-img m-0 p-0"/>
            <h3 className="mx-auto">{gym.name_gym.toUpperCase()}</h3>
            <p className="mx-auto">{gym.addr_gym}</p>
            <p className="mx-auto">{gym.city_gym}</p>
          </button>
        </div>
        <div id={"collapse" + id} className="accordion-collapse collapse" aria-labelledby={"heading" + id}
             data-bs-parent="#gyms-list">
          <div>
            <PermsPanel type="gym" my_id={id}>{gym}</PermsPanel>
          </div>
        </div>
      </li>
    </>
  );
}

export default GymCard;
