import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDevices } from "../../services/operations/deviceApi";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import moment from "moment/moment";
import toast from "react-hot-toast";
import { getHistory } from "../../services/operations/historyApi";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: 'black',
    boxShadow: state.isFocused ? '0 0 0 1px blue' : 'none',
    '&:hover': {
      borderColor: state.isFocused ? 'blue' : 'darkgray'
    },
    borderRadius: '8px',
    padding: '2px',
    width: '200px'
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '8px',
    marginTop: '0'
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '0'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'blue' : 'white',
    color: state.isSelected ? 'white' : 'black',
    '&:hover': {
      backgroundColor: state.isFocused ? 'lightgray' : 'white'
    },
    padding: '10px'
  })
};

const Filter = ({setTemperatureData, setHumidityData}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search); 
  const id = queryParams.get('id');

  useEffect(() => {
    const fetch = async () => {
      const data = await getDevices();
      setOptions(
        data.map((row) => ({
          value: row.id,
          label: row?.location?.name ?? row.embedId,
        }))
      );
    };
    fetch();
  }, []);

  useEffect(() => {
    if(id) {
      const select = options.find((row) => row.value === Number(id));
      setSelectedDevice(select);
    }
  }, [id, options])

  const handleOnClick = () => {
    if(!selectedDevice || !selectedDevice.value) toast.error('Please select device!');
    else if(!startDate || !endDate) toast.error('Please select date!');
    else {
      const fetch = async () => {
        const data = await getHistory(selectedDevice.value, moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'));
        console.log(data);
        const temperatureData = {
          labels: data.map((row) => row.time),
          datasets: [
            {
              data: data.map((row) => row.avgTemperature),
              borderColor: 'red'
            }
          ]
        }
        const humidityData = {
          labels: data.map((row) => row.time),
          datasets: [
            {
              data: data.map((row) => row.avgHumidity),
              borderColor: 'blue'
            }
          ]
        }
        setTemperatureData(temperatureData);
        setHumidityData(humidityData);
      }
      fetch()
    }
  }

  const handleChange = (selectedOption) => {
    setSelectedDevice(selectedOption);
  };
  
  return (
    <div className="text-black p-4">
      {/* Filter Header */}
      <div className="flex space-x-4 items-center">
        {/* App Filter */}
        <div>
          <Select
            value={selectedDevice}
            onChange={handleChange}
            options={options}
            styles={customStyles}
            placeholder="Select device"
          />
        </div>

        {/* Date Range Filter */}
        <div className="relative">
          <button
            className="px-4 py-2 rounded-md border border-black hover:bg-gray-100"
            onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
          >
            Date range:{" "}
            <span className="text-black font-bold">
              {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
            </span>
          </button>
          {isDateDropdownOpen && (
            <div className="absolute left-0 top-full mt-2 bg-gray-100 rounded-lg shadow-lg p-4 w-80 z-10">
              {/* Date Pickers */}
              <div className="flex justify-between items-center space-x-4">
                <div>
                  <p className="text-sm text-black mb-1">Start date</p>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="MMM dd, yyyy"
                    className="bg-gray-100 text-black p-2 rounded border border-black w-full"
                  />
                </div>
                <div>
                  <p className="text-sm text-black mb-1">End date</p>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="MMM dd, yyyy"
                    className="bg-gray-100 text-black p-2 rounded border border-black w-full"
                  />
                </div>
              </div>
              {/* Buttons */}
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  onClick={() => setIsDateDropdownOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-600 text-white"
                  onClick={() => setIsDateDropdownOpen(false)}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button 
          className="px-4 py-2 bg-purple-500 rounded-md hover:bg-purple-600 text-white"
          onClick={() => handleOnClick()}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Filter;