import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "./header";
import { singleCoinData } from "../Store";
import DOMPurify from "dompurify";
import CoinChart from "./CoinChart";
import { Row, Col, Container, Alert, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getHistoricalData } from "../Store";

const CoinProfile = () => {
  const [isActiveid, setActiveid] = useState(365);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(singleCoinData(id));
    dispatch(getHistoricalData(id, "365"));
  }, [dispatch, id]);

  const chartDaysHandler = (days) => {
    dispatch(getHistoricalData(id, days));
  };

  const singleCoin = useSelector((state) => state.singleCoin.coin);
  const singleCoinChart = useSelector(
    (state) => state.singleCoin.historicalData
  );
  const LoadingStats = useSelector((state) => state.singleCoin.Loading);
  const chartList = useSelector((state) => state.singleCoin.charNavItems);

  const contentLoading = () => {
    if (LoadingStats) {
      return (
        <Row>
          <Col md="4">
            <Card className="card">
              <div className="coin-profile-info">
                <img src={singleCoin.image?.large} alt={singleCoin.id}></img>
                <h3>{singleCoin.name}</h3>
                <Alert variant="info">
                  <div
                    className="coin-bio"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        singleCoin.description?.en.split(". ")[0]
                      ),
                    }}
                  ></div>
                </Alert>
                <div className="coin-market-data">
                  <span>
                    <h5>Rank:</h5> {singleCoin.market_cap_rank}
                  </span>
                  <span>
                    <h5>Price:</h5> $
                    {singleCoin.market_data?.current_price.usd.toLocaleString()}
                  </span>
                  <span>
                    <h5>Market Price:</h5> $
                    {singleCoin.market_data?.market_cap.usd.toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>
          </Col>
          <Col md="8">
            <ul className="chart-controller">
              {chartList.map((list) => (
                <li
                  key={list.id}
                  onClick={() => {
                    setActiveid(list.id);
                    chartDaysHandler(list.value);
                  }}
                  className={isActiveid === list.id ? "item-active" : ""}
                >
                  {list.text}
                </li>
              ))}
            </ul>
            <div>
              <CoinChart singleCoinChart={singleCoinChart} />
            </div>
          </Col>
        </Row>
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

  return (
    <Fragment>
      <Header />
      <Container className="profile-container">{contentLoading()}</Container>
    </Fragment>
  );
};

export default CoinProfile;
