/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
	constructor() {  // Create and initialize state
		super();
		this.state = {
			accountBalance: 0,
			credits: [],
			creditsSortBy: 'amount-asc',
			debits: [],
			debitsSortBy: 'amount-asc',
			currentUser: {
				userName: 'Joe Smith',
				memberSince: '11/22/23',
			}
		};
	}

	// Update state's currentUser (userName) after "Log In" button is clicked
	mockLogIn = (logInInfo) => {
		const newUser = { ...this.state.currentUser };
		newUser.userName = logInInfo.userName;
		this.setState({ currentUser: newUser })
	}

	/*
	 * Making the Account Balance Dynamic:

	 * GIVEN I am on any page that displays the Account Balance
	 * WHEN I view the Account Balance display area
	 * THEN I shall see an Account Balance that accurately represents my total Debits subtracted from my total Credits
	 * AND I shall be able to see a negative account balance if I have more Debits than Credits
	 * AND all amounts are rounded to 2 decimal places (i.e., 1234567.89)
	 * 
	 * How to Calculate Account Balance:
	 * 
	 * Account Balance is the difference between total Credits amount and total Debits amount.
	 * The mathematical formula is: Account Balance = total Credits - total Debits
	 */

	updateAccountBalance = () => {
		let accountBalance = 0;
		let creditsAmount = 0 //this.getCreditsAmount();
		let debitsAmount = this.getDebitsAmount();
		accountBalance = creditsAmount - debitsAmount;

		// round 2 decimal places
		accountBalance = Math.round(accountBalance * 100) / 100;

		// Update state's accountBalance
		this.setState({ accountBalance: accountBalance });
		
		return accountBalance;
	}

	// add credit
	addCredit = (amount, description, date, id = 0) => {
		if (id === 0) {
			id = this.state.credits.length + 1;
		}

		// Prevent duplicate id.
		if (typeof this.getCredit(parseInt(id)) !== 'undefined') {
			return false;
		}

		let credit = {
			id: id,
			amount: amount,
			description: description,
			date: date
		};
		let credits = this.state.credits;
		credits.push(credit);
		this.setState({ credits: credit });
	}

	getCredit = (id) => {
		let credit = this.state.credits.find((credit) => {
			return credit.id === id;
		});
		return credit;
	}

	sortCredits = (sortBy = false) => {
		// Default sort by to the current state's debitsSortBy.
		if (sortBy === false) {
			sortBy = this.state.creditsSortBy;
		}

		let credits = this.state.credits;
		switch (sortBy) {
            case 'date-asc':
                credits.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                });
                break;
            case 'date-desc':
                credits.sort((a, b) => {
					return new Date(a.date) - new Date(b.date);
                });
                break;
            case 'amount-asc':
                credits.sort((a, b) => {
                    return a.amount - b.amount;
                });
                break;
            case 'amount-desc':
                credits.sort((a, b) => {
                    return b.amount - a.amount;
                });
                break;
			case 'ID':
				credits.sort((a, b) => {
					return a.id - b.id;
				});
				break;
            default:
                break;
        }

		this.setState({ credits: credits, creditsSortBy: sortBy });
	}

	getCreditsAmount = () => {
		let creditsAmount = 0;
		this.state.credits.forEach((credit) => {
			creditsAmount += credit.amount;
		});
		return creditsAmount;
	}

	// add debit
	addDebit = (amount, description, date, id = 0) => {
		if (id === 0) {
			id = this.state.debits.length + 1;
		}

		// Prevent duplicate id.
		if (typeof this.getDebit(parseInt(id)) !== 'undefined') {
			return false;
		}

		let debit = {
			id: id,
			amount: amount,
			description: description,
			date: date
		};
		let debits = this.state.debits;
		debits.push(debit);
		this.setState({ debits: debits });
	}

	getDebitsAmount = () => {
		let debitsAmount = 0;
		this.state.debits.forEach((debit) => {
			debitsAmount += debit.amount;
		});
		return debitsAmount;
	}

	getDebit = (id) => {
		let debit = this.state.debits.find((debit) => {
			return debit.id === id;
		});
		return debit;
	}

	sortDebits = (sortBy = false) => {
		// Default sort by to the current state's debitsSortBy.
		if (sortBy === false) {
			sortBy = this.state.debitsSortBy;
		}

		let debits = this.state.debits;
		switch (sortBy) {
            case 'date-asc':
                debits.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                });
                break;
            case 'date-desc':
                debits.sort((a, b) => {
					return new Date(a.date) - new Date(b.date);
                });
                break;
            case 'amount-asc':
                debits.sort((a, b) => {
                    return a.amount - b.amount;
                });
                break;
            case 'amount-desc':
                debits.sort((a, b) => {
                    return b.amount - a.amount;
                });
                break;
			case 'ID':
				debits.sort((a, b) => {
					return a.id - b.id;
				});
				break;
            default:
                break;
        }

		this.setState({ debits: debits, debitsSortBy: sortBy });
	}

	/*
	 * lifecycle method componentDidMount() which should include the API requests using the following endpoints:
	 * Credits API endpoint located at https://johnnylaicode.github.io/api/credits.json
	 * Debits API endpoint located at https://johnnylaicode.github.io/api/debits.json
	 */

	// Create Routes and React elements to be rendered using React components
	render() {
		// Create React elements and pass input props to components.
		const HomeComponent = () => (
			<Home accountBalance={this.state.accountBalance} />
		)
		const UserProfileComponent = () => (
			<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
		)
		const LogInComponent = () => (
			<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />
		)
		const CreditsComponent = () => (
			<Credits
				credits={this.state.credits}
				creditsSortBy={this.state.creditsSortBy}
				addCredit={this.addCredit}
				sortCredits={this.sortCredits}
				accountBalance={this.state.accountBalance}
				updateAccountBalance={this.updateAccountBalance}
			/>
		)
		const DebitsComponent = () => (
			<Debits
				debits={this.state.debits}
				debitsSortBy={this.state.debitsSortBy}
				addDebit={this.addDebit}
				sortDebits={this.sortDebits}
				accountBalance={this.state.accountBalance}
				updateAccountBalance={this.updateAccountBalance}
			/>
		)

		// Return all routes.
		return (
			<Router basename="/assignment4-bank-of-react">
				<div>
					<Route exact path="/" render={HomeComponent} />
					<Route exact path="/userProfile" render={UserProfileComponent} />
					<Route exact path="/login" render={LogInComponent} />
					<Route exact path="/credits" render={CreditsComponent} />
					<Route exact path="/debits" render={DebitsComponent} />
				</div>
			</Router>
		);
	}
}

export default App;