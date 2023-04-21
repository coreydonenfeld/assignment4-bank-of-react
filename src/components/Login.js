/*==================================================
src/components/Login.js

The LogIn component is used to demonstrate the use of Redirect.
Note: You don't need to work on this file for the Assignment.
==================================================*/
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

class LogIn extends Component {
    constructor(props) {  // Create and initialize state
        super(props)
        this.state = {
            user: {
                //userName: '',
                userName: this.props.user.userName,  // Initialize userName using props input (currentUser in App.js)
                password: ''
            },
            redirect: false  // Redirect property used to trigger Redirect
        }
    }

    // When User Name input is changed, capture the new input value and update state
    handleChange = (e) => {
        const updatedUser = { ...this.state.user };  // Create an object for state
        updatedUser.userName = e.target.value;  // Set object's userName to the new input value
        this.setState({ user: updatedUser })  // Update state with object values
    }

    // When user clicked "Log In" button, store user data and then redirect to "User Profile" page
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.mockLogIn(this.state.user)  // Update state in the top-level component (App.js)
        this.setState({ redirect: true })  // Update state to trigger Redirect
    }

    render() {
        // Redirect to "User Profile" page when "Log In" button is clicked
        if (this.state.redirect) {
            return (<Redirect to="/userProfile" />);
        }

        // Render the login form (and call "handleSubmit" method when "Log In" button is clicked to submit form)
        return (
            <div>
                <div className="container">
                    <h1 className="heading-2 page-title">Login</h1>

                    <div className="modules grid">
                        <section className="module user-profile">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-input-wrapper">
                                    <label for="userName">User Name</label>
                                    <input type="text" name="userName" defaultValue={this.props.user.userName} onChange={this.handleChange} />
                                </div>
                                <div className="form-input-wrapper">
                                    <label for="password">Password</label>
                                    <input type="password" name="password" />
                                </div>
                                <button type="submit" className="btn primary">Log in</button>
                            </form>
                        </section>
                    </div>

                    <Link to="/" className="btn secondary">Return to Home</Link>  
                </div>
            </div>
        );
    }
}

export default LogIn;