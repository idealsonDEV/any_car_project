import React from "react";
import {Link } from "react-router-dom";
import makeToast from "../../Toaster/toaster";

function NabarC(props) {
	const token = localStorage.getItem('Car_Token');
    const namev = localStorage.getItem('Car_UserName');

    const logoutUser = () => {
        localStorage.removeItem("Car_Token");
        localStorage.removeItem("Car_UserId");
        localStorage.removeItem("Car_UserName");
        makeToast("success", "Déconnéxion");
        setTimeout(() =>{
        	props.history.push("/login");
        }, 2000);
    };

	return (
            <nav className="navbar navbar-expand-sm navbar-light bg-dark">
                  <Link to={'/'} className="nav-link text-light font-weight-bold"> Acceuil </Link>
               {token && (
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={'/new'} className="nav-link text-light font-weight-bold btn btn-secondary"> Nouvelle Voiture </Link>
                    </li>
                    <li className="nav-item dropdown">
                      <a href="#" className="nav-link text-light font-weight-bold dropdown-toggle" type="button">
                      {namev}
                      </a>
                          <div className="dropdown-menu">
                              <Link to={"#"} className="dropdown-item" href="#" onClick={logoutUser}>Déconnéxion</Link>
                          </div>
                    </li>
                  </ul>
              )}
              {!token && (
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={'/login'} className="nav-link text-light font-weight-bold btn btn-primary" type="button" data-toggle="modal"> Se Connecter </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={'/register'} className="nav-link text-light font-weight-bold btn btn-danger" type="button" data-toggle="modal"> S'enregistrer </Link>
                    </li>
                  </ul>
               )}
            </nav>)
}

export default NabarC;