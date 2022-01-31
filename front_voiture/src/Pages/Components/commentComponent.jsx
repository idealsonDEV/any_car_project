import React from 'react';
import axios from "axios";
import makeToast from "../../Toaster/toaster";

class Comment extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            id: props.car_id,
            comments: [],
            currentMessage: "",
        }
    }
    componentDidMount() {
        let token = localStorage.getItem('Car_Token');
        if (token == null) {
            makeToast("error", "Vous n'êtes pas connecté !");
            axios.get(`http://localhost:8000/car/${this.state.id}/comment`)
            .then((response) => {
                this.setState({ comments: response.data })
            }).catch((err) => {
                makeToast("error", err.response.data.message);
            });
        } else {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            axios.get(`http://localhost:8000/car/${this.state.id}/comment`, config)
            .then((response) => {
                this.setState({ comments: response.data })
            }).catch((err) => {
                makeToast("error", err.response.data.message);
            });
        }
    }

    handleInputChanges(e){
    	this.setState({currentMessage: e.currentTarget.value});
    }

    processFormSubmission(e) {
        e.preventDefault();
        let token = localStorage.getItem('Car_Token');
        const commentdata = {
        	message: this.state.currentMessage,
        }
        if (token == null) token = 'no_token';

        const config = {
                headers: { Authorization: `Bearer ${token}` }
        }

    	let res = axios.post(`http://localhost:8000/car/${this.state.id}/comment`, commentdata, config);
    	res.then((response) => {
    		makeToast("success", response.data.message)
            this.setState({currentMessage: ""});
    	}).catch((err) => {
			makeToast("error", err.response.data.message);
		});
        axios.get(`http://localhost:8000/car/${this.state.id}/comment`, config)
        .then((response) => {
            this.setState({ comments: response.data })
        }).catch((err) => {
            makeToast("error", err.response.data.message);
        });
    }
    render () {
        const comments = this.state.comments;
        if (comments !== undefined) {
    		return (
				<div>
					<form  id={"create-post-form"} onSubmit={this.processFormSubmission.bind(this)} noValidate={true}>
						<textarea placeholder="Votre commentaire" onChange={(e) => this.handleInputChanges(e)}></textarea>
						<button type="submit" className="btn btn-success green">Commenter</button>
					</form>
					<ul>
						{comments && comments.map(comment =>
							<li key={comment._id}>
								<span>{comment.createdAt.toLocaleString()}</span>
								<strong>{comment.username}</strong>
								<p>{comment.message}</p>
							</li>
						)}
					</ul>
				</div>
    		)
    	} else {
    		return ''
    	}
    }
 }

export default Comment;