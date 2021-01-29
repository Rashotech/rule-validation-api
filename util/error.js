const errorMessage = (message) => {
    const responses = {
        "message": message,
        "status": "error",
        "data": null
      }
    return responses;
};

module.exports = errorMessage;
