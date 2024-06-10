import React from 'react';
import { Chart } from "react-google-charts";
import { sensor_api } from "../generated/sensor_api";
import { useState, useEffect } from "react";

const client = new sensor_api({ BASE: "https://sensor.f-bunker.io" });
const sensorData = await client.hour.getHourData();

export function getData() {
  return [
    ["Label", "Value"],
    ["Temp", parseFloat(sensorData[0].temp.toFixed(1))],
  ];
}

export const options = {
  width: 500,
  height: 300,
  redFrom: 50,
  redTo: 60,
  yellowFrom: 40,
  yellowTo: 50,
  minorTicks: 5,
  max: 60,
};

const ChartWraperTemp = ({ chartClass }: { chartClass: string }): JSX.Element => {
  const [data, setData] = useState(getData);

  useEffect(() => {
    const id = setInterval(() => {
      setData(getData());
    }, 3000);

    return () => {
      clearInterval(id);
    };
  });

  return (
    <div className={chartClass}>
      <Chart
        chartType="Gauge"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}

export default ChartWraperTemp;