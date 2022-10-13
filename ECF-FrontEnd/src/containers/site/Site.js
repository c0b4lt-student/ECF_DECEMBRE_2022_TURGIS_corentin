import React from 'react';
import Accueil from "./Accueil";
import {Route, Routes} from "react-router-dom";
import PartnersPage from "./list-page/PartnersPage";
import GymsPage from "./list-page/GymsPage";
import PermsPage from "./list-page/PermsPage";
import NavBar from "../../components/ui/navbar/NavBar";
import ErrorPage from "./ErrorPage";
import PartnerPage from "./item-page/PartnerPage";
import GymPage from "./item-page/GymPage";
import NewGym from "./new/NewGym";
import NewPartner from "./new/NewPartner";
import NewPerm from "./new/NewPerm";

function Site(props) {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Accueil />} />
        <Route exact path="/partners" element={<PartnersPage />} />
        <Route exact path="/partner" element={<PartnerPage />} />
        <Route exact path="/gyms" element={<GymsPage />} />
        <Route exact path="/gym" element={<GymPage />} />
        <Route exact path="/perms" element={<PermsPage />} />
        <Route exact path="/new-partner" element={<NewPartner />} />
        <Route exact path="/new-gym" element={<NewGym />} />
        <Route exact path="/new-perm" element={<NewPerm />} />

        <Route path='*' element={<ErrorPage error_no={404}>La page demandée n'existe pas</ErrorPage>} />
      </Routes>
    </>
  );
}

export default Site;
