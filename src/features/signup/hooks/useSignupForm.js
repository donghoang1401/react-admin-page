import { useForm } from "react-hook-form";
import { useRegisterUser } from "./useRegisterUser";

export const useSignupForm = ({ defaultValues, setShow }) => {
  const methods = useForm({
    defaultValues: defaultValues,
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const {
    formState: { dirtyFields },
    watch,
  } = methods;

  const { mutateAsync, ...mutation } = useRegisterUser({ setShow });

  const onSubmit = async (data) => {
    try {
      let roles = [];
      if (data.roles) {
        data.roles.forEach((v) => {
          roles.push(v.name);
        });
      }
      const actData = {
        ...data,
        roles,
      };
      setShow(false)
      await mutateAsync(actData);
    } catch (e) {}
  };

  const currentPassword = watch("password");

  return {
    ...methods,
    ...mutation,
    currentPassword,
    handleRegisterUser: onSubmit,
  };
};
