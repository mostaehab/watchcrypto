import "./Table.css";
import { Fragment } from "react";
import { useSelector } from "react-redux/es/exports";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

const Table = () => {
  const coins = useSelector((state) => state.coin.coins);

  if (coins) {
    return (
      <Fragment>
        <div className="container">
          <table>
            <thead>
              <tr>
                <TableHead />
              </tr>
            </thead>

            <tbody>
              {coins.map((coin) => (
                <tr key={coin.id}>
                  <TableBody coin={coin} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  } else {
    return (
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
};

export default Table;
