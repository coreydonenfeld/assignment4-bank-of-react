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
                <h1>Bank of React</h1>

                <Link to="/userProfile">User Profile</Link>
                <br />
                <Link to="/login">Login</Link>
                <br />
                <Link to="/credits">Credits</Link>
                <br />
                <Link to="/debits">Debits</Link>
                <br /><br />
                <AccountBalance
                    accountBalance={this.props.accountBalance}
                    debitsAmount={this.props.debitsAmount}
                    creditsAmount={this.props.creditsAmount}
                />
            </div>
        );
    }
}

export default Home;