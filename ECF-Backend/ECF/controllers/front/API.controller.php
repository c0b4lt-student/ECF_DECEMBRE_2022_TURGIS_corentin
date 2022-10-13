<?php
require_once __DIR__."/../../models/front/API.requester.php";
require_once __DIR__."/../../models/Model.php";

  class APIController {
    private $requester;

    public function __construct() {
      $this->requester = new APIRequester();
    }

    public function getPartners() {
      $partners = $this->requester->getDBPartners();
      Model::sendJSON($partners);
    }
    public function getPartnersFiltered($filter) {
      $partners = $this->requester->getDBPartnersFiltered($filter);
      Model::sendJSON($partners);
    }
    public function getPartner($id_partner) {
      $partner = $this->requester->getDBPartner($id_partner);
      Model::sendJSON($partner);
    }
    public function getPartnerPerms($id_partner) {
      $perms = $this->requester->getDBPartnerPerms($id_partner);
      Model::sendJSON($perms);
    }
    public function getPartnerGyms($id_partner) {
      $gyms = $this->requester->getDBPartnerGyms($id_partner);
      Model::sendJSON($gyms);
    }
    public function getPartnerManagers($id_partner) {
      $managers = $this->requester->getDBPartnerManagers($id_partner);
      Model::sendJSON($managers);
    }

    public function getGyms() {
      $gyms = $this->requester->getDBGyms();
      Model::sendJSON($gyms);
    }
    public function getGymsFiltered($filter) {
      $gyms = $this->requester->getDBGymsFiltered($filter);
      Model::sendJSON($gyms);
    }
    public function getGym($id_gym) {
      $gym = $this->requester->getDBGym($id_gym);
      Model::sendJSON($gym);
    }
    public function getGymPerms($id_gym) {
      $perms = $this->requester->getDBGymPerms($id_gym);
      Model::sendJSON($perms);
    }
    public function getGymManager($id_gym) {
      $manager = $this->requester->getDBGymManager($id_gym);
      Model::sendJSON($manager);
    }
    public function getGymPartner($id_gym) {
      $partner = $this->requester->getDBGymPartner($id_gym);
      Model::sendJSON($partner);
    }

    public function getPerms() {
      $perms = $this->requester->getDBPerms();
      Model::sendJSON($perms);
    }
  }