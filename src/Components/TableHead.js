import { Fragment } from "react";
const TableHead = () => {
  return (
    <Fragment>
      <th>#</th>
      <th>Coin</th>
      <th>Price</th>
      <th>24h Change</th>
      <th>Market Cap</th>
      <th>24h Volume</th>
      <th>Supply</th>
    </Fragment>
  );
};

export default TableHead;
