/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';  // Library used to send asynchronous HTTP requests to RESTful endpoints (APIs)
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
            debits: this.props.debits
        }
    }

    /**
     * Call API endpoint to get data.
     */
    async componentDidMount() {
        const endpointURL = 'https://johnnylaicode.github.io/api/debits.json';

        try {
            let response = await axios.get(endpointURL);
            response.data.forEach((debit) => {
                if (typeof debit.amount == 'undefined' || typeof debit.description == 'undefined' || typeof debit.date == 'undefined') {
                    return;
                }

                this.props.addDebit(debit.amount, debit.description, debit.date, debit.id);
            })
            this.props.updateAccountBalance();
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

        // Reset the form values.
        e.target.description.value = "";
        e.target.amount.value = "";
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
                        <dd>${debit.amount.toFixed(2)}</dd>
                        <dt className="eyebrow">Date</dt>
                        <dd>{date}</dd>
                    </dl>
                </li>
            );
        });
    }

    render() {
        return (
            <section>
                <div className="container">
                    <h1>Debits</h1>

                    <section>
                        <h2>Add Debit</h2>
                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor="description">Description</label>
                            <input type="text" name="description" />
                            <label htmlFor="amount">Amount</label>
                            <input type="number" name="amount" />
                            <button type="submit" className="btn primary">Add Debit</button>
                        </form>
                    </section>
                    
                    <section>
                        <h2>View Debits</h2>
                        <ul>
                            {this.debitsView()}
                        </ul>
                    </section>

                    <AccountBalance accountBalance={this.props.accountBalance} />

                    <Link to="/">Return to Home</Link>  
                </div>
            </section>            
        )
    }
}

export default Debits;