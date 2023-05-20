import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LinearScale,
  BarElement,
  CategoryScale,
  Tooltip,
  Legend,
  LineElement,
  PointElement
} from "chart.js";


import {useEffect, useState} from "react";

ChartJS.register(LinearScale, BarElement, CategoryScale, Tooltip, Legend, LineElement, PointElement);



const colors = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(255, 205, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(201, 203, 207, 0.2)",
]

const LineChart = ({ data, chartName }) => {
 

  const [hiddenDatasets, setHiddenDatasets] = useState([]);


  const sortedKeys = Object.keys(data)
  
  sortedKeys.sort((a, b) => {
    const largestValueA = Math.max(...Object.values(data[a]));
    const largestValueB = Math.max(...Object.values(data[b]));
    return largestValueB - largestValueA;
  });



  useEffect(() => {
    setHiddenDatasets(sortedKeys.slice(10))
  }, [data, sortedKeys])


  

  console.log(sortedKeys)



  const handleDatasetToggle = (datasetLabel) => {
    setHiddenDatasets((prevHiddenDatasets) => {
      if (prevHiddenDatasets.includes(datasetLabel)) {
        return prevHiddenDatasets.filter((label) => label !== datasetLabel);
      } else {
        return [...prevHiddenDatasets, datasetLabel];
      }
    });
  };

  const chartData = {
    labels: [],
    datasets: Object.keys(data).filter((key) => !hiddenDatasets.includes(key)).map((key, i) => ({
      label: key,
      data: data[key],
      backgroundColor: colors[i % colors.length],
      borderWidth: 1
    })),
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  };

  return (
    <div>
      <h3>{chartName}</h3>
      <div>
        {sortedKeys.map((key, i) => (
          <button
            key={key}
            onClick={() => handleDatasetToggle(key)}
            style={{
              marginRight: '10px',
              backgroundColor: hiddenDatasets.includes(key) ? 'gray' : 'white',
            }}
          >
            {i+1} {key}
          </button>
        ))}
      </div>
      <Line data={chartData} options={options} />
    </div>
  );






};

export default LineChart;
