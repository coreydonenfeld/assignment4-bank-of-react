/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';  // Library used to send asynchronous HTTP requests to RESTful endpoints (APIs)
import AccountBalance from './AccountBalance';

/*
Viewing the Credits Page:

GIVEN I am on the Home Page
WHEN I click on 'Credits' link/button
THEN I shall be redirected to the Credits Page
AND I shall see a title of 'Credits' on the web page
*/

/*
Displaying List of Credits:

GIVEN I am on the Credits Page
WHEN I view the Credits display area
THEN I shall see all my Credits displayed in a list, including the Credits retrieved from API endpoint
AND each Credit shall display its description, amount, and date (yyyy-mm-dd)
AND all amounts are rounded to 2 decimal places (e.g., 1234567.89)
*/

/*
Adding Credits:

GIVEN I am on the Credits Page
WHEN I enter a new Credit's description and amount
AND WHEN I click on 'Add Credit' button
THEN I shall see my new Credit description and amount added to the Credits display area with the current date (yyyy-mm-dd)
AND I shall see my Account Balance updated to reflect the addition of new Credit
AND all amounts are rounded to 2 decimal places (e.g., 1234567.89)
*/

/*
Viewing the Account Balance on the Credits Page:

GIVEN I am on the Credits Page
WHEN I view the Account Balance display area
THEN I shall see my Account Balance displayed
AND all amounts are rounded to 2 decimal places (e.g., 1234567.89)
*/


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
     * Call API endpoint to get data.
     */
    async componentDidMount() {
        const endpointURL = 'https://johnnylaicode.github.io/api/credits.json';

        try {
            let response = await axios.get(endpointURL);
            response.data.forEach((credit) => {
                if (typeof credit.amount == 'undefined' || typeof credit.description == 'undefined' || typeof credit.date == 'undefined') {
                    return;
                }

                this.props.addDebit(credit.amount, credit.description, credit.date, credit.id);
            })
            this.props.updateAccountBalance();
            this.props.sortCredits();
        } 
        catch (error) {
            if (error.response) {
                // The request was made, and the server responded with error message and status code.
                console.log(error.response.data); 
                console.log(error.response.status);
            }    
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

    handleSorting = (e) => {
        e.preventDefault();
        let sortBy = e.target.value;
        this.props.sortCredits(sortBy);
    }

    // Create the list of Debit items
    creditsView = () => {
        const credits = this.state.credits;
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
                    <h1>Credits</h1>

                    <AccountBalance accountBalance={this.props.accountBalance} />

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