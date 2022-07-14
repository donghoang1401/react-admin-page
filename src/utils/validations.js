let validationMsg = {
  required: " field is required",
  min: "field requied min value",
  max: "value exceed max limit",
  minLength: "minimum value is required",
  maxLength: "exceeds maximum length",
  pattern: "invalid format",
  validateConfirmPasword: "password does not match",
};

export const errMsg = (err, fieldName, customMsg) => {
  let msg = "";
  if (err && err[fieldName]) {
    switch (err[fieldName].type) {
      case "required":
        msg = `${fieldName} ${validationMsg.required}`;
        break;
      case "minLength":
        msg = ` ${validationMsg.minLength}`;
        break;
      case "maxLength":
        msg = ` ${validationMsg.minLength}`;
        break;
      case "pattern":
        msg = ` ${validationMsg.pattern}`;
        break;
      case "validate":
        msg = ` ${validationMsg.validateConfirmPasword}`;
        break;
      default:
        msg = `${customMsg}`;
    }
  }
  return msg;
};
export const fieldHasError = (err, fieldName) => err[fieldName];
