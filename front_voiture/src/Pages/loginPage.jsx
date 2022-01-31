import React from 'react';
import axios from "axios";
import makeToast from "../Toaster/toaster";

const Login = (props) => {
	const emailRef = React.createRef();
	const passwordRef = React.createRef();

	const loginUser = () => {
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const userdata = {
			email,
			password,
		};

		axios.post("http://localhost:8000/login", userdata)
		.then((response) => {
			//console.log(response.data)
			makeToast("success", response.data.message);
			localStorage.setItem("Car_Token", response.data.token);
			localStorage.setItem("Car_UserId", response.data.user_id);
			localStorage.setItem("Car_UserName", response.data.user_name);
			props.history.push("/");
		})
		.catch((err) => {
			//console.log(err.response.data.message)
			makeToast("error", err.response.data.message);
		});
	};
	return (
		  <div className="login-form">
			<div className="card-form">
				<h2 className="text-center ">Connéxion</h2>
				<div className="form-group">
					<label htmlFor="email">Adresse Email</label>
					<input type="email" name="email" className="form-control" id="email" placeholder="azerty@exemple.com" required="required" ref={emailRef}/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Mot de passe</label>
					<input type="password" name="password" className="form-control" id="password" placeholder="Votre mot de passe" required="required" ref={passwordRef}/>
				</div>
				<button onClick={loginUser} className="btn btn-primary btn-block">Se connecter</button>
			</div>
		  </div>
		);
}

export default Login;