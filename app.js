const express = require('express');
const bodyParser = require('body-parser');
const validate = require('./middleware/error-handler');
const errorMessage = require('./util/response');
const responseMessage = require('./util/responses');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.use(function (err, req, res, next) {
    console.error(err.stack)
    const result = errorMessage("Invalid JSON payload passed.");
    res.status(400).json(result);
})

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

app.post('/validate-rule', validate, (req, res) => {
    console.log("working");
    const { rule, data, field_value } = req.data;
    const condition = rule.condition;
    const condition_value = (rule.condition_value).toString();

    switch (condition) {
        case 'gte': 
            if (field_value >= condition_value ) {
                const result = responseMessage(rule.field, field_value, condition, condition_value, "success");
                return res.status(200).json(result);  
            }
            else{
                const result = responseMessage(rule.field, field_value, condition, condition_value, "error");
                return res.status(200).json(result);  
            }

        case 'gt': 
            if (field_value > condition_value ) {
                const result = responseMessage(rule.field, field_value, condition, condition_value, "success");
                return res.status(200).json(result);  
            }
            else{
                const result = responseMessage(rule.field, field_value, condition, condition_value, "error");
                return res.status(200).json(result);  
            }

        case 'eq': 
            if (field_value === condition_value) {
                const result = responseMessage(rule.field, field_value, condition, condition_value, "success");
                return res.status(200).json(result);  
            }
            else{
                const result = responseMessage(rule.field, field_value, condition, condition_value, "error");
                return res.status(200).json(result);  
            }
     
        case 'neq': 
            if (field_value !== condition_value ) {
                const result = responseMessage(rule.field, field_value, condition, condition_value, "success");
                return res.status(200).json(result);  
            }
            else{
                const result = responseMessage(rule.field, field_value, condition, condition_value, "error");
                return res.status(200).json(result);  
            }
    
        case 'contains': 
            if (field_value.includes(condition_value)) {
                const result = responseMessage(rule.field, field_value, condition, condition_value, "success");
                return res.status(200).json(result);  
            }
            else{
                const result = responseMessage(rule.field, field_value, condition, condition_value, "error");
                return res.status(200).json(result);  
            }
        default:  
     }    
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})
