import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const SearchResult = () => {
  const searchStatus = useSelector((state) => state.search.searchStatus);
  const searchData = useSelector((state) => state.search.searchResult);

  return (
    <ul className={searchStatus ? "show search-list" : "hide search-list"}>
      {searchData.map((result) => {
        return (
          <Link to={"/coin/" + result.id} key={result.id}>
            {
              <li className="search-item">
                <div className="li-container">
                  <div className="coin-info">
                    <div className="img-container">
                      <img src={result.thumb} alt="bitcoin" />
                    </div>
                    <div className="coin-title-list">
                      <span className="coin-id">
                        <Link to={"/coin/" + result.id}>{result.symbol}</Link>
                      </span>
                      <span className="coin-name">{result.name}</span>
                    </div>
                  </div>
                  <div className="coin-rank">{result.market_cap_rank}#</div>
                </div>
              </li>
            }
          </Link>
        );
      })}
    </ul>
  );
};

export default SearchResult;
