import InputField from "./InputField";

import { Multiselect } from "multiselect-react-dropdown";
import { Controller } from "react-hook-form";
import { Button } from "react-bootstrap";

export const SignupForm = ({ methods }) => {
  const {
    register,
    currentPassword,
    formState: { errors },
    control,
    setValue,
    handleSubmit,
    handleRegisterUser,
  } = methods;
  return (
    <form onSubmit={handleSubmit(handleRegisterUser)}>
      <div className="text-center mb-3">
        <div className="form-outline mb-4">
          <InputField
            label="Email"
            register={register}
            name="email"
            type="text"
            errors={errors}
            validationSyntax={{
              required: true,
              pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            }}
          />
        </div>
        <div className="form-outline mb-4">
          <InputField
            label="Username"
            register={register}
            name="username"
            type="text"
            errors={errors}
            validationSyntax={{ required: true }}
          />
        </div>
        <div className="form-outline mb-4">
          <InputField
            label="Password"
            register={register}
            name="password"
            type="password"
            errors={errors}
            validationSyntax={{
              required: true,
              pattern:
                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/g,
            }}
          />
        </div>
        <div className="form-outline mb-4">
          <InputField
            label="Confirm password"
            register={register}
            name="passwordConfirm"
            type="password"
            errors={errors}
            validationSyntax={{
              required: true,
              validate: (value) => value === currentPassword,
            }}
          />
        </div>
        <div className="form-outline mb-4">
          <Controller
            name="roles"
            control={control}
            render={({ field: { ref, ...field } }) => {
              return (
                <Multiselect
                  {...field}
                  ref={ref}
                  placeholder="Select role"
                  hidePlaceholder
                  displayValue="name"
                  onSelect={(selected, item) => {
                    setValue("roles", selected);
                  }}
                  onRemove={(selected, item) => {
                    setValue("roles", selected);
                  }}
                  options={[
                    { value: "student", name: "student", id: 1 },
                    { value: "mentor", name: "mentor", id: 2 },
                  ]}
                />
              );
            }}
          />
        </div>
        <div className="form-outline mb-4">
          <Button className="btn btn-primary btn-lg" type="submit">
            CREATE
          </Button>
        </div>
      </div>
    </form>
  );
};
