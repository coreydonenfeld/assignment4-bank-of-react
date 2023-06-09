/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

/*
Viewing the Debits Page:

GIVEN I am on the Home Page
WHEN I click on 'Debits' link/button
THEN I shall be redirected to the Debits Page
AND I shall see a title of 'Debits' on the web page
Displaying List of Debits:

GIVEN I am on the Debits page
WHEN I view the Debits display area
THEN I shall see all my Debits displayed in a list, including the Debits retrieved from API endpoint
AND each Debit shall display its description, amount, and date (yyyy-mm-dd)
AND all amounts are rounded to 2 decimal places (e.g., 1234567.89)
Adding Debits:

GIVEN I am on the Debits Page
WHEN I enter a new Debit's description and amount
AND WHEN I click on 'Add Debit' button
THEN I shall see my new Debit description and amount added to the Debits display area with the current date (yyyy-mm-dd)
AND I shall see my Account Balance updated to reflect the addition of new Debit
AND all amounts are rounded to 2 decimal places (e.g., 1234567.89)
Viewing the Account Balance on the Debits Page:

GIVEN I am on the Debits Page
WHEN I view the Account Balance display area
THEN I shall see my Account Balance displayed
AND all amounts are rounded to 2 decimal places (e.g., 1234567.89)
*/

class Debits extends Component {
    constructor(props) {
        super(props);

        // Initialize the state
        this.state = {
            debits: this.props.debits,
            sortBy: this.props.debitsSortBy
        }
    }

    /**
     * Handle the form submission.
     * 
     * @param {Event} e 
     * @returns {void}
     */
    handleSubmit = (e) => {
        e.preventDefault();

        // Get the form data.
        let description = e.target.description.value;
        let amount = e.target.amount.value;
        let date = new Date().toISOString();

        // Trim the description and parse the amount as a float
        description = description.trim();
        amount = parseFloat(amount);

        // Validation checks.
        if (isNaN(amount)) {
            alert("Please enter a valid amount.");
            return;
        }

        if (amount <= 0) {
            if (amount === 0) {
                alert("Please enter a non-zero amount.");
            } else {
                alert("Please enter a positive number. A negative debit is a credit ;)");
            }
            return;
        }

        if (description === "") {
            alert("Please enter a description.");
            return;
        }

        // Use helper functions.
        this.props.addDebit(amount, description, date);
        this.props.updateAccountBalance();
        this.props.sortDebits();

        // Reset the form values.
        e.target.description.value = "";
        e.target.amount.value = "";
    }

    handleSorting = (e) => {
        e.preventDefault();
        let sortBy = e.target.value;
        this.props.sortDebits(sortBy);
    }

    // Create the list of Debit items
    debitsView = () => {
        const debits = this.state.debits;
        return debits.map((debit) => {
            let date = new Date(debit.date).toISOString().slice(0, 10);
            return (
                <li key={debit.id}>
                    <dl>
                        <dt className="eyebrow">Description</dt>
                        <dd>{debit.description}</dd>
                        <dt className="eyebrow">Amount</dt>
                        <dd>${debit.amount.toLocaleString(undefined, {maximumFractionDigits: 2})}</dd>
                        <dt className="eyebrow">Date</dt>
                        <dd>{date}</dd>
                    </dl>
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h1 className="heading-2 page-title">Debits</h1>

                    <AccountBalance
                        accountBalance={this.props.accountBalance}
                        debitsAmount={this.props.debitsAmount}
                        creditsAmount={this.props.creditsAmount}
                    />

                    <div className="modules grid">
                        <section className="add-item module">
                            <h2 className="heading-4">Add Debit</h2>
                            <form onSubmit={this.handleSubmit} className="grid">
                                <div className="form-input-wrapper">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" name="description" />
                                </div>
                                <div className="form-input-wrapper">
                                    <label htmlFor="amount">Amount</label>
                                    <input type="number" name="amount" min="1" step="0.01" />
                                </div>
                                <button type="submit" className="btn primary">Add Debit</button>
                            </form>
                        </section>
                        
                        <section className="view-items module grid">
                            <h2 className="heading-4">View Debits</h2>
                            <form className="sorting flex-container">
                                <label htmlFor="sort">Sort by</label>
                                <select name="sort" id="sort" onChange={this.handleSorting} defaultValue={this.state.sortBy}>
                                    <option value="date-desc">Date (Oldest to Newest)</option>
                                    <option value="date-asc">Date (Newest to Oldest)</option>
                                    <option value="amount-asc">Amount (Lowest to Highest)</option>
                                    <option value="amount-desc">Amount (Highest to Lowest)</option>
                                    <option value="ID">ID</option>
                                </select>
                            </form>
                            <ul>
                                {this.debitsView()}
                            </ul>
                        </section>
                    </div>

                    <Link to="/" className="btn secondary">Return to Home</Link>  
                </div>
            </div>            
        )
    }
}

export default Debits;