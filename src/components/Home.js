/*==================================================
src/components/Home.js

The Home component is used to demonstrate the use of Link.
==================================================*/
import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <h1 className="page-title">Bank of React</h1>

                    <div className="modules grid">
                        <section className="page-preview module">
                            <h2 className="heading-4">User Profile</h2>
                            <p>View your profile.</p>
                            <Link to="/userProfile" className="btn primary">View Profile</Link>
                        </section>
                        <section className="page-preview module">
                            <h2 className="heading-4">Login</h2>
                            <p>Login to your account.</p>
                            <Link to="/login" className="btn primary">Login</Link>
                        </section>
                        <section className="page-preview dark module">
                            <h2 className="heading-4">Credits</h2>
                            <p>View and add credits.</p>
                            <Link to="/credits" className="btn primary light">View Credits</Link>
                        </section>
                        <section className="page-preview dark module">
                            <h2 className="heading-4">Debits</h2>
                            <p>View and add debits.</p>
                            <Link to="/debits" className="btn primary light">View Debits</Link>
                        </section>
                    </div>

                    <AccountBalance
                        accountBalance={this.props.accountBalance}
                        debitsAmount={this.props.debitsAmount}
                        creditsAmount={this.props.creditsAmount}
                    />
                </div>
            </div>
        );
    }
}

export default Home;