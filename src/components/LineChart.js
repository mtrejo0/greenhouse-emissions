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
import { Checkbox, Box, Grid } from "@mui/material";

ChartJS.register(LinearScale, BarElement, CategoryScale, Tooltip, Legend, LineElement, PointElement);



const colors = [
  "rgba(255, 99, 132, 1)",
  "rgba(255, 159, 64, 1)",
  "rgba(255, 205, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(201, 203, 207, 1)",
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
  }, [data])






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
      x: {
        title: {
          display: true,
          text: "Year"
        },
      },
      y: {
        title: {
          display: true,
          text: "Tons of CO2"
        },
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

    <>
    
    <Grid container>
      
    <Grid item xs={2}>

      <Box sx={{ mt: 2 }}>
        <a href="https://stats.oecd.org/Index.aspx?DataSetCode=AIR_GHG#">Dataset</a>
      </Box>
      
      <Box sx={{ border: "1px solid black", mt: 4 }}>
        
        {sortedKeys.map((key, i) => (
          <Box key={key} sx={{ borderBottom: "1px solid black" }}>
            <Checkbox onClick={() => handleDatasetToggle(key)} checked={!hiddenDatasets.includes(key)} />
            <span>{i + 1} {key}</span>
          </Box>
        ))}
      </Box>
    </Grid>

    <Grid item xs={10} sx={{padding: "32px"}}>
      <div style={{ position: "sticky", top: "50%", transform: "translateY(-50%)" }}>
        <h3>{chartName}</h3>
        <Line data={chartData} options={options} />
      </div>
    </Grid>
  </Grid>
  </>
  );






};

export default LineChart;
