/*==================================================
src/components/AccountBalance.js

The AccountBalance component displays account balance. It is included in other page views.
==================================================*/
import React, { Component } from 'react';

class AccountBalance extends Component {

    // Display account balance
    render() {
        return (
            <section className="account-balance">
                <ul className="flex-container">
                    <li>
                        <p className="eyebrow">Credits</p>
                        <p className="heading-5 amount">{this.props.creditsAmount()}</p>
                    </li>
                    <li>
                        <p className="eyebrow">Debits</p>
                        <p className="heading-5 amount">{this.props.debitsAmount()}</p>
                    </li>
                    <li>
                        <p className="eyebrow">Account Balance</p>
                        <p className="heading-5 amount">{this.props.accountBalance}</p>
                    </li>
                </ul>
                
            </section>
        );
    }
}

export default AccountBalance;