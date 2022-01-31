import React from 'react';
import axios from "axios";
import makeToast from "../Toaster/toaster";

const CarEdit = (props) => {
	const markRef = React.createRef();
	const modelRef = React.createRef();
	const typeRef = React.createRef();
	const descriptionRef = React.createRef();
	const [file, setFile] = React.useState();

	const registerCar = () => {
		const mark = markRef.current.value;
		const model = modelRef.current.value;
		const type = typeRef.current.value;
		const description = descriptionRef.current.value;
		const cardata = new FormData();
		cardata.append("mark",mark);
		cardata.append("model",model);
		cardata.append("type",type);
		cardata.append("description",description);
		cardata.append("file",file);

		let token = localStorage.getItem('Car_Token');
		if (token == null) token = 'no_token';

		const config = {
                headers: { Authorization: `Bearer ${token}` }
        };

		axios.post("http://localhost:8000/car", cardata, config)
		.then((response) => {
			//console.log(response.data)
			makeToast("success", response.data.message);
			props.history.push("/")
		})
		.catch((err) => {
			//console.log(err.response.data.message)
			makeToast("error", err.response.data.message);
		});
	};
	return (
		  <div className="login-form">
			<div className="card-form">
				<h2 className="text-center ">Information sur la voiture</h2>
				<div className="form-group">
					<label htmlFor="mark">Mark</label>
					<input type="text" name="mark" className="form-control" id="mark"  required="required" ref={markRef}/>
				</div>
				<div className="form-group">
					<label htmlFor="type">Type</label>
					<input type="text" name="type" className="form-control" id="type"  required="required" ref={typeRef}/>
				</div>
				<div className="form-group">
					<label htmlFor="model">Model</label>
					<input type="text" name="model" className="form-control" id="model" required="required" ref={modelRef}/>
				</div>
				<div className="form-group">
					<label htmlFor="fileimage">Image</label>
					<input type="file" name="fileimage" className="form-control-file" id="fileimage" accept=".jpg" onChange={e => {
						const file = e.target.files[0];
						setFile(file);
						}
					}/>
				</div>
				<div className="form-group">
					<label htmlFor="description">description</label>
					<textarea name="description" className="form-control" id="description" ref={descriptionRef}/>
				</div>
				<button onClick={registerCar} type="submit" className="btn btn-primary btn-block">Enregistrer</button>
			</div>
		  </div>
		);
}

export default CarEdit;