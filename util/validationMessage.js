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

const response = (res, field_value, condition_value, successMessage, errorMessage) => {
    if (field_value >= condition_value ) {
        return res.status(200).json(successMessage);
    }
    else {
         return res.status(400).json(errorMessage);
    }
};

  module.exports = {
    responseMessage,
    response
  };