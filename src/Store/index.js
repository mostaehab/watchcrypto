import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  coins: null,
};

const initialSearchState = {
  searchStatus: false,
  searchResult: [],
};

const initialProfileState = {
  coin: {},
  historicalData: {},
  charNavItems: [
    {
      id: 1,
      text: "1 Day",
      value: 1,
    },
    {
      id: 30,
      text: "1 Month",
      value: 30,
    },
    { id: 80, text: "3 Months", value: 80 },
    { id: 365, text: "1 Year", value: 365 },
  ],
  Loading: true,
};

//////////////////

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    pushData(state, action) {
      state.coins = action.payload;
    },
  },
});

export const searchSlice = createSlice({
  name: "search",
  initialState: initialSearchState,
  reducers: {
    showSearchBox(state) {
      state.searchStatus = true;
    },

    hideSearchBox(state) {
      state.searchStatus = false;
    },

    getSearchResult(state, action) {
      state.searchResult = action.payload.coins;
    },
  },
});

const singleCoinSlice = createSlice({
  name: "singleCoin",
  initialState: initialProfileState,
  reducers: {
    getCoinData(state, action) {
      state.coin = action.payload;
    },

    getHistroricalData(state, action) {
      state.historicalData = action.payload;
    },

    setLoadingScreen(state) {
      state.Loading = !state.Loading;
    },
  },
});

export const fetchCoinData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50"
      );
      if (!response.ok) {
        throw new Error("Something went wrong with the fetching");
      }
      const data = await response.json();
      return data;
    };
    try {
      const coinData = await fetchData();
      dispatch(coinsSlice.actions.pushData(coinData));
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchCoinData = (query) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );

      if (!response.ok) {
        throw new Error("Search Failed");
      }

      const data = await response.json();

      return data;
    };

    try {
      const searchData = await fetchData();
      dispatch(searchSlice.actions.getSearchResult(searchData));
    } catch (error) {
      console.log(error);
    }
  };
};

export const singleCoinData = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(singleCoinSlice.actions.setLoadingScreen());
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );

      if (!response.ok) {
        throw new Error("Fetching Failed");
      }

      const data = await response.json();
      dispatch(singleCoinSlice.actions.setLoadingScreen());
      return data;
    };

    try {
      const coinData = await fetchData();
      dispatch(singleCoinSlice.actions.getCoinData(coinData));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getHistoricalData = (id, days) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}        `
      );

      if (!response.ok) {
        throw new Error("Fetching Failed");
      }

      const data = await response.json();

      return data;
    };

    try {
      const historicData = await fetchData();
      dispatch(singleCoinSlice.actions.getHistroricalData(historicData));
    } catch (error) {
      console.log(error);
    }
  };
};
const store = configureStore({
  reducer: {
    coin: coinsSlice.reducer,
    search: searchSlice.reducer,
    singleCoin: singleCoinSlice.reducer,
  },
});

export default store;
