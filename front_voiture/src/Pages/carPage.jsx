import React from 'react';
import axios from "axios";
import Comment from "./Components/commentComponent"
import { RouteComponentProps } from 'react-router-dom';

class Car extends React.Component {
	constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
        	id: this.props.match.params.id,
        	car: {},
        }
    }
    componentDidMount() {
        let res = axios.get(`http://localhost:8000/car/${this.state.id}`);
        res.then((response) => {
            this.setState({ car: response.data })
        });
    }
    render () {
    	const car = this.state.car;
    	return (
	    		<div className="container">
	    			<div className="row">
	    				<div className="col-md-12">
                            <img src={'/images/'+car.file} alt="photo de la voiture"/>
			    			<h3>{car.mark}</h3>
			    			<p>{car.type}</p>
			    			<h4>{car.model}</h4>
			    			<p>{car.description}</p>
			    		</div>
			    	</div>
			    	<div className="row">
			    			<Comment car_id={this.state.id}></Comment>
	    			</div>
	    		</div>
    		)
    }
 }

export default Car;