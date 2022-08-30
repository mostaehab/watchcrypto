import { Fragment } from "react";
import { Link } from "react-router-dom";
export const numFormat = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const TableBody = ({ coin }) => {
  return (
    <Fragment>
      <td className="rank">{coin.market_cap_rank}</td>
      <td>
        <div className="coin-info">
          <div className="img-container">
            <img src={coin.image} alt={coin.id} />
          </div>
          <div className="coin-title">
            <span className="coin-id">
              <Link to={"/coin/" + coin.id}>{coin.symbol.toUpperCase()}</Link>
            </span>
            <span className="coin-name">{coin.name}</span>
          </div>
        </div>
      </td>
      <td>${numFormat(coin.current_price.toFixed(2))}</td>
      <td className={coin.price_change_percentage_24h > 0 ? "up" : "down"}>
        {coin.price_change_percentage_24h.toFixed(2)}%
      </td>
      <td>${numFormat(coin.market_cap)}</td>
      <td>${numFormat(coin.total_volume)}</td>
      <td>
        {coin.total_supply
          ? numFormat(coin.total_supply) + " " + coin.symbol.toUpperCase()
          : "-"}
      </td>
    </Fragment>
  );
};

export default TableBody;
