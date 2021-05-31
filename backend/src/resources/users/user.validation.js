const Validator = require("validator");

const isEmptyObj = (obj) => {
  return Object.keys(obj).length === 0;
};

const userValidation = (data) => {
  const errors = {};

  if (!Validator.isEmail(data.email))
    errors.email = "Please Enter a valid Email";
  if (!Validator.isLength(data.password, { min: 6, max: 20 }))
    errors.password = "Password must be between 6 and 20 characters";

  if (Validator.isEmpty(data.email)) errors.email = "Email Field is Required";
  if (Validator.isEmpty(data.password))
    errors.password = "Password Field is Required";

  return {
    errors,
    isValid: isEmptyObj(errors),
  };
};

module.exports = userValidation;
