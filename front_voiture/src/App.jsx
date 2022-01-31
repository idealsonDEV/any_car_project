import React from "react";
import {Switch, Route, Link } from "react-router-dom";
import "./styles/bootstrap.min.css";
import "./styles/common.css";
import LoginPage from "./Pages/loginPage";
import RegisterPage from "./Pages/registerPage";
import HomePage from "./Pages/homePage";
import CarPage from "./Pages/carPage";
import CarEditPage from "./Pages/carEditPage";
import Logout from "./Pages/logout";
import makeToast from "./Toaster/toaster";
import NabarC from "./Pages/Components/navbarComponent";

function App() {
    const token = localStorage.getItem('Car_Token');
    const namev = localStorage.getItem('Car_UserName');

  return (
    <div className="App">
        <div className="container-fluid">
            <NabarC/>
        	<Switch>
        		<Route exact path='/' component={HomePage} />
        		<Route exact path="/login" component={LoginPage}/>
        		<Route exact path="/register" component={RegisterPage}/>
        		<Route exact path="/car/:id" component={CarPage}/>
        		<Route exact path="/new" component={CarEditPage}/>
                <Route exact path="/logout" component={Logout}/>
        	</Switch>
        </div>
    </div>
  );
}

export default App;
