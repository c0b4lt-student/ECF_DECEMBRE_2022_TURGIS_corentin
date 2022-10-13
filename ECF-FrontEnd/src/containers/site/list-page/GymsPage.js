import React, {useEffect} from 'react';
import HeaderGoSport from "../../../components/ui/HeaderGoSport";
import ButtonCard from "../../../components/ui/cards/ButtonCard";
import GymsList from "../../../components/GymsList";

function GymsPage(props) {
  useEffect(() => {
    document.title = "Salles";
  }, []);
  return (
    <main>
      <HeaderGoSport>Salles</HeaderGoSport>
      <ButtonCard path="/new-gym" item={null}>Ajouter une salle</ButtonCard>
      <GymsList />
    </main>
  );
}

export default GymsPage;
