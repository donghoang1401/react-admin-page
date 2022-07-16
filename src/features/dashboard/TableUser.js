import PaginationComponent from "components/Pagination";
import { isEmpty } from "lodash";
import { Button, Table } from "react-bootstrap";
import { boolToStr } from "utils/formatUtils";
import { v4 } from "uuid";

export const TableUser = ({
  currentIndex,
  pageItems,
  totalPages,
  setPage,
  handleShowConfirmDialog,
  isAdmin,
}) => {
  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Authorities</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {isEmpty(pageItems) ? (
            <tr className="justify-content-center">
              <td>Nothing to show</td>
            </tr>
          ) : (
            pageItems.map((v, i) => (
              <tr key={i}>
                <td key={v4()} id={`id-${i}`}>
                  {v.id}
                </td>
                <td key={v4()} id={`username-${i}`}>
                  {v.username}
                </td>
                <td key={v4()} id={`email-${i}`}>
                  {v.email}
                </td>
                <td key={v4()} id={`authorities-${i}`}>
                  {v.authorities.map((v, k) => (
                    <p
                      key={v4()}
                      id={v4()}
                    >
                      {v.authority}
                    </p>
                  ))}
                </td>
                {isAdmin && (
                  <td key={`delete-${i}`} id={`delete-${i}`}>
                    <Button
                      variant="danger"
                      onClick={() => handleShowConfirmDialog(v.id)}
                    >
                      Delete
                    </Button>{" "}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <div className="row">
        <div className="col-md-6">
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentIndex}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </>
  );
};
