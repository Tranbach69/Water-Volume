import {
  CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, TimeScale, Title,
  Tooltip
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import annotationPlugin from 'chartjs-plugin-annotation';
import React from 'react';
import { Line } from 'react-chartjs-2';

// // Import hình ảnh
// import appleIcon from '../../public/apple.png';
// import dishIcon from '../../public/dia.jpg';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  annotationPlugin
);

const data = {
  hba1c: [
    { time: "2023-05-27T09:00:00", value: 100 },
    { time: "2023-05-27T09:15:00", value: 105 },
    { time: "2023-05-27T09:30:00", value: 130 },
    { time: "2023-05-27T09:45:00", value: 125 },
    { time: "2023-05-27T10:00:00", value: 102 }
  ],
  sub_meals: ["2023-05-27T09:04:00", "2023-05-27T11:23:00", "2023-05-27T15:44:00", "2023-05-27T21:33:00"],
  primary_meals: ["2023-05-27T12:05:00", "2023-05-27T19:10:00"]
};

const Chart = () => {
  const labels = data.hba1c.map(entry => entry.time);
  const hba1cValues = data.hba1c.map(entry => entry.value);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'HbA1c',
        data: data.hba1c.map(entry => ({ x: entry.time, y: entry.value })),
        borderColor: 'blue',
        borderWidth: 2,
        fill: false,
        pointRadius: 3,
        pointHoverRadius: 6
      }
    ]
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          displayFormats: {
            minute: 'HH:mm'
          }
        }
      }
    },
    plugins: {
      annotation: {
        annotations: {
          sub_meals: data.sub_meals.map((time, index) => ({
            type: 'label',
            xValue: time,
            yValue: hba1cValues[0], // Sử dụng giá trị y đầu tiên để đặt vị trí icon
            content: () => `<img src="../../public/apple.png" width="100" height="100"/>`,
            position: 'center',
            xAdjust: 0,
            yAdjust: -10,
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          })),
          primary_meals: data.primary_meals.map((time, index) => ({
            type: 'label',
            xValue: time,
            yValue: hba1cValues[0], 
            content: () => `<img src="../../public/dia.png" width="100" height="100"/>`,
            position: 'center',
            xAdjust: 0,
            yAdjust: -10,
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          }))
        }
      }
    }
  };

  return (
    <div>
      <h2>Biểu đồ đường huyết</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Chart;
