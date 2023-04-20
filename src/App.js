/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

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

	/**
     * Call API endpoint to get data.
     */
	async componentDidMount() {
		
		/*
		 * Get credits data from API endpoint.
		 */
		try {
			let response = await axios.get('https://johnnylaicode.github.io/api/credits.json');
			response.data.forEach((credit) => {
				if (typeof credit.amount == 'undefined' || typeof credit.description == 'undefined' || typeof credit.date == 'undefined') {
					return;
				}

				this.addCredit(credit.amount, credit.description, credit.date, credit.id);
			})
			this.updateAccountBalance();
			this.sortCredits();
		} 
		catch (error) {
			if (error.response) {
				// The request was made, and the server responded with error message and status code.
				console.log(error.response.data); 
				console.log(error.response.status);
            }    
        }

		/*
		 * Get debits data from API endpoint.
		 */
        try {
            let response = await axios.get('https://johnnylaicode.github.io/api/debits.json');
            response.data.forEach((debit) => {
                if (typeof debit.amount == 'undefined' || typeof debit.description == 'undefined' || typeof debit.date == 'undefined') {
                    return;
                }

                this.addDebit(debit.amount, debit.description, debit.date, debit.id);
            })
            this.updateAccountBalance();
            this.sortDebits();
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
	 * Mock Log In.
	 * 
	 * Update state's currentUser (userName) after "Log In" button is clicked.
	 * 
	 * @param {*} logInInfo 
	 */
	mockLogIn = (logInInfo) => {
		const newUser = { ...this.state.currentUser };
		newUser.userName = logInInfo.userName;
		this.setState({ currentUser: newUser })
	}

	/**
	 * Update state's accountBalance.
	 * 
	 * Calculate the account balance by subtracting the total debits amount from the total credits amount.
	 * Then, round the account balance to 2 decimal places.
	 * 
	 * @returns {Number} The account balance.
	 */
	updateAccountBalance = () => {
		let accountBalance = 0;
		let creditsAmount = this.getCreditsAmount();
		let debitsAmount = this.getDebitsAmount();
		accountBalance = creditsAmount - debitsAmount;

		// Round 2 decimal places
		accountBalance = Math.round(accountBalance * 100) / 100;

		// Update state's accountBalance
		this.setState({ accountBalance: accountBalance });
		
		return accountBalance;
	}

	/**
	 * Add a credit.
	 * 
	 * @param {Number} amount The credit amount.
	 * @param {String} description The credit description.
	 * @param {Date|String} date The credit date.
	 * @param {Number} id Optional. The credit id. Default is 0 (auto-increment).
	 * @returns {False|Number} The credit id. False if the credit id already exists.
	 */
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
		this.setState({ credits: credits });
		return id;
	}

	/**
	 * Get a credit.
	 * 
	 * @param {Number} id The credit's id.
	 * @returns The credit object.
	 */
	getCredit = (id) => {
		let credit = this.state.credits.find((credit) => {
			return credit.id === id;
		});
		return credit;
	}


	/**
	 * Get the total credits amount.
	 * 
	 * @returns {Number} The total credits amount.
	 */
	getCreditsAmount = () => {
		let creditsAmount = 0;
		if (this.state.credits.length === 0) {
			return creditsAmount;
		}
		this.state.credits.forEach((credit) => {
			creditsAmount += credit.amount;
		});
		creditsAmount = Math.round(creditsAmount * 100) / 100;
		return creditsAmount;
	}

	/**
	 * Sort the credits.
	 * 
	 * Sort options are 'date-asc', 'date-desc', 'amount-asc', 'amount-desc'.
	 * 
	 * @param {String} sortBy Optional. The sort by option. Default is false (use the current state's sortBy).
	 */
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

	/**
	 * Add a debit.
	 * 
	 * @param {Number} amount The debit amount.
	 * @param {String} description The debit description.
	 * @param {Date|String} date The debit date.
	 * @param {Number} id Optional. The debit id. Default is 0 (auto-increment).
	 * @returns {False|Number} The debit id. False if the debit id already exists.
	 */
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
		return id;
	}

	/**
	 * Get a debit.
	 * 
	 * @param {Number} id The debit's id.
	 * @returns The debit object.
	 */
	getDebit = (id) => {
		let debit = this.state.debits.find((debit) => {
			return debit.id === id;
		});
		return debit;
	}

	/**
	 * Get the total debits amount.
	 * 
	 * @returns {Number} The total debits amount.
	 */
	getDebitsAmount = () => {
		let debitsAmount = 0;
		if (this.state.debits.length === 0) {
			return debitsAmount;
		}
		this.state.debits.forEach((debit) => {
			debitsAmount += debit.amount;
		});
		debitsAmount = Math.round(debitsAmount * 100) / 100;
		return debitsAmount;
	}

	/**
	 * Sort the debits.
	 * 
	 * Sort options are 'date-asc', 'date-desc', 'amount-asc', 'amount-desc'.
	 * 
	 * @param {String} sortBy Optional. The sort by option. Default is false (use the current state's sortBy).
	 */
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

	/**
	 * Create Routes and React elements to be rendered using React components.
	 */
	render() {
		// Create React elements and pass input props to components.
		const HomeComponent = () => (
			<Home
				accountBalance={this.state.accountBalance} 
				debitsAmount={this.getDebitsAmount}
				creditsAmount={this.getCreditsAmount}
			/>
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
				debitsAmount={this.getDebitsAmount}
				creditsAmount={this.getCreditsAmount}
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
				debitsAmount={this.getDebitsAmount}
				creditsAmount={this.getCreditsAmount}
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