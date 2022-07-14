import FormWrapper from "features/signup/components/FormWrapper";
import { FormProvider } from "react-hook-form";
import { LoginForm } from "./components/LoginForm";
import { useLoginForm } from "./hooks/useLoginForm";

const LoginPage = () => {
  const defaultValues = {
    username: "",
    password: "",
  };

  const methods = useLoginForm({
    defaultValues,
  });

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <FormWrapper>
              <FormProvider {...methods}>
                <LoginForm
                  {...{
                    methods,
                  }}
                />
              </FormProvider>
            </FormWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
