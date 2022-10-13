<?php
//Definis le routage de mon site, monsite/backend et monsite/frontend
  define("URL", str_replace("index.php", "",
    (isset($_SERVER['HTTPS']) ? "https" : "http")."://$_SERVER[HTTP_HOST]$_SERVER[PHP_SELF]"));
  //URL me permet d'ecrire le debut de l url de mon site qui est toujours http|https://nomDeLhote(heroku)/backend/
  //Pour simplifier les requettes lors de la demande de ressources exemple : URL/partner ou URL/gyms ou encore URL/permissions

require_once __DIR__ . "/ECF/controllers/front/API.controller.php";
$api_controller = new APIController();
try {
  if (empty($_GET['page'])) {
    throw new Exception("404 not found");
  } else {
    //Filtre l'url, et l'explose dans un tableau pour simplifier les requetes : /partner/ajout/jean-claude.... = ['partner', 'ajout', 'Jean-claude', '...'];
    $url = explode("/", filter_var($_GET['page'], FILTER_SANITIZE_URL));
    if (empty($url[0]) || empty($url[1])) //Je VEUX un url/back/quelquechose
      throw new Exception("404 not found");
    switch ($url[0]) {
      case "front" :
        switch ($url[1]) {
          case "partners":
            if (empty($url[2]))
              $api_controller->getPartners();
            else {
              $api_controller->getPartnersFiltered($url[2]);
            }
            break;
          case "partner":
            if (empty($url[2]))
              throw new Exception("404 not found");
            else if (empty($url[3])) {
              $api_controller->getPartner($url[2]);
            } else {
              switch ($url[3]) {
                case "perms": $api_controller->getPartnerPerms($url[2]);
                  break;
                case "gyms": $api_controller->getPartnerGyms($url[2]);
                  break;
                case "managers": $api_controller->getPartnerManagers($url[2]);
                  break;
                default:
                  throw new Exception("404 not found");
              }
            }
            break; //partner/uuid/perms
          case "gyms":
            if (empty($url[2]))
              $api_controller->getGyms();
            else
              $api_controller->getGymsFiltered($url[2]);
            break;
          case "gym":
            if (empty($url[2]))
              throw new Exception("404 not found");
            else if (empty($url[3])) {
              $api_controller->getGym($url[2]);
            } else {
              switch ($url[3]) {
                case "partner": $api_controller->getGymPartner($url[2]);
                  break;
                case "perms": $api_controller->getGymPerms($url[2]);
                  break;
                case "manager": $api_controller->getGymManager($url[2]);
                  break;
                default: throw new Exception("404 not found");
              }
            }
            break;
          case "perms": $api_controller->getPerms();
            break;
          default: throw new Exception("404 not found");
        }
      break;
      case "back" :
        echo "Page back demandée";
      break;
      default : throw new Exception("404 not found");
    }
  }
} catch (Exception $e) {
    $msg =$e->getMessage();
    Model::sendJSON(null);
}