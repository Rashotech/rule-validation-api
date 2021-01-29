// Required Packages
const express = require('express');
const bodyParser = require('body-parser');

// helper functions
const validate = require('./middleware/error-handler');
const errorsMessage = require('./util/error');
const responseMessage = require('./util/validationMessage');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

//Validate JSON Payload 
app.use(function (err, req, res, next) {
    console.error(err.stack)
    const result = errorMessage("Invalid JSON payload passed.");
    res.status(400).json(result);
})

//Base Route
app.get('/', (req, res) => {
    const response = {
        "message": "My Rule-Validation API",
        "status": "success",
        "data": {
          "name": "Ayoade Rasheed Adedamola",
          "github": "@rashotech",
          "email": "rasheed.adedamola@gmail.com",
          "mobile": "08133166978",
          "twitter": "@Ra_UniqueGUY"
        }
      }
    res.status(200).json(response);
});

//Rule Validation Route
app.post('/validate-rule', validate, (req, res) => {
    const { rule, data } = req.body;
    var { field, condition, condition_value } = rule;
    var field_value = data[field];

     //Custom Success and Error Validation response
     const successMessage =  responseMessage(field, field_value, condition, condition_value, "success");
     const errorMessage =  responseMessage(field, field_value, condition, condition_value, "error");

    //  Validation Condition Evaluation
    switch (condition) {
        case 'gte': 
            if (field_value >= condition_value ) {
                return res.status(200).json(successMessage);
            }
            else {
                 return res.status(400).json(errorMessage);
            }

        case 'gt': 
            if (field_value > condition_value ) {
                return res.status(200).json(successMessage);
            }
            else {
                 return res.status(400).json(errorMessage);
            }

        case 'eq': 
            if (field_value === condition_value) {
                return res.status(200).json(successMessage);
            }
            else {
                 return res.status(400).json(errorMessage);
            }
     
        case 'neq': 
            if (field_value !== condition_value ) {
                return res.status(200).json(successMessage);
            }
            else {
                 return res.status(400).json(errorMessage);
            }
    
        case 'contains': 
            if (!isNaN(field_value)) {
                var field_value = field_value.toString();
                var condition_value = condition_value.toString();
            }
            if (field_value.includes(condition_value)) {
                return res.status(200).json(successMessage);
            }
            else {
                 return res.status(400).json(errorMessage);
            }
        default:  
        return res.status(400).json(errorsMessage("Allowed conditions are eq, neq, gt, gte, and contains."));
     }    
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})