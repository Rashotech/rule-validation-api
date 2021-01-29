# rule-validation-api

A simple rule-validation API (Flutterwave Technical Assessment for Interns)

This API is used to validate a specified data field against several conditions.

Accepted condition values are:
  i/ eq: Means the field value should be equal to the condition value 
  ii/ neq: Means the field value should not be equal to the condition value 
  iii/ gt: Means the field value should be greater than the condition value 
  iv/ gte: Means the field value should be greater than or equal to the condition value 
  v/ contains: Means the field value should contain the condition value
  
The API has a rule validation route (POST "/validate-rule")
The route should accept JSON data containing a rule and data field to validate the rule against. Example:

{
  "rule": {
    "field": "missions"
    "condition": "gte",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": 45
  }
}

Response: (HTTP 200)
{
  "message": "field missions successfully validated."
  "status": "success",
  "data": {
    "validation": {
      "error": false,
      "field": "missions",
      "field_value": 45,
      "condition": "gte",
      "condition_value: 30
    }
  }
}
