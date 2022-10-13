import React from 'react';
import {NavLink} from "react-router-dom";

function ButtonCard(props) {
  return (
    <article className="d-flex align-self-center w-75 p-2 m-auto mt-3 bg-secondary rounded">
      <NavLink
        to={props.path}
        state={{item: props.item}}
        type="button"
        className="w-75 m-auto p-1 rounded bg-succes text-decoration-none text-black"
        >{props.children}</NavLink>
    </article>
  );
}

export default ButtonCard;
