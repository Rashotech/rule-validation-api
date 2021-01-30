const base = (req, res) => {
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
};

module.exports = base;
