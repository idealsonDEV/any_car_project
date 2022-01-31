import React from 'react';
import axios from "axios";
import makeToast from "../Toaster/toaster";

const Register = (props) => {
	const nameRef = React.createRef();
	const emailRef = React.createRef();
	const passwordRef = React.createRef();

	const registerUser = () => {
		const name = nameRef.current.value;
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const userdata = {
			name,
			email,
			password,
		};

		axios.post("http://localhost:8000/register", userdata)
		.then((response) => {
			//console.log(response.data)
			makeToast("success", response.data.message);
			props.history.push("/login")
		})
		.catch((err) => {
			//console.log(err.response.data.message)
			makeToast("error", err.response.data.message);
		});
	};
	return (
		  <div className="login-form">
			<div className="card-form">
				<h2 className="text-center ">Enregistrement</h2>
				<div className="form-group">
					<label htmlFor="vname">Nom</label>
					<input type="text" name="vname" className="form-control" id="vname" placeholder="Votre nom" required="required" ref={nameRef} />
				</div>
				<div className="form-group">
					<label htmlFor="email">Adresse Email</label>
					<input type="email" name="email" className="form-control" id="email" placeholder="azerty@exemple.com" required="required" ref={emailRef}/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Mot de passe</label>
					<input type="password" name="password" className="form-control" id="password" placeholder="Votre mot de passe" required="required" ref={passwordRef}/>
				</div>
				<button onClick={registerUser} className="btn btn-primary btn-block">S'enregistrer</button>
			</div>
		  </div>
		);
}

export default Register;