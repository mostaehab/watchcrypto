import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/header";
import TableStatus from "./Components/TableStatus";
import Table from "./Components/Table";
import { fetchCoinData } from "./Store";
import { searchSlice } from "./Store";
import CoinProfile from "./Components/CoinProfile";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoinData());
    setInterval(() => dispatch(fetchCoinData()), 5000);
  }, [dispatch]);

  const hideSearchBox = (event) => {
    if (event.target.classList.contains("me-2")) {
      return;
    }
    dispatch(searchSlice.actions.hideSearchBox());
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <div onClick={hideSearchBox} className="App">
            <Header />
            <TableStatus />
            <Table />
          </div>
        }
      ></Route>
      <Route
        exact
        path="/coin/:id"
        element={
          <div onClick={hideSearchBox}>
            <CoinProfile></CoinProfile>
          </div>
        }
      ></Route>
    </Routes>
  );
}

export default App;
