import React, {useEffect} from 'react';
import ButtonCard from "../../../components/ui/cards/ButtonCard";
import HeaderGoSport from "../../../components/ui/HeaderGoSport";
import PartnersList from "../../../components/PartnersList";

function PartnersPage(props) {
  useEffect(() => {
    document.title = "Partenaires"
  }, []);

  return (
    <main>
      <HeaderGoSport>Partenaires</HeaderGoSport>
      <ButtonCard path="/new-partner" item={null}>Ajouter un partenaire</ButtonCard>
      <PartnersList />
    </main>
  );
}

export default PartnersPage;
