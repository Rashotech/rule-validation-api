const errorMessage = require('../util/error');

function Validate (req, res, next) {
    
    const { rule, data } = req.body;

    //Validation for required fields
    if (!rule) {
        return res.status(400).json(errorMessage("rule is required."));
    }

    if (!data) {
        return res.status(400).json(errorMessage("data is required."));
    }

     //Validation for wrong type of data input
     if (typeof rule !== "object") return res.status(400).json( errorMessage("rule should be an object."));

     if (!["object", "array", "string"].includes(typeof data)) {
        return res.status(400).json(errorMessage("The data field can only be a valid JSON object or a valid array or a string."));
     }

     //Validation for the fields in the rule object
    if (rule) {
       if (!rule.field) {
            return res.status(400).json(errorMessage("field is required."));
        }

        if (typeof rule.field !== "string" &&  typeof rule.field !== "number") {
                return res.status(400).json(errorMessage("field in rule object should be a string or a number."));
        }
        
        if (!rule.condition) {
            return res.status(400).json(errorMessage("condition is required."));
        }

        if (!rule.condition_value) {
            return res.status(400).json(errorMessage("condition_value is required."));
        }
    }

     //Validation for field specified in the rule object from the data passed
     if(data[rule.field] == undefined ) {
        return res.status(400).json( errorMessage(`field ${rule.field} is missing from data.`));
    }

    next();    
}

module.exports = Validate;