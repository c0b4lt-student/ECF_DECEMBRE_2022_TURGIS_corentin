<?php
  require_once __DIR__."/../Model.php";
  class APIRequester extends Model {
    public function getDBPartners() {
      $req = "SELECT * FROM partners";
      $stmt = $this->getDB()->prepare($req);
      if ($stmt->execute()) {
        if ($stmt->rowCount() >= 1) {
          $partners = $stmt->fetchAll(PDO::FETCH_ASSOC);
          $stmt->closeCursor();
          return $partners;
        } else {
          throw new Exception("Aucuns partenaires dans la base de donnee");
        }
      } else
        throw new Exception("pdo->execute($req) failed");
    }
    public function getDBPartnersFiltered($filter) {
      $req = "SELECT * FROM partners
                WHERE partners.firstname_partner ILIKE :filter
                OR partners.lastname_partner ILIKE :filter
                OR partners.email_partner ILIKE :filter";
      $stmt = $this->getDB()->prepare($req);
      $stmt->bindValue(':filter', '%'.$filter.'%');
      if ($stmt->execute()) {
        if ($stmt->rowCount() >= 1) {
          $partners = $stmt->fetchAll(PDO::FETCH_ASSOC);
          $stmt->closeCursor();
          return $partners;
        } else {
          throw new Exception("Aucuns partenaires trouvé");
        }
      }
    }
    public function getDBPartner($partner_id) {
      if (!ctype_digit($partner_id) || $partner_id == 0)
        throw new Exception('Parametre invalide');
      $req = "SELECT * FROM partners
                WHERE id_partner = :partner_id";
      $stmt = $this->getDB()->prepare($req);
      $stmt->bindValue(':partner_id', $partner_id, PDO::PARAM_INT);
      if ($stmt->execute()) {
        if ($stmt->rowCount() === 1) {
          $partner = $stmt->fetch(PDO::FETCH_ASSOC);
          $stmt->closeCursor();
          return $partner;
        } else {
          $stmt->closeCursor();
          throw new Exception("Plusieurs ou aucuns partenaires avec l'id " . $partner_id);
        }
      } else
        throw new Exception("pdo->execute($req) failed");
    }
    public function getDBPartnerPerms($partner_id) {
      if (!ctype_digit($partner_id) || $partner_id == 0)
        throw new Exception('Parametre invalide');
      $req = "SELECT perms.* FROM perms
                LEFT JOIN partners_auth pa on perms.id_perm = pa.id_perm
                WHERE pa.id_partner = :partner_id";
      $stmt = $this->getDB()->prepare($req);
      $stmt->bindValue(':partner_id', $partner_id, PDO::PARAM_INT);
      if ($stmt->execute()) {
        if ($stmt->rowCount() >= 1) {
          $perms = $stmt->fetchAll(PDO::FETCH_ASSOC);
          $stmt->closeCursor();
          return $perms;
        } else
          throw new Exception("pdo->execute($req) : aucuns resultat");
      } else
        throw new Exception("pdo->execute($req) failed");
    }
    public function getDBPartnerGyms($partner_id) {
      if (!ctype_digit($partner_id) || $partner_id == 0)
        throw new Exception('Parametre invalide');
      $req = "SELECT g.* FROM gyms g
                WHERE g.id_partner = :partner_id";
      $stmt = $this->getDB()->prepare($req);
      $stmt->bindValue(':partner_id', $partner_id, PDO::PARAM_INT);
      if ($stmt->execute()) {
        if ($stmt->rowCount() >= 1) {
          $gyms = $stmt->fetchAll(PDO::FETCH_ASSOC);
          $stmt->closeCursor();
          return $gyms;
        } else
          throw new Exception("pdo->execute($req) : aucuns resultat");
      } else
        throw new Exception("pdo->execute($req) failed");
    }
    public function getDBPartnerManagers($partner_id) {
      if (!ctype_digit($partner_id) || $partner_id == 0)
        throw new Exception('Parametre invalide');
      $req = "SELECT m.* FROM managers m
                LEFT JOIN gyms g on m.id_manager = g.id_manager
                RIGHT JOIN partners p on p.id_partner = g.id_partner
                WHERE g.id_partner = :partner_id";
      $stmt = $this->getDB()->prepare($req);
      $stmt->bindValue(':partner_id', $partner_id, PDO::PARAM_INT);
      if ($stmt->execute()) {
        if ($stmt->rowCount() >= 1) {
          $managers = $stmt->fetchAll(PDO::FETCH_ASSOC);
          $stmt->closeCursor();
          return $managers;
        } else
          throw new Exception("pdo->execute($req) : aucuns resultat");
      } else
        throw new Exception("pdo->execute($req) failed");
    }

    public function getDBGyms() {
      $req = "SELECT * FROM gyms";
      $stmt = $this->getDB()->prepare($req);
      if ($stmt->execute()) {
        if ($stmt->rowCount() >= 1) {
          $gyms = $stmt->fetchAll(PDO::FETCH_ASSOC);
          $stmt->closeCursor();
          return $gyms;
        } else
          throw new Exception("pdo->execute($req) : aucuns resultat");
      } else
        throw new Exception("pdo->execute($req) failed");
    }
    public function getDBGymsFiltered($filter) {
      $req = "SELECT * FROM gyms
                WHERE gyms.name_gym ILIKE :filter
                OR gyms.addr_gym ILIKE :filter
                OR gyms.city_gym ILIKE :filter";
      $stmt = $this->getDB()->prepare($req);
      $stmt->bindValue(':filter', '%'.$filter.'%');
      if ($stmt->execute()) {
        if ($stmt->rowCount() >= 1) {
          $gyms = $stmt->fetchAll(PDO::FETCH_ASSOC);
          $stmt->closeCursor();
          return $gyms;
        } else {
          throw new Exception("Aucune salle trouvé");
        }
      }
    }
    public function getDBGym($id_gym) {
      if (!ctype_digit($id_gym) || $id_gym == 0)
        throw new Exception('Parametre invalide');
      $req = "SELECT * FROM gyms
                WHERE id_gym = :id_gym";
      $stmt = $this->getDB()->prepare($req);
      $stmt->bindValue(':id_gym', $id_gym, PDO::PARAM_INT);
      if ($stmt->execute()) {
        if ($stmt->rowCount() === 1) {
          $gym = $stmt->fetch(PDO::FETCH_ASSOC);
          $stmt->closeCursor();
          return $gym;
        } else {
          $stmt->closeCursor();
          throw new Exception("pdo->execute($req) : aucuns ou trop de resultat");
        }
      } else {
        throw new Exception("pdo->execute($req) failed");
      }
    }
    public function getDBGymPerms($id_gym) {
      if (!ctype_digit($id_gym) || $id_gym == 0)
        throw new Exception('Parametre invalide');
      $req = "SELECT perms.* fROM perms
                LEFT JOIN gyms_auth ga on perms.id_perm = ga.id_perm
                WHERE ga.id_gym = :id_gym";
      $stmt = $this->getDB()->prepare($req);
      $stmt->bindValue(':id_gym', $id_gym, PDO::PARAM_INT);
      if ($stmt->execute()) {
        if ($stmt->rowCount() >= 1) {
          $perms = $stmt->fetchAll(PDO::FETCH_ASSOC);
          $stmt->closeCursor();
          return $perms;
        } else
          throw new Exception("pdo->execute($req) : aucuns resultat");
      } else {
        throw new Exception("pdo->execute($req) : failed");
      }
    }
    public function getDBGymManager($id_gym) {
      if (!ctype_digit($id_gym) || $id_gym == 0)
        throw new Exception('Parametre invalide');
      $req = "SELECT m.* FROM managers m
                LEFT JOIN gyms g on m.id_manager = g.id_manager
                    WHERE g.id_gym = :id_gym";
      $stmt = $this->getDB()->prepare($req);
      $stmt->bindValue(':id_gym', $id_gym, PDO::PARAM_INT);
      if ($stmt->execute()) {
        if ($stmt->rowCount() === 1) {
          $manager = $stmt->fetch(PDO::FETCH_ASSOC);
          $stmt->closeCursor();
          return $manager;
        } else {
          $stmt->closeCursor();
          throw new Exception("pdo->execute($req) : aucuns resultats ou trop de resultats");
        }
      } else
        throw new Exception("pdo->execute($req) : failed");
    }
    public function getDBGymPartner($id_gym) {
      if (!ctype_digit($id_gym) || $id_gym == 0)
        throw new Exception('Parametre invalide');
      $req = "SELECT p.* FROM partners p
                LEFT JOIN gyms g on p.id_partner = g.id_partner
                    WHERE g.id_gym = :id_gym";
      $stmt = $this->getDB()->prepare($req);
      $stmt->bindValue(':id_gym', $id_gym, PDO::PARAM_INT);
      if ($stmt->execute()) {
        if ($stmt->rowCount() === 1) {
          $partner = $stmt->fetch(PDO::FETCH_ASSOC);
          $stmt->closeCursor();
          return $partner;
        } else {
          $stmt->closeCursor();
          throw new Exception("pdo->execute($req) : aucuns ou trop de resultats");
        }
      } else
        throw new Exception("pdo->execute($req) : failed");
    }

    public function getDBPerms() {
      $req = "SELECT * FROM perms";
      $stmt = $this->getDB()->prepare($req);
      if ($stmt->execute()) {
        if ($stmt->rowCount() >= 1) {
          $perms = $stmt->fetchALL(PDO::FETCH_ASSOC);
          $stmt->closeCursor();
          return $perms;
        } else
          throw new Exception("pdo->execute($req) : aucuns resultat");
      } else
        throw new Exception("pdo->execute($req) : failed");
    }
  }