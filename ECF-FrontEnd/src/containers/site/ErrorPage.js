import React, {useEffect} from 'react';
import HeaderGoSport from "../../components/ui/HeaderGoSport";

function ErrorPage(props) {
  useEffect(() => {
    document.title = "Erreur" + props.error_no;
  }, []);

  return (
    <div>
      <HeaderGoSport>Erreur {props.error_no}</HeaderGoSport>
      <p>{props.children}</p>
    </div>
  );
}

export default ErrorPage;
