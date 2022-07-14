import Search from "components/Search";
import { logout } from "contexts";
import { useAuthDispatch, useAuthState } from "contexts/AuthContext";
import Signup from "features/signup/SignupPage";
import { some } from "lodash";
import { useMemo, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { useBoolean, useNumber } from "react-use";
import { AUTHORITIES } from "utils/constants";
import { hasPermission } from "utils/formatUtils";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { HeaderNav } from "./components/HeaderNav";
import { FormModal } from "./components/Modal";
import { useDeleteUser } from "./hooks/useDeleteUser";
import { useFetchingUsers } from "./hooks/useFetchingUsers";
import { usePagination } from "./hooks/usePagination";
import styles from "./styles.module.scss";
import { TableUser } from "./TableUser";

const getAuth = (userDetails) => {
  const admin = some(userDetails.roles, (r) => r === AUTHORITIES.ROLE_ADMIN);
  const mentor = some(userDetails.roles, (r) => r === AUTHORITIES.ROLE_MENTOR);

  if (admin) return "admin";
  if (mentor) return "mentor";
  return "student";
};

const getItems = (items) => items;
const ITEM_PER_PAGE = 10;
const Dashboard = () => {
  const [currentIndex, { set: setPage }] = useNumber(1);
  const [search, setSearch] = useState("");
  const [show, setShow] = useBoolean(false);
  const [isShowDialog, setShowConfirmDialog] = useBoolean(false);
  const [id, setID] = useState(null);
  const { token, userDetails, loading } = useAuthState();

  const isAdmin = useMemo(
    () => hasPermission(userDetails, AUTHORITIES.ROLE_ADMIN),
    [userDetails]
  );

  const { handleDeleteUser } = useDeleteUser({ setShowConfirmDialog });

  const navigate = useNavigate();

  const dispatch = useAuthDispatch();

  const auth = getAuth(userDetails);

  const { items, isLoading, isFetching, isRefetching } = useFetchingUsers({
    auth,
    token,
  });

  const partionList = useMemo(() => getItems(items), [items]);

  const filtered = useMemo(() => {
    let filteredResult = partionList;
    if (search) {
      filteredResult = filteredResult.filter((result) =>
        result["username"].toLowerCase().includes(search.toLowerCase())
      );
    }

    return filteredResult.slice(
      (currentIndex - 1) * ITEM_PER_PAGE,
      (currentIndex - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE
    );
  }, [partionList, search, currentIndex]);

  const calPage = usePagination({
    items: !search ? partionList : filtered,
    currentIndex,
    itemPerPages: ITEM_PER_PAGE,
  });

  const handleLogout = () => {
    logout(dispatch);
    navigate("/login");
  };

  const handleShowModal = () => {
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
  };

  const handleShowConfirmDialog = (id) => {
    setShowConfirmDialog(true);
    setID(id);
  };

  const handleDelete = async () => {
    await handleDeleteUser(id);
  };

  const handleCloseConfirmDialog = () => setShowConfirmDialog(false);

  if (isLoading || isFetching || isRefetching || loading)
    return <Spinner animation="grow" className="loader" />;

  return (
    <Container>
      <HeaderNav
        {...{
          handleLogout,
          userDetails,
        }}
      />
      <div className="row mt-4 mb-4">
        <div className="col-md-6 d-flex">
          <Search
            onSearch={(value) => {
              setSearch(value);
              setPage(1);
            }}
          />
          {isAdmin && (
            <Button variant="success" onClick={handleShowModal}>
              Add new user
            </Button>
          )}
        </div>
      </div>
      <TableUser
        {...{
          currentIndex,
          setPage,
          ...calPage,
          handleShowConfirmDialog,
          isAdmin,
        }}
      />

      <FormModal
        {...{
          title: "Create a user",
          show,
          handleClose: handleCloseModal,
        }}
      >
        <Signup setShow={setShow} />
      </FormModal>

      <ConfirmDialog
        {...{
          isShow: isShowDialog,
          setShow: setShowConfirmDialog,
          title: "Delete confirm",
          handleCloseConfirmDialog,
          handleDelete,
        }}
      />
    </Container>
  );
  return <Spinner animation="grow" className={styles.loader} />;
};

export default Dashboard;
