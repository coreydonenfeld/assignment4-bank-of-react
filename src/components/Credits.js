/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from 'react-router-dom';

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


const Credits = (props) => {
    return (
        <div>
            <h1>Credits</h1>
            <br />
            <Link to="/">Return to Home</Link>
        </div>
    );
}

export default Credits;