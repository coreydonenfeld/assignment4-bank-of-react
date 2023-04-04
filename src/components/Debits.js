/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

    // Handle the form submission
    handleSubmit = (e) => {
        e.preventDefault();
        let description = e.target.description.value;
        let amount = e.target.amount.value;
        let date = new Date().toISOString();

        // validation: amount must be a number, and description must not be empty
        if (isNaN(amount) || description === "") {
            alert("Please enter a valid amount and description.");
            return;
        }

        this.props.addDebit(amount, description, date);

        // reset the form
        e.target.description.value = "";
        e.target.amount.value = "";
    }

    // Create the list of Debit items
    debitsView = () => {
        const { debits } = this.state;
        return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
            let date = debit.date.slice(0, 10);
            return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
        });
    }

    render() {
        return (
            <div>
                <h1>Debits</h1>

                {this.debitsView()}

                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="description" />
                    <input type="number" name="amount" />
                    <button type="submit">Add Debit</button>
                </form>
                <br />
                <Link to="/">Return to Home</Link>
            </div>
        )
    }
}

export default Debits;