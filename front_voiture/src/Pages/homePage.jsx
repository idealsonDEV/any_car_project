import React from 'react';
import axios from "axios";
import { Link, RouteComponentProps } from 'react-router-dom';

class Home extends React.Component {
	constructor(props: RouteComponentProps) {
        super(props);
        this.state = { cars: [] }
    }
    componentDidMount() {
        let res = axios.get(`http://localhost:8000/`);
        res.then((response) => {
            this.setState({ cars: response.data })
        });
    }
    render () {
    	const cars = this.state.cars;
    	return (
			<div>
		        {cars.length === 0 && (
		            <div className="text-center">
		                <h2>Pas de voiture enregistrée !</h2>
		            </div>
		        )}

	            <div className="container">
	                <div className="row">
	                    <table className="table table-bordered">
	                        <thead className="thead-light">
	                            <tr>
	                                <th scope="col">Mark</th>
	                                <th scope="col">Model</th>
	                                <th scope="col">Type</th>
	                                <th scope="col">Action</th>
	                            </tr>
	                        </thead>
	                        <tbody>
	                            {cars && cars.map(car =>
	                                <tr key={car._id}>
	                                    <td>{car.mark}</td>
	                                    <td>{car.model}</td>
	                                    <td>{car.type}</td>
	                                    <td><Link to={`car/${car._id}`}>Voir</Link></td>
	                                </tr>
	                            )}
	                        </tbody>
	                    </table>
	                </div>
	            </div>
	        </div>
        )
    }
}

export default Home;