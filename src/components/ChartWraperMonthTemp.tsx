import { Chart } from "react-google-charts";
import { sensor_api } from "../generated/sensor_api";
import { useContext, useEffect, useState } from "react";
import { SensorIdCtx } from "../pages/layout";
import style from "../pages/history.module.css"

const client = new sensor_api({ BASE: "https://sensor.f-bunker.io" });

async function fetchSensorData(id: String) {
    try {
        const sensorData = await client.month.getMonthData(id as string);
        return sensorData
    } catch (error) {
      console.error('API request Failed', error);
      return null;
    }
}

export async function getData(id:String) {
  const sensorData = await fetchSensorData(id);
  if (sensorData === null) return [["Zeitraum eines Monat", "Grad"],[]]
  return [
    ["", "Grad"],
    ...sensorData.slice(0, 24).reverse().map(sensor => [sensor.timestamp.slice(5, 10), sensor.temp_median])
  ]
}

export const options = {
  title: "Age vs. Weight comparison",
  hAxis: { title: "Grad", minValue: 0, maxValue: 15 },
  vAxis: { title: "Zeit", minValue: 0, maxValue: 15 },
  legend: "none",
};

const ChartWraperMonthTemp = ({ chartClass }: { chartClass: string }): JSX.Element => {
  const [data, setData] = useState([['Label', 'Value'], ['Grad', 0]]);
  const {id} = useContext(SensorIdCtx)

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData(id);
      setData(result);
    }

    fetchData();
    const timer = setInterval(fetchData, 6000000);

    return () => {
      clearInterval(timer);
    };
  }, [id]);

  return (
    <div className={style.ChartContainer}>
      <Chart
        chartType="Line"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}

export default ChartWraperMonthTemp;