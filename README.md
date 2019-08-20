# TechDegree-Project-3
 Interactive Form

JavaScript is used to enhance an interactive form.

The JavaScript behind the interactivity of the form was created using jQuery.  Every attempt was made to only use jQuery.
    
    -User input is validated
    -Messages are displayed for incorrect input
    -The Name field cannot be blank
    -The Email field must be of a valid email format (existance of the email account is not validated)
    -At least 1 checkbox must be selected in the Activites section
    -Only one form of payment is accepted

Update 1.0
    Updated index.html with minor formatting changes
    
    Created script.js to inlcude the following functionality:
    
    //Place the first field in the focus state on page load
    
    //As a user enters their email address the email address is dynamically checked for validity
    
    //Hide the "Job Role" text box with JavaScript initially, then show it with JS upon selection of Job Role when a valid
    //role is de-selected
    
    // When a theme is selected color options are shown and displays "Please select a T-shirt theme"
    // Only the color options that match the theme selected are displayed
    // When a new theme is selected the color field and drop down menu update to match the selected theme
    
    //Detects a conflict in any checkboxes data-time-and-day field using regular expressions
    //Dynamically reads the data-day-and-time attribute and retrieves the correct value, whether day or time
    //Append a tag to any time/day conflicts and disable the corresponding checkbox
    
    //The total value is updated based on the class selections and corresponding costs
    
    //The payment menu is set to credit card by default
    
    //The credit card fields are hidden when credit card is de-selected
    
    //The credit card number is validated prior to form submission and the user is alerted of an invalid credit card number dynamically as it is entered
    //An invalid credit card entry displays one message
    //A credit card number of a different length displays another message
    
Update 1.1
    Squashed a bug with the checkboxes not disabling and enabling as expected
    Corrected an error with the form submission 
    Correctly hiding and showing the bitcoin and paypal paragraphs now
