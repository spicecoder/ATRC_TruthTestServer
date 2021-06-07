import { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { UserContext } from "../../provider/UserProvider";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Navigation = () => {
  const history = useHistory();
  const value = useContext(UserContext);
  const [userData, setUserData] = value.user;
  const LogOut = () => {
    const user2 = {
      _id: "demo",
      name: "demo",
      email: "demo@gmail.com",
    };
    setUserData({
      token: undefined,
      user: undefined,
      user2,
    });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };
  return (
    <>
      <Navbar collapseOnSelect fixed="top" expand="sm" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle arial-aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link as={Link} to="/">
                Microservice
              </Nav.Link>
              {userData.user ? (
                <>
                  <Nav.Link onClick={LogOut}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    as={Link}
                    to="login"
                    style={{
                      cursor: "pointer",
                      textDecoration: "none",
                    }}
                  >
                    <li>Sign in</li>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Navigation;
