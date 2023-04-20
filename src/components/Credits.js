/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

class Credits extends Component {
    constructor(props) {
        super(props);

        // Initialize the state
        this.state = {
            credits: this.props.credits,
            sortBy: this.props.creditsSortBy
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
                alert("Please enter a positive number. A negative credit is a debit ;)");
            }
            return;
        }

        if (description === "") {
            alert("Please enter a description.");
            return;
        }

        // Use helper functions.
        this.props.addCredit(amount, description, date);
        this.props.updateAccountBalance();
        this.props.sortCredits();

        // Reset the form values.
        e.target.description.value = "";
        e.target.amount.value = "";
    }

    /**
     * Handle sorting.
     * 
     * @param {Event} e 
     */
    handleSorting = (e) => {
        e.preventDefault();
        let sortBy = e.target.value;
        this.props.sortCredits(sortBy);
    }

    /**
     * Create the list of Debit items
     * 
     * @returns 
     */
    creditsView = () => {
        const credits = this.state.credits;
        console.log(credits)
        return credits.map((credit) => {
            let date = new Date(credit.date).toISOString().slice(0, 10);
            return (
                <li key={credit.id}>
                    <dl>
                        <dt className="eyebrow">Description</dt>
                        <dd>{credit.description}</dd>
                        <dt className="eyebrow">Amount</dt>
                        <dd>${credit.amount.toFixed(2)}</dd>
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
                    <h1 className="heading-2 page-title">Credits</h1>

                    <AccountBalance
                        accountBalance={this.props.accountBalance}
                        debitsAmount={this.props.debitsAmount}
                        creditsAmount={this.props.creditsAmount}
                    />

                    <div className="modules grid">
                        <section className="add-item module">
                            <h2 className="heading-4">Add Credit</h2>
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
                            <h2 className="heading-4">View credits</h2>
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
                                {this.creditsView()}
                            </ul>
                        </section>
                    </div>

                    <Link to="/" className="btn secondary">Return to Home</Link>  
                </div>
            </div>            
        )
    }
}

export default Credits;