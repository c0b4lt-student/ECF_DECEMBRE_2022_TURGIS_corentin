import React from 'react';

function SearchBar(props) {
  return (
    <aside className="d-flex align-self-center input-group rounded m-auto mt-2 w-75">
      <input type="search" className="form-control rounded" placeholder="Filtrer la recherche" onChange={(e) => props.handleChange(e.currentTarget.value)} />
    </aside>
  );
}

export default SearchBar;
