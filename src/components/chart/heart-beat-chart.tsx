import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions, exec } from 'apexcharts';
import { faker } from '@faker-js/faker';

interface MockDataType {
  x: number;
  y: number;
}
const createMockData = (): MockDataType => {
  return {
    x: new Date().getTime(),
    y: faker.datatype.number({ min: 300, max: 1500 }),
  };
};

export default function HeartBeatChart() {
  const [chartData, setChartData] = useState<MockDataType[]>([]);

  useEffect(() => {
    const updateChartData = () =>
      setChartData((prevData) => {
        const newData = [...prevData?.slice(), createMockData()];
        return newData;
      });

    const updateIntervalId = setInterval(updateChartData, 100);
    return () => clearInterval(updateIntervalId);
  }, []);

  const chartOptions: ApexOptions = {
    chart: {
      id: 'realtime',
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          enabled: false,
          // speed: 1000,
        },
      },
    },
    xaxis: {
      type: 'datetime',
      range: 10000,
    },
    yaxis: {
      min: -10000,
      max: 10000,
    },
    stroke: {
      curve: 'smooth',
    },
    series: [
      {
        name: 'Example Data',
        data: chartData,
      },
    ],
  };

  return <Chart options={chartOptions} series={chartOptions.series} type="line" />;
}
