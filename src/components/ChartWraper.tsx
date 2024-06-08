import React from 'react';
import { Line } from 'react-chartjs-2';
// import styles from './chart.module.css';
import {
  Chart as ChartJs,
  LinearScale,
  Tooltip,
  Title,
  Legend,
  Filler,
  CategoryScale,
  PointElement,
  LineElement,
  ChartOptions,
  ChartData
} from 'chart.js';

interface ChartType {
  type: ChartTypeEnum;
}

export enum ChartTypeEnum {
  line = "line",
}

// Chart.js Module registrieren
ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartWrapper: React.FC<ChartType> = ({ type }) => {
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ein einfaches Liniendiagramm',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Monat',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Grad',
        },
      },
    },
  };

  const data: ChartData<'line'> = {
    labels: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli'],
    datasets: [
      {
        label: 'Temperatur',
        data: [24, 23.4, 26.1, 22.4, 30, 25, 18.8],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  function getChartComponent(type: ChartTypeEnum) {
    switch (type) {
      case ChartTypeEnum.line:
        return (
          <Line
            options={options}
            width={1000}
            height={500}
            data={data}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div>
      {getChartComponent(type)}
    </div>
  )
};

export default ChartWrapper;
