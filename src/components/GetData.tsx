import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import LineChart from "./LineChart";
import csvtojson from 'csvtojson';

export default function GetData() {


  const [data, setData] = useState<any>();

  useEffect(() => {


    const fetchData = async () => {


      const response = await fetch('data.csv');

      const csvData = await response.text();
      const jsonData = await csvtojson().fromString(csvData);

      console.log(jsonData)
      setData(jsonData);
    };

    fetchData();
  }, []);



  const getCountry = (country: string) => {


    const countryData = data
  ?.filter((row: any) => row.Country === country)
  .reduce((acc: any, row: any) => {
    return { ...acc, [row.Year]: row.Value };
  }, {});


    return countryData

  }

  
  const getCountries = () => {
    const countriesSet = new Set();
  
    data?.forEach((row: any) => {
      countriesSet.add(row.Country);
    });
  
    const names = Array.from(countriesSet);


    const countriesData: any = {}


    names.forEach((name: any) => {
      countriesData[name] = getCountry(name)
    })

    return countriesData


  };

  const countriesData = getCountries()
  

  return (
    <Box sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>

      {countriesData && <LineChart data={countriesData} chartName="CO2 Emissions by Country" />}

      <a href="https://stats.oecd.org/Index.aspx?DataSetCode=AIR_GHG#">Dataset</a>
    </Box>
  );
}
