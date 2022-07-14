import classNames from "classnames";
import styles from "./styles.module.scss";

const FormWrapper = ({ children }) => {
  return (
    <div className={classNames("card bg-dark", styles.card)}>
      <div className="p-5 text-center">{children}</div>
    </div>
  );
};

export default FormWrapper;
