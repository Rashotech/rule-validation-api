const responseMessage = (field, field_value, condition, condition_value, status) => {
    const response = {
      "message": status === "success" ? `field ${field} successfully validated.` : `field ${field} failed validation.`,
      "status": status,
      "data": {
        "validation": {
          "error": status === "success" ? false : true,
          "field": field,
          "field_value": field_value,
          "condition": condition,
          "condition_value": condition_value
        }
      }
    }
    return response;
  };

  module.exports = responseMessage;