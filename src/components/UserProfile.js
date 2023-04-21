/*==================================================
src/components/UserProfile.js

The UserProfile component is used to demonstrate the use of Route and Link.
Note: You don't need to work on this file for the Assignment.
==================================================*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserProfile extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <h1 className="heading-2 page-title">User Profile</h1>

                    <div className="modules grid">
                        <section className="module user-profile">
                            <ul className="grid">
                                <li>
                                    <h2 className="eyebrow">Username</h2>
                                    <p class="heading-5">{this.props.userName}</p>
                                </li>
                                <li>
                                    <h2 className="eyebrow">Member Since</h2>
                                    <p class="heading-5">{this.props.memberSince}</p>
                                </li>
                            </ul>
                        </section>
                    </div>
                    
                    <Link to="/" className="btn secondary">Return to Home</Link>  
                </div>
            </div>
        );
    }
}

export default UserProfile;