// helper functions
const errorsMessage = require('../util/error');
const {response, responseMessage} = require('../util/validationMessage');

//Rule Validation controller
const validation = (req, res) => {
    const { rule, data } = req.body;
    var { field, condition, condition_value } = rule;
    var field_value = data[field];

     //Custom Success and Error Validation response
     const successMessage =  responseMessage(field, field_value, condition, condition_value, "success");
     const errorMessage =  responseMessage(field, field_value, condition, condition_value, "error");

    //  Validation Condition Evaluation
    switch (condition) {
        case 'gte': 
           return response(res, field_value, condition_value, successMessage, errorMessage);
        case 'gt': 
            return response(res, field_value, condition_value, successMessage, errorMessage);
        case 'eq': 
            return response(res, field_value, condition_value, successMessage, errorMessage);
        case 'neq': 
            return response(res, field_value, condition_value, successMessage, errorMessage);
        case 'contains': 
            if (!isNaN(field_value)) {
                var field_value = field_value.toString();
                var condition_value = condition_value.toString();
            }
            return response(res, field_value, condition_value, successMessage, errorMessage);
        default:  
        return res.status(400).json(errorsMessage("Allowed conditions are eq, neq, gt, gte, and contains."));
     }    
};

module.exports = validation;