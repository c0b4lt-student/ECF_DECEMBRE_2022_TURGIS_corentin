import React from 'react';

function HeaderGoSport(props) {
  return (
    <div className="header-go-sport bg-primary d-flex flex-column border border-dark">
      <h1 className="align-self-center h1">GO SPORT</h1>
      <h2 className="align-self-center h2">{props.children}</h2>
    </div>
  );
}

export default HeaderGoSport;

