import React, { useState, useEffect, useContext } from 'react';
import { Chart } from 'react-google-charts';
import { sensor_api } from '../generated/sensor_api';
import { SensorIdCtx } from '../pages/layout';

const client = new sensor_api({ BASE: 'https://sensor.f-bunker.io' });

async function fetchSensorData(id: String) {
  try {
    const sensorData = await client.hour.getHourData(id as string)
    if (sensorData.length === 0) return [{temp: 0}]
    return sensorData;
  } catch (error) {
    console.error('API request failed', error);
    return [{ temp: 0 }];
  }
}

export async function getData(id: String) {
  const sensorData = await fetchSensorData(id);
  return [
    ['Label', 'Value'],
    ['Temp', parseFloat(sensorData[0].temp.toFixed(1))],
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
  const [data, setData] = useState([['Label', 'Value'], ['Temp', 0]]);
  const {id} = useContext(SensorIdCtx)

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData(id);
      setData(result);
    };

    fetchData();
    const timer = setInterval(fetchData, 10000);

    return () => {
      clearInterval(timer);
    };
  }, [id]);

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
};

export default ChartWraperTemp;