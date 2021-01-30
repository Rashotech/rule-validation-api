// Required Packages
const express = require('express');
const bodyParser = require('body-parser');

// Routes
const Routes = require('./routes/index');

// helper function
const errorMessage = require('./util/error');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

//Validate JSON Payload 
app.use(function (err, req, res, next) {
    console.error(err.stack)
    const result = errorMessage("Invalid JSON payload passed.");
    res.status(400).json(result);
})

// Routes
app.use(Routes);

// middleware to handle invalid routes
app.use((req, res, next) => {
    const error = new Error('Could not find this route');
    throw error;
})

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(400).json(errorMessage(error.message))
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
});