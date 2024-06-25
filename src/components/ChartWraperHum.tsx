import React, { useState, useEffect, useContext } from 'react';
import { Chart } from 'react-google-charts';
import { sensor_api } from '../generated/sensor_api';
import { SensorIdCtx } from '../pages/layout';

const client = new sensor_api({ BASE: 'https://sensor.f-bunker.io' });

async function fetchSensorData(id: String) {
  try {
    const sensorData = await client.hour.getHourData(id as string);
    if (sensorData.length === 0) return [{hum: 0}]
    return sensorData;
  } catch (error) {
    console.error('API request failed', error);
    return [{ hum: 0 }];
  }
}

export async function getData(id: String) {
  const sensorData = await fetchSensorData(id);
  return [
    ['Label', 'Value'],
    ['Luft', parseFloat(sensorData[0].hum.toFixed(1))],
  ];
}

export const options = {
  width: 500,
  height: 300,
  redFrom: 90,
  redTo: 100,
  yellowFrom: 70,
  yellowTo: 90,
  minorTicks: 5,
  max: 100,
};

const ChartWraperHum = ({ chartClass }: { chartClass: string }): JSX.Element => {
  const [data, setData] = useState([['Label', 'Value'], ['Luft', 0]]);
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

export default ChartWraperHum;