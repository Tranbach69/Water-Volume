import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-adapter-date-fns';

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
            type: 'point',
            xValue: time,
            yValue: hba1cValues[0], // Sử dụng giá trị y đầu tiên để đặt vị trí icon
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            content: {
              src: 'https://example.com/apple_icon.png', // Thay thế bằng URL thực tế của icon quả táo
              width: 20,
              height: 20
            }
          })),
          primary_meals: data.primary_meals.map((time, index) => ({
            type: 'point',
            xValue: time,
            yValue: hba1cValues[0], // Sử dụng giá trị y đầu tiên để đặt vị trí icon
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            content: {
              src: 'https://example.com/plate_icon.png', // Thay thế bằng URL thực tế của icon cái đĩa
              width: 20,
              height: 20
            }
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
