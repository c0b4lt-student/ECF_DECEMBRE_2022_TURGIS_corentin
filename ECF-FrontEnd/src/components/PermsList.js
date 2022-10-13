import React, {useEffect, useState} from 'react';
import axios from "axios";
import SearchBar from "./ui/SearchBar";
import PermCard from "./ui/cards/PermCard";

function PermsList(props) {
  const [perms, setPerms] = useState(null);

  useEffect(() => {
    axios.get('https://ecf-decembre-2022.herokuapp.com/?page=front/perms')
      .then(response => {
        setPerms(response.data);
      })
  }, []);

  return (
    <>
      <SearchBar key={0}/>
      <ul className="m-0 p-0 accordion" id="perms-list">
        {
          perms ? (perms.map((perm) => {
            return (
              <PermCard key={perm.id_perm}>{perm}</PermCard>
            );
          })) : ''
        }
      </ul>
    </>
  );
}

export default PermsList;
