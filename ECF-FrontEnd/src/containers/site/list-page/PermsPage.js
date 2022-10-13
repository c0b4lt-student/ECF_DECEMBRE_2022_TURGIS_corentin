import React, {useEffect} from 'react';
import HeaderGoSport from "../../../components/ui/HeaderGoSport";
import ButtonCard from "../../../components/ui/cards/ButtonCard";
import PermsList from "../../../components/PermsList";

function PermsPage(props) {
  useEffect(() => {
    document.title = "Permissions";
  }, []);

  return (
    <main>
      <HeaderGoSport>Permissions</HeaderGoSport>
      <ButtonCard path="/new-perm" item={null}>Ajouter une permission</ButtonCard>
      <PermsList />
    </main>
  );
}

export default PermsPage;