import React from "react";
import Form from "react-bootstrap/Form";
import { errMsg, fieldHasError } from "../../../utils/validations";
const InputField = ({
  label,
  type,
  name,
  register,
  validationSyntax,
  helpText,
  errors,
}) => {
  return (
    <>
      <Form.Group className="form-group mb-3" controlId={name}>
        <Form.Label className="text-white">
          {label}
          {validationSyntax.required && <span className="text-red"> *</span>}
        </Form.Label>
        <Form.Control
          type={type}
          placeholder={"Enter " + label}
          {...register(name, validationSyntax)}
          className={fieldHasError(errors, name) ? "is-invalid" : ""}
        />
        {helpText && <Form.Text className="text-muted">{helpText} </Form.Text>}
        {errors[name] && (
          <small className="text-danger">{errMsg(errors, name)}</small>
        )}
      </Form.Group>
    </>
  );
};

export default InputField;
