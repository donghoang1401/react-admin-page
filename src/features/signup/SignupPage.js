import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { FormProvider } from "react-hook-form";
import FormWrapper from "./components/FormWrapper";
import { SignupForm } from "./components/SignupForm";
import { useSignupForm } from "./hooks/useSignupForm";
const defaultValues = {
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
  roles: [],
};

const Signup = ({ setShow }) => {
  const methods = useSignupForm({ defaultValues, setShow });
  const {
    isSuccess,
    isLoading,
    formState: { isSubmitting },
  } = methods;
  useEffect(() => {
    if (isSuccess) setShow(false);
    return () => defaultValues;
  }, [isSuccess, setShow]);

  if (isLoading || isSubmitting) return <Spinner animation="grow" className="loader" />;

  return (
    <FormWrapper>
      <FormProvider {...methods}>
        <SignupForm
          {...{
            methods,
          }}
        />
      </FormProvider>
    </FormWrapper>
  );
};

export default Signup;
