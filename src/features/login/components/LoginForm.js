import { loginUser } from "contexts";
import { useAuthDispatch, useAuthState } from "contexts/AuthContext";
import InputField from "features/signup/components/InputField";
import { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { useBoolean } from "react-use";

export const LoginForm = ({ methods }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    isSubmitting,
  } = methods;
  const [isError, setError] = useBoolean(false);
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const { loading, errorMessage } = useAuthState();

  useEffect(() => {
    if (errorMessage) setError(true);
    return () => {
      setError(false);
    };
  }, [errorMessage, setError]);

  const handleLogin = async (data) => {
    try {
      let response = await loginUser(dispatch, data);
      if (!response) return;
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Alert
        variant="danger"
        show={isError}
        onClose={() => setError(false)}
        dismissible
      >
        Invalid username/password!
      </Alert>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="text-center mb-3">
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
            <button
              className="btn btn-outline-light btn-lg px-5"
              type="submit"
              disabled={loading || isSubmitting}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
