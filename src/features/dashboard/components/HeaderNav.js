import { Dropdown, Navbar } from "react-bootstrap";

export const HeaderNav = (props) => {
  return (
    <Navbar>
      <Navbar.Brand>Dashboard</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          <Dropdown>
            <Dropdown.Toggle variant="info" id="dropdown-basic">
              Signed in as: {props.userDetails?.username}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={props.handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};
