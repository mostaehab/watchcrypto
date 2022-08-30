import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";

const CoinChart = ({ singleCoinChart }) => {
  ChartJS.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title
  );
  return (
    <Chart
      className="chart"
      type="line"
      data={{
        labels: singleCoinChart.prices?.map((coin) => {
          const date = new Date(coin[0]);
          return date.toLocaleDateString();
        }),
        datasets: [
          {
            label: "helo",
            data: singleCoinChart.prices?.map((coin) => coin[1]),
            borderColor: "#444",
          },
        ],
      }}
      options={{
        elements: {
          point: {
            radius: 1,
          },
        },
      }}
    />
  );
};

export default CoinChart;
