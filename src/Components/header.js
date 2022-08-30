import "./header.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { searchSlice } from "../Store";
import SearchResult from "./SearchResult";
import { searchCoinData } from "../Store";
import { Navbar, Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { eventWrapper } from "@testing-library/user-event/dist/utils";

const Header = () => {
  const dispatch = useDispatch();

  const ShowSearchBox = () => {
    dispatch(searchSlice.actions.showSearchBox());
  };

  const searchHandler = (event) => {
    const val = event.target.value;
    if (!val) {
      return;
    }
    dispatch(searchCoinData(val));
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/" className="app-name">
            Watch-Crypto
          </Link>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onFocus={ShowSearchBox}
              onChange={searchHandler}
            />
          </Form>
        </Container>
      </Navbar>

      <SearchResult />
    </div>
  );
};

export default Header;
