import { useForm } from "react-hook-form";

export const useLoginForm = ({ defaultValues }) => {
  const methods = useForm({
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  return {
    ...methods,
  };
};
