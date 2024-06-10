import React, { useState } from "react";
import {
  GoogleChartEditor,
  GoogleChartWrapper,
  GoogleViz,
  Chart,
} from "react-google-charts";
import { sensor_api } from "../generated/sensor_api";

const client = new sensor_api({ BASE: "https://sensor.f-bunker.io" });
const sensorData = await client.month.getMonthData();

export const data = [
  ["Zeitraum eines Monat", "Grad"],
  ...sensorData.slice(0, 24).reverse().map(sensor => [sensor.timestamp.slice(0, 10), sensor.temp_median])
];

export const options = {
  title: "Age vs. Weight comparison",
  hAxis: { title: "Grad", minValue: 0, maxValue: 15 },
  vAxis: { title: "Zeit", minValue: 0, maxValue: 15 },
  legend: "none",
};


function ChartWraperMounth() {
  const [chartEditor, setChartEditor] = useState<GoogleChartEditor>();
  const [chartWrapper, setChartWrapper] = useState<GoogleChartWrapper>();
  const [google, setGoogle] = useState<GoogleViz>();
  const onEditClick = () => {
    if (!chartWrapper || !google || !chartEditor) {
      return;
    }

    chartEditor.openDialog(chartWrapper);

    google.visualization.events.addListener(chartEditor, "ok", () => {
      const newChartWrapper = chartEditor.getChartWrapper();
      
      newChartWrapper.draw();
    });
  };

  return (
    <>
      <button onClick={onEditClick}>Edit Chart</button>
      <Chart
        chartType= "Line"   // "ScatterChart"
        width="80%"
        height="400px"
        data={data}
        options={options}
        chartPackages={["corechart", "controls", "charteditor"]}
        getChartEditor={({ chartEditor, chartWrapper, google }) => {
          setChartEditor(chartEditor);
          setChartWrapper(chartWrapper);
          setGoogle(google);
        }}
      />
    </>
  );
}

export default ChartWraperMounth;