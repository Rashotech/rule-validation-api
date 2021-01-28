const errorMessage = require('../util/response');

function Validate (req, res, next) {
    const wholeData = req.body;
    const { rule, data } = req.body;
   
    if (Array.isArray(wholeData)) {
        const result = errorMessage("Invalid JSON payload passed.");
        return res.status(400).json(result);
    }

    if (typeof wholeData !== "object") {
        const result = errorMessage("Invalid JSON payload passed.");
        return res.status(400).json(result);
    }

    if (!rule) {
        const result = errorMessage("rule is required.");
        return res.status(400).json(result);
    }

    if (!data) {
        const result = errorMessage("data is required.");
        return res.status(400).json(result);
    }

    if (rule) {
       if (typeof rule !== "object") {
            const result = errorMessage("rule should be an object.");
            return res.status(400).json(result);
       }
       if (!rule.field) {
            const result = errorMessage("field is required.");
            return res.status(400).json(result);
        }
        if (rule.field) {
            if (typeof rule.field !== "string") {
                const result = errorMessage("field should be a string.");
                return res.status(400).json(result);
            }
        }
        if (!rule.condition) {
            const result = errorMessage("condition is required.");
            return res.status(400).json(result);
        }
        if (rule.condition) {
            const operators = ["eq", "neq", "gt", "gte", "contains"];
            if(!operators.includes(rule.condition)) {
                const result = errorMessage("Allowed conditions are eq, neq, gt, gte, and contains.");
                return res.status(400).json(result);
            }  
        }
        if (!rule.condition_value) {
            const result = errorMessage("condition_value is required.");
            return res.status(400).json(result);
        }
    }

    if (data) {
        if (typeof data === "string") {
            if(isNaN(rule.field)) {
                const result = errorMessage(`field ${rule.field} must be a number.`);
                return res.status(400).json(result);
            }
            if ((data.length -1) < rule.field ) {
                const result = errorMessage(`field ${rule.field} is missing from data.`);
                return res.status(400).json(result);
            }
            const field_value =  data[rule.field]
            req.data = {rule, data, field_value}
        } else if (Array.isArray(data)) {
            if(isNaN(rule.field)) {
                const result = errorMessage(`field ${rule.field} must be a number.`);
                return res.status(400).json(result);
            }
            if ((data.length -1) < rule.field ) {
                const result = errorMessage(`field ${rule.field} is missing from data.`)
                return res.status(400).json(result);
            }
            const field_value =  data[rule.field]
            console.log(field_value);
            req.data = {rule, data, field_value}
        } else if (typeof data === "object") {
            const fieldName = Object.keys(data);
            if (!fieldName.includes(rule.field)) {
                const result = errorMessage(`field ${rule.field} is missing from data.`)
                return res.status(400).json(result);
            }
            const fieldNames = Object.entries(data);
            const value = fieldNames.filter(function(result) {
                return result.includes(rule.field);;
            });
            const field_value = ((value[0])[1]).toString();
            console.log(field_value);
            req.data = {rule, data, field_value}
        } else {
            const result = errorMessage("The data field can only be a valid JSON object or a valid array or a string.")
            return res.status(400).json(result);
        }
    }
    next();    
}

module.exports = Validate;