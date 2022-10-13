import React from 'react';
import ButtonCard from "./ButtonCard";

function PermCard(props) {
  const perm = props.children
  const id = perm.id_perm;
    return (
      <>
        <li>
          <div id={"heading" + id}>
            <button className="bg-secondary w-75 h-25 m-auto mt-3 rounded d-flex flex-column" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse"+id}
                    aria-expanded="true" aria-controls={"collapse" + id}>
              <h3 className="mx-auto">{perm.short_desc_perm}</h3>
              <p className="mx-auto">{perm.long_desc_perm}</p>
            </button>
          </div>
          <div id={"collapse" + id} className="accordion-collapse collapse" aria-labelledby={"heading" + id}
               data-bs-parent="#perms-list">
            <div className="bg-dark-secondary w-75 h-25 m-auto mb-3 rounded p-3">
              <ButtonCard>modifier permission</ButtonCard>
            </div>
          </div>
        </li>
      </>
  );
}

export default PermCard;
