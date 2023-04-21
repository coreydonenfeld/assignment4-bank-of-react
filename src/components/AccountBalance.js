/*==================================================
src/components/AccountBalance.js

The AccountBalance component displays account balance. It is included in other page views.
==================================================*/
import React, { Component } from 'react';

class AccountBalance extends Component {

    formatAmount = (number) => {
        let amount = Math.abs(number).toLocaleString(undefined, {maximumFractionDigits: 2});
        if (number < 0) {
            return "-$" + amount;
        }
        return "$" + amount;
    }

    // Display account balance
    render() {
        return (
            <section className="account-balance">
                <ul className="flex-container">
                    <li>
                        <p className="eyebrow">Credits</p>
                        <p className="heading-5 amount">{this.formatAmount(this.props.creditsAmount())}</p>
                    </li>
                    <li>
                        <p className="eyebrow">Debits</p>
                        <p className="heading-5 amount">{this.formatAmount(this.props.debitsAmount())}</p>
                    </li>
                    <li>
                        <p className="eyebrow">Account Balance</p>
                        <p className="heading-5 amount">{this.formatAmount(this.props.accountBalance)}</p>
                    </li>
                </ul>
            </section>
        );
    }
}

export default AccountBalance;