//@ts-check
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
} from "chart.js";
import Filter from "./Filter";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
)

const optionsTemperature = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      position: 'bottom',
      text: 'Temperature (°C)'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}

const optionsHumidity = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      position: 'bottom',
      text: 'Humidity (%)'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}

const initTemperatureData = {
  labels: [],
  datasets: []
}

const initHumidityData = {
  labels: [],
  datasets: []
}

const Analytic = () => {
  const [temperatureData, setTemperatureData] = useState(initTemperatureData);
  const [humidityData, setHumidityData] = useState(initHumidityData);

  return (
    <div className="m-8">
      <div className="flex justify-center">
        <Filter setTemperatureData={setTemperatureData} setHumidityData={setHumidityData}/>
      </div>
      <div className="mb-10 mt-10 h-[70vh] w-full md:w-[90vw] mx-auto">
        <Line options={optionsTemperature} data={temperatureData} />
      </div>

      <div className="mt-10 h-[70vh] w-full md:w-[90vw] mx-auto">
        <Line options={optionsHumidity} data={humidityData} />
      </div>
    </div>
  )
}

export default Analytic;